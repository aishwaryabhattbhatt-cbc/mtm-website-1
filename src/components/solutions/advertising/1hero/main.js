// main.js
import { scenes } from "./scene.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("[data-hero-scene]");
  if (!container) return;

  const scene = scenes[0];
  buildScene(container, scene);
});

function buildScene(container, scene) {
  const img = document.createElement("img");
  img.src = scene.image;
  img.className = "hero-img";
  container.appendChild(img);

  const orbitLayer = container.querySelector("[data-hero-orbits]") || container;

  const orbitAnimDuration = 0.5;
  const maxOrbitDelay = scene.orbits.reduce((max, o) => Math.max(max, o.delay), 0);
  const iconsBaseDelayMs = (maxOrbitDelay + orbitAnimDuration) * 1000;

  fetch(scene.iconsJson)
    .then((r) => r.json())
    .then((data) => {
      const iconData = data.icons;
      const centerOffset = data.centerOffset || { x: 0, y: 0 };
      const offsetX = centerOffset.x || 0;
      const offsetY = centerOffset.y || 0;

      scene.orbits.forEach((orbit) => {
        const div = document.createElement("div");
        div.className = "orbit";
        div.style.width = orbit.radius * 2 + "px";
        div.style.height = orbit.radius * 2 + "px";
        div.style.transitionDelay = orbit.delay + "s";
        div.style.left = `calc(50% + ${offsetX}px)`;
        div.style.top = `calc(50% + ${offsetY}px)`;
        div.style.transform = "translate(-50%, -50%) scale(0.6)";
        orbitLayer.appendChild(div);
      });

      iconData.forEach((ic) => {
        const icon = document.createElement("img");
        icon.src = ic.file;
        icon.className = "hero-icon";
        icon.dataset.tooltip = ic.tooltip;
        icon.dataset.angle = ic.angle;

        const orbitCfg = scene.orbits[ic.orbit] || scene.orbits[0];
        const radius = orbitCfg.radius;

        const angleRad = (ic.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        icon.style.left = `calc(50% + ${offsetX}px + ${x}px)`;
        icon.style.top = `calc(50% + ${offsetY}px + ${y}px)`;

        const randomDuration = (Math.random() * (5.5 - 3.5) + 3.5).toFixed(2);
        const randomDelay = (Math.random() * 4).toFixed(2);
        const randomDirection = Math.random() < 0.5 ? "normal" : "reverse";

        icon.style.animationDuration = `${randomDuration}s`;
        icon.style.animationDelay = `-${randomDelay}s`;
        icon.style.animationDirection = randomDirection;

        container.appendChild(icon);
      });

      setupTooltip(container);

      setTimeout(() => {
        const icons = container.querySelectorAll(".hero-icon");
        icons.forEach((ic, i) => setTimeout(() => (ic.style.opacity = 1), i * 150));
      }, iconsBaseDelayMs);

      requestAnimationFrame(() => startAnimation(container));
    })
    .catch(() => requestAnimationFrame(() => startAnimation(container)));
}

function startAnimation(container) {
  const img = container.querySelector(".hero-img");
  if (img) {
    img.style.opacity = 1;
    img.style.transform = "translateY(0)";
  }

  container.querySelectorAll(".orbit").forEach((o) => {
    void o.offsetHeight;
    o.style.opacity = 1;
    o.style.transform = "translate(-50%, -50%) scale(1)";
  });
}

function setupTooltip(container) {
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
      tooltip.style.opacity = 0;

      requestAnimationFrame(() => {
        tooltip.style.opacity = 1;
        tooltip.style.transform = finalTransform;
      });
    });

    icon.addEventListener("mouseleave", () => {
      tooltip.style.opacity = 0;
      tooltip.style.transform = "translate(-50%, -50%)";
    });
  });
}