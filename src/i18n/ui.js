export const languages = {
    en: 'English',
    fr: 'Français',
  };
  
  export const defaultLang = 'en';
  
  export const ui = {
    en: {
      'nav.home': 'Home',
      'nav.reports': 'Reports',
      'hero.title': 'Media Technology Monitor',
      'nav.solutions': 'Solutions',
      'nav.products': 'Products',
      'nav.tools': 'Tools',
      'nav.insights': 'Insights',
      'nav.demo': 'Request A Demo',
      'nav.signin': 'Sign In',
    },
    fr: {
      'nav.home': 'Accueil',
      'nav.reports': 'Rapports',
      'hero.title': 'Observateur des technologies médias',
      'nav.solutions': 'Solutions',
      'nav.products': 'Produits',
      'nav.tools': 'Outils',
      'nav.insights': 'Analyses',
      'nav.demo': 'Demander une démo',
      'nav.signin': 'Se connecter',
    },
  };
  
  // Detect lang from URL for both local (/) and GH Pages (/repo/...)
export function getLangFromUrl(url) {
    const segments = url.pathname.split('/').filter(Boolean);
    // e.g. "/" -> []
    //      "/fr/" -> ["fr"]
    //      "/mtm-website/fr/" -> ["mtm-website","fr"]
  
    // First segment is a lang (local: /fr/)
    if (segments[0] && segments[0] in ui) return segments[0];
  
    // Second segment is a lang (GH Pages: /repo/fr/)
    if (segments[1] && segments[1] in ui) return segments[1];
  
    return defaultLang;
  }
  
  // Simple translation helper used in nav-bar.astro
  export function useTranslations(lang) {
    const dict = ui[lang] || ui[defaultLang];
    return function t(key) {
      return dict[key] ?? key;
    };
  }