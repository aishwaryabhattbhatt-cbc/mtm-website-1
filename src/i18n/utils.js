import { ui, defaultLang } from './ui';

export function useTranslations(lang) {
  return function t(key) {
    // Returns the translated string or the English one as a fallback
    return ui[lang][key] || ui[defaultLang][key];
  }
}