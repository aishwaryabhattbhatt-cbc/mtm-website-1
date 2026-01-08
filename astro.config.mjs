import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Replace 'mtm-website' with your actual new GitHub repo name
  base: '/mtm-website/',
  site: 'https://aishwaryabhattbhatt-cbc.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'], // Add the languages you want
    routing: {
        prefixDefaultLocale: false // If false, 'en' stays at / and others at /fr/
    }
  }
});