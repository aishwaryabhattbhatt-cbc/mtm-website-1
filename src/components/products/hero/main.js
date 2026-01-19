// src/components/solutions/hero/industry/main.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("[data-hero-scene]");
  if (!container) return;

  const raw = container.getAttribute("data-scene");
  if (!raw) return;

  let scene;
  try {
    scene = JSON.parse(raw);
  } catch {
    return;
  }

  buildScene(container, scene);
});

function buildScene(container, scene) {
  // 1) Static Hero Image (Single) 
  const img = container.querySelector("[data-hero-img]");
  if (img && scene.image) img.src = scene.image;

  // 2) Orbit Layer & Masking (Single) 
  const orbitLayer = container.querySelector("[data-hero-orbits]");
  const iconsLayer = container.querySelector("[data-hero-icons]");
  if (!orbitLayer || !iconsLayer) return;

  if (scene.maskImage) {
    orbitLayer.style.webkitMaskImage = `linear-gradient(#fff 0 0), url(${scene.maskImage})`;
    orbitLayer.style.maskImage = `linear-gradient(#fff 0 0), url(${scene.maskImage})`;
    orbitLayer.style.webkitMaskRepeat = "no-repeat, no-repeat";
    orbitLayer.style.maskRepeat = "no-repeat, no-repeat";
    orbitLayer.style.webkitMaskPosition = "0 0, center";
    orbitLayer.style.maskPosition = "0 0, center";
    orbitLayer.style.webkitMaskSize = "100% 100%, cover";
    orbitLayer.style.maskSize = "100% 100%, cover";
    orbitLayer.style.webkitMaskComposite = "xor";
    orbitLayer.style.maskComposite = "exclude";
  }

  const blocker = container.querySelector(".hero-orbit-blocker");
  if (blocker && scene.orbitBlocker) {
    blocker.style.backgroundImage = `url(${scene.orbitBlocker})`;
  }

  // Clear existing elements for hot-reload safety 
  orbitLayer.querySelectorAll(".orbit").forEach((n) => n.remove());
  iconsLayer.querySelectorAll(".hero-icon").forEach((n) => n.remove());

  let maxOrbitDelay = 0;

  // 3) Loop through groups to create multiple sets of orbits and icons
  const groups = Array.isArray(scene.groups) ? scene.groups : [];
  
  groups.forEach((group) => {
    const orbits = group.orbits || [];
    const icons = group.icons || [];
    const centerOffset = group.centerOffset || { x: 0, y: 0 };

    // Build Orbit Rings for this group
    orbits.forEach((orbit) => {
      const div = document.createElement("div");
      div.className = "orbit";
      const radius = Number(orbit.radius) || 0;
      const delay = Number(orbit.delay) || 0;
      maxOrbitDelay = Math.max(maxOrbitDelay, delay);

      div.style.width = `${radius * 2}px`;
      div.style.height = `${radius * 2}px`;
      div.style.transitionDelay = `${delay}s`;
      div.style.left = `calc(50% + ${centerOffset.x}px)`;
      div.style.top = `calc(50% + ${centerOffset.y}px)`;
      div.style.transform = "translate(-50%, -50%) scale(0.6)";
      orbitLayer.appendChild(div);
    });

    // Build Icons for this group
    icons.forEach((ic) => {
      const icon = document.createElement("img");
      icon.src = ic.file;
      icon.className = "hero-icon";
      icon.dataset.tooltip = ic.tooltip || "";
      icon.dataset.angle = String(ic.angle ?? 0);

      const orbitCfg = orbits[ic.orbit] || orbits[0];
      const radius = orbitCfg ? Number(orbitCfg.radius) || 0 : 0;
      const angleRad = (Number(ic.angle || 0) * Math.PI) / 180;
      
      const x = Math.cos(angleRad) * radius;
      const y = Math.sin(angleRad) * radius;

      icon.style.left = `calc(50% + ${centerOffset.x}px + ${x}px)`;
      icon.style.top = `calc(50% + ${centerOffset.y}px + ${y}px)`;

      // Randomize animation 
      const randomDuration = (Math.random() * 2 + 3.5).toFixed(2);
      const randomDelay = (Math.random() * 4).toFixed(2);
      icon.style.animationDuration = `${randomDuration}s`;
      icon.style.animationDelay = `-${randomDelay}s`;
      icon.style.animationDirection = Math.random() < 0.5 ? "normal" : "reverse";

      iconsLayer.appendChild(icon);
    });
  });

  setupTooltip(container);

  // 4) Animate In Logic 
  const orbitAnimDuration = 0.5;
  const iconsBaseDelayMs = (maxOrbitDelay + orbitAnimDuration) * 1000;

  setTimeout(() => {
    const icons = container.querySelectorAll(".hero-icon");
    icons.forEach((ic, i) => setTimeout(() => (ic.style.opacity = "1"), i * 150));
  }, iconsBaseDelayMs);

  requestAnimationFrame(() => startAnimation(container));
}

function startAnimation(container) {
  const img = container.querySelector(".hero-img");
  if (img) {
    img.style.opacity = "1";
    img.style.transform = "translateY(0)";
  }

  container.querySelectorAll(".orbit").forEach((o) => {
    void o.offsetHeight; // trigger reflow
    o.style.opacity = "1";
    o.style.transform = "translate(-50%, -50%) scale(1)";
  });
}

function setupTooltip(container) {
  const existing = container.querySelector(".tooltip");
  if (existing) existing.remove();

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  container.appendChild(tooltip);

  container.querySelectorAll(".hero-icon").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      const angle = parseFloat(icon.dataset.angle || "0");
      tooltip.innerText = icon.dataset.tooltip || "";
      tooltip.style.left = icon.style.left;
      tooltip.style.top = icon.style.top;

      const rightSide = angle > 270 || angle < 90; // Logic for tooltip side 
      const finalTransform = rightSide
        ? "translate(40px, -50%)"
        : "translate(calc(-100% - 40px), -50%)";

      tooltip.style.opacity = "0";
      tooltip.style.transform = "translate(-50%, -50%)";

      requestAnimationFrame(() => {
        tooltip.style.opacity = "1";
        tooltip.style.transform = finalTransform;
      });
    });

    icon.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  });
}