
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
  // 1) Hero image
  const img = container.querySelector("[data-hero-img]");
  if (img && scene.image) img.src = scene.image;

  // 2) Orbit layer + mask
  const orbitLayer = container.querySelector("[data-hero-orbits]");
  if (!orbitLayer) return;

  // Apply mask via JS so each page can pass a different maskImage
  if (scene.maskImage) {
    orbitLayer.style.webkitMaskImage = `linear-gradient(#fff 0 0), url(${scene.maskImage})`;
    orbitLayer.style.maskImage = `linear-gradient(#fff 0 0), url(${scene.maskImage})`;

    orbitLayer.style.webkitMaskRepeat = "no-repeat, no-repeat";
    orbitLayer.style.maskRepeat = "no-repeat, no-repeat";

    orbitLayer.style.webkitMaskPosition = "0 0, center";
    orbitLayer.style.maskPosition = "0 0, center";

    orbitLayer.style.webkitMaskSize = "100% 100%, cover";
    orbitLayer.style.maskSize = "100% 100%, cover";

    // Best-effort: webkit uses xor, standard uses exclude
    orbitLayer.style.webkitMaskComposite = "xor";
    orbitLayer.style.maskComposite = "exclude";
  }

  // 3) White blocker image (must live inside orbit layer, above orbits)
  const blocker = container.querySelector(".hero-orbit-blocker");
  if (blocker && scene.orbitBlocker) {
    blocker.style.backgroundImage = `url(${scene.orbitBlocker})`;
  }

  // 4) Build orbit rings
  const orbits = Array.isArray(scene.orbits) ? scene.orbits : [];
  const centerOffset = scene.centerOffset || { x: 0, y: 0 };
  const offsetX = centerOffset.x || 0;
  const offsetY = centerOffset.y || 0;

  // Clear any existing rings/icons (hot reload safety)
  orbitLayer.querySelectorAll(".orbit").forEach((n) => n.remove());

  const iconsLayer = container.querySelector("[data-hero-icons]");
  if (iconsLayer) iconsLayer.querySelectorAll(".hero-icon").forEach((n) => n.remove());

  let maxOrbitDelay = 0;
  orbits.forEach((orbit) => {
    const div = document.createElement("div");
    div.className = "orbit";

    const radius = Number(orbit.radius) || 0;
    const delay = Number(orbit.delay) || 0;
    maxOrbitDelay = Math.max(maxOrbitDelay, delay);

    div.style.width = `${radius * 2}px`;
    div.style.height = `${radius * 2}px`;
    div.style.transitionDelay = `${delay}s`;
    div.style.left = `calc(50% + ${offsetX}px)`;
    div.style.top = `calc(50% + ${offsetY}px)`;
    div.style.transform = "translate(-50%, -50%) scale(0.6)";

    orbitLayer.appendChild(div);
  });

  // 5) Build icons (NOT masked)
  const iconData = Array.isArray(scene.icons) ? scene.icons : [];
  if (iconsLayer && iconData.length) {
    iconData.forEach((ic) => {
      const icon = document.createElement("img");
      icon.src = ic.file;
      icon.className = "hero-icon";
      icon.dataset.tooltip = ic.tooltip || "";
      icon.dataset.angle = String(ic.angle ?? 0);

      const orbitCfg = orbits[ic.orbit] || orbits[0];
      const radius = orbitCfg ? Number(orbitCfg.radius) || 0 : 0;

      const angleDeg = Number(ic.angle) || 0;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = Math.cos(angleRad) * radius;
      const y = Math.sin(angleRad) * radius;

      icon.style.left = `calc(50% + ${offsetX}px + ${x}px)`;
      icon.style.top = `calc(50% + ${offsetY}px + ${y}px)`;

      // Gentle randomization
      const randomDuration = (Math.random() * (5.5 - 3.5) + 3.5).toFixed(2);
      const randomDelay = (Math.random() * 4).toFixed(2);
      const randomDirection = Math.random() < 0.5 ? "normal" : "reverse";

      icon.style.animationDuration = `${randomDuration}s`;
      icon.style.animationDelay = `-${randomDelay}s`;
      icon.style.animationDirection = randomDirection;

      iconsLayer.appendChild(icon);
    });

    setupTooltip(container);
  }

  // 6) Animate in
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
    void o.offsetHeight;
    o.style.opacity = "1";
    o.style.transform = "translate(-50%, -50%) scale(1)";
  });
}

function setupTooltip(container) {
  // Ensure only one tooltip exists
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

      const rightSide = angle > 270;
      tooltip.style.textAlign = rightSide ? "left" : "right";

      const finalTransform = rightSide
        ? "translate(40px, -50%)"
        : "translate(calc(-100% - 40px), -50%)";
      const startTransform = rightSide
        ? "translate(55px, -50%)"
        : "translate(calc(-100% - 55px), -50%)";

      tooltip.style.transform = startTransform;
      tooltip.style.opacity = "0";

      requestAnimationFrame(() => {
        tooltip.style.opacity = "1";
        tooltip.style.transform = finalTransform;
      });
    });

    icon.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
      tooltip.style.transform = "translate(-50%, -50%)";
    });
  });
}