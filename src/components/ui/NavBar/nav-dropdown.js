document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("navDropdown");
    if (!dropdown) return;
  
    const triggers = Array.from(document.querySelectorAll("[data-dropdown-trigger]"));
    const panels = Array.from(dropdown.querySelectorAll("[data-panel]"));
  
    let activeKey = null;
    let closeTimer = null;
    const CLOSE_DELAY_MS = 350;
  
    // Ensure a clean initial state (prevents "all showing" on first paint)
    panels.forEach((p) => (p.hidden = true));
    dropdown.classList.remove("is-open");
    dropdown.setAttribute("aria-hidden", "true");
    triggers.forEach((t) => t.setAttribute("aria-expanded", "false"));
  
    const setExpanded = (el, val) => el.setAttribute("aria-expanded", val ? "true" : "false");
  
    function clearCloseTimer() {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
    }
  
    function hideDropdown() {
      activeKey = null;
      dropdown.classList.remove("is-open");
      dropdown.setAttribute("aria-hidden", "true");
      panels.forEach((p) => (p.hidden = true));
      triggers.forEach((t) => setExpanded(t, false));
    }
  
    function showPanel(key) {
      activeKey = key;
  
      dropdown.classList.add("is-open");
      dropdown.setAttribute("aria-hidden", "false");
  
      panels.forEach((p) => {
        p.hidden = p.getAttribute("data-panel") !== key;
      });
  
      triggers.forEach((t) => setExpanded(t, t.getAttribute("data-dropdown-trigger") === key));
    }
  
    function scheduleClose() {
      clearCloseTimer();
      closeTimer = window.setTimeout(hideDropdown, CLOSE_DELAY_MS);
    }
  
    // Trigger interactions
    triggers.forEach((t) => {
      const key = t.getAttribute("data-dropdown-trigger");
  
      t.addEventListener("mouseenter", () => {
        clearCloseTimer();
        showPanel(key);
      });
  
      t.addEventListener("focus", () => {
        clearCloseTimer();
        showPanel(key);
      });
  
      t.addEventListener("mouseleave", scheduleClose);
  
      t.addEventListener("blur", () => {
        setTimeout(() => {
          const active = document.activeElement;
          if (!dropdown.contains(active)) scheduleClose();
        }, 0);
      });
    });
  
    // Keep open while hovering dropdown
    dropdown.addEventListener("mouseenter", clearCloseTimer);
    dropdown.addEventListener("mouseleave", scheduleClose);
  
    // Close on Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hideDropdown();
    });
  
    // Close on outside click
    document.addEventListener("pointerdown", (e) => {
      const target = e.target;
      const clickedTrigger = triggers.some((t) => t.contains(target));
      const clickedDropdown = dropdown.contains(target);
  
      if (!clickedTrigger && !clickedDropdown && dropdown.classList.contains("is-open")) {
        hideDropdown();
      }
    });
  });