import EmblaCarousel from 'embla-carousel';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const gallery = document.querySelector<HTMLElement>('[data-gallery]');

if (gallery) {
  const rail = gallery.querySelector<HTMLElement>('.galeria-viewport');
  const controls = gallery.querySelector<HTMLElement>('[data-gallery-controls]');
  const previous = gallery.querySelector<HTMLButtonElement>('[data-previous]');
  const next = gallery.querySelector<HTMLButtonElement>('[data-next]');
  const progress = gallery.querySelector<HTMLElement>('[data-progress]');
  const status = gallery.querySelector<HTMLElement>('[data-gallery-status]');

  if (rail && controls && previous && next && progress && status) {
    gallery.setAttribute('data-ready', '');
    const carousel = EmblaCarousel(rail, { align: 'center', loop: true, duration: 29, inViewThreshold: .08 });
    const update = () => {
      const active = carousel.selectedScrollSnap();
      const total = carousel.scrollSnapList().length;
      previous.disabled = !carousel.canScrollPrev();
      next.disabled = !carousel.canScrollNext();
      controls.hidden = progress.hidden = total < 2;
      progress.style.setProperty('--galeria-total', String(total));
      progress.style.setProperty('--galeria-passo', `${active * 100}%`);
      carousel.slideNodes().forEach((slide, index) => slide.classList.toggle('galeria-slide--ativo', index === active));
      status.textContent = `Posição ${active + 1} de ${total}`;
    };
    const updateVisibility = () => {
      const visible = new Set(carousel.slidesInView());
      carousel.slideNodes().forEach((slide, index) => {
        if (visible.has(index)) slide.removeAttribute('aria-hidden');
        else slide.setAttribute('aria-hidden', 'true');
      });
    };
    const goBack = () => carousel.scrollPrev(reducedMotion.matches);
    const goForward = () => carousel.scrollNext(reducedMotion.matches);
    previous.addEventListener('click', goBack);
    next.addEventListener('click', goForward);
    rail.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') goBack();
      else goForward();
    });
    carousel.on('select', update).on('reInit', update);
    carousel.on('slidesInView', updateVisibility).on('reInit', updateVisibility);
    update();
    updateVisibility();
  }
}

if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-reveal', 'on');
        reveal.unobserve(entry.target);
      }
    }
  }, { threshold: .21 });
  document.querySelectorAll('[data-reveal]').forEach((photo) => reveal.observe(photo));
}

const pointer = document.querySelector<HTMLElement>('.efeito-ponteiro');

if (pointer) {
  let frame: number | undefined;
  let latest: PointerEvent | undefined;
  const hide = () => {
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    latest = undefined;
    pointer.removeAttribute('data-visivel');
  };
  const paint = () => {
    frame = undefined;
    if (!latest) return;
    pointer.style.setProperty('--ponteiro-x', `${latest.clientX}px`);
    pointer.style.setProperty('--ponteiro-y', `${latest.clientY}px`);
    const interactive = latest.target instanceof Element && !!latest.target.closest('a, button, .galeria-viewport');
    pointer.toggleAttribute('data-interativo', interactive);
    pointer.setAttribute('data-visivel', '');
  };
  document.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    latest = event;
    frame ??= requestAnimationFrame(paint);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
}
