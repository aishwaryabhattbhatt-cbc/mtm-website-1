
export function initProductsBoard(defaultId = "18") {
    const cards = document.querySelectorAll(".product-role");
    const heroImg = document.getElementById("products-hero-img");
    const toolsItems = document.getElementById("tools-items");
  
    if (!cards.length) return;
  
    const renderTools = (card) => {
      if (!toolsItems) return;
  
      const toolsJson = card.getAttribute("data-tools");
      const tools = toolsJson ? JSON.parse(toolsJson) : [];
  
      toolsItems.innerHTML = tools
        .map(
          (tool) => `
            <div class="tool-item" data-tool-id="${tool.id}">
              <img class="tool-icon" src="${tool.icon}" alt="" aria-hidden="true" />
              <span class="body-m">${tool.label}</span>
            </div>
          `
        )
        .join("");
    };
  
    const setActive = (activeId) => {
      cards.forEach((card) => {
        const id = card.getAttribute("data-product-id");
        const slug = card.getAttribute("data-product-slug");
        const cta = card.querySelector(".product-cta");
        const lang = document.documentElement.lang || "en";
        if (cta) {
          const finalSlug = slug || id;
          cta.href = `/mtm-website-1/${lang}/products/${finalSlug}`;
        }
        const icon = card.querySelector(".product-icon-img");
        const heroSrc = card.getAttribute("data-hero-img");
  
        const isActive = id === activeId;
        card.classList.toggle("is-active", isActive);
  
        if (icon) {
          icon.src = `/mtm-website-1/icons/Products/${id}-${isActive ? "active" : "inactive"}.svg`;
        }
  
        if (isActive) {
          if (heroImg && heroSrc) heroImg.src = heroSrc;
          renderTools(card);
        }
      });
    };
  
    // default state
    setActive(defaultId);
  
    // hover = active
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        setActive(card.getAttribute("data-product-id"));
      });
    });
  
  }
  