import { defineConfig } from 'astro/config';

const deployToPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  output: 'static',
  site: deployToPages ? 'https://gabrielluizfreiregomes.github.io' : undefined,
  base: deployToPages ? '/por-elas' : '/',
});
