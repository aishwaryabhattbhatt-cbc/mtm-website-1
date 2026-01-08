export function initSolutionsBoard(solutionsData, defaultId = "media") {
    const buttons = document.querySelectorAll(".role-btn");
    const description = document.querySelector(".role-description");
    const cta = document.querySelector(".board-cta .btn-tertiary");
    const clientImg = document.querySelector("#client-logo-image");
  
    if (!buttons.length) return;
  
    const setActive = (activeId) => {
      const data = solutionsData.find(item => item.id === activeId);
      if (!data) return;
  
      buttons.forEach(btn => {
        const id = btn.getAttribute("data-role-id");
        const img = btn.querySelector(".role-icon-img");
        const isActive = id === activeId;
  
        btn.classList.toggle("is-active", isActive);
  
        if (img) {
          img.src = `/mtm-website/icons/Solutions/${id}-${isActive ? "active" : "inactive"}.svg`;
        }
      });
  
      description.textContent = data.description;
      cta.textContent = data.ctaLabel;
      cta.href = `/mtm-website/${document.documentElement.lang || "en"}/solutions/${data.id}`;
      clientImg.src = data.clientLogos;
    };
  
    /* default state */
    setActive(defaultId);
  
    /* hover = active */
    buttons.forEach(btn => {
      btn.addEventListener("mouseenter", () => {
        setActive(btn.getAttribute("data-role-id"));
      });
    });
  
    
  }
  