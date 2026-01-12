// src/components/ui/ProductToggle/product-toggle.js

export function initProductToggles(root = document) {
    const toggles = root.querySelectorAll('[data-product-toggle]');
  
    toggles.forEach((toggle) => {
      // Prevent double-binding
      if (toggle.dataset.bound === "true") return;
      toggle.dataset.bound = "true";
  
      const tabs = Array.from(toggle.querySelectorAll('[data-product-toggle-item]'));
      if (!tabs.length) return;
  
      const initial =
        tabs.find((t) => t.getAttribute('aria-selected') === 'true') ||
        tabs[0];
  
      setActive(toggle, tabs, initial);
  
      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          setActive(toggle, tabs, tab);
        });
      });
  
      toggle.addEventListener('keydown', (e) => {
        const currentIndex = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
        if (currentIndex === -1) return;
  
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          const nextIndex = (currentIndex + dir + tabs.length) % tabs.length;
          tabs[nextIndex].focus();
          setActive(toggle, tabs, tabs[nextIndex]);
        }
      });
    });
  }
  
  function setActive(toggle, tabs, activeTab) {
    tabs.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.tabIndex = isActive ? 0 : -1;
    });
  
    const value = activeTab.getAttribute('data-value') || activeTab.textContent?.trim() || '';
    toggle.setAttribute('data-active', value);
  
    toggle.dispatchEvent(
      new CustomEvent('productToggle:change', {
        bubbles: true,
        detail: { value },
      })
    );
  }
  
  // Auto-init (industry standard for Astro navigation too)
  function boot() {
    initProductToggles(document);
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  
  document.addEventListener("astro:page-load", boot);