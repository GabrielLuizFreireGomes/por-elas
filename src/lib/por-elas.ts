export const media = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/media/`;
export const whatsappNumber = '5512992032866';
export const instagram = 'https://www.instagram.com/beleza_porelas/';
export const location = 'https://www.google.com/maps/search/?api=1&query=Por+Elas+Conceito+em+Beleza%2C+Mar+Del+Plata%2C+358%2C+S%C3%A3o+Jos%C3%A9+dos+Campos+SP';

export function whatsapp(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  general: 'Oi! Encontrei a Por Elas pelo site. Posso marcar um horário?',
  hands: 'Oi! Vi os cuidados de mãos e pés no site. Quais horários vocês têm?',
  hair: 'Oi! Vi no site os serviços de cabelo e sobrancelhas. Queria saber os horários.',
  facial: 'Oi! Vi o Black Facial no site. Quais horários vocês têm?',
  massage: 'Oi! Vi o pacote de massagem redutora no site e queria saber mais.',
};

export const gallery = [
  { image: 'vinho.webp', alt: 'Unhas curtas com esmalte vinho brilhante e anéis de prata', width: 896, height: 1195 },
  { image: 'glow.webp', alt: 'Unhas amendoadas com acabamento rosa perolado', width: 825, height: 979 },
  { image: 'preto.webp', alt: 'Unhas com esmalte preto brilhante em mãos tatuadas', width: 720, height: 720 },
  { image: 'azul.webp', alt: 'Unhas curtas com esmalte azul escuro cintilante', width: 720, height: 960 },
];
