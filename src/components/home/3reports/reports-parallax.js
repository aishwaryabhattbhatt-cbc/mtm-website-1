(() => {
  const footer = document.querySelector(".reports-footer");
  if (!footer) return;

  // Tune this: smaller = subtler
  const speed = 0.2;

  // Respect reduced motion
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;

  let ticking = false;

  function update() {
    const vh = window.innerHeight;
    const rect = footer.getBoundingClientRect();

    // Only animate when it is on screen (or near it)
    const inView = rect.bottom > 0 && rect.top < vh;
    if (!inView) {
      footer.style.transform = "translate3d(0, 0, 0)";
      ticking = false;
      return;
    }

    // How far it has entered the viewport
    const entered = vh - rect.top;
    const offsetY = -(entered * speed);

    footer.style.transform = `translate3d(0, ${offsetY}px, 0)`;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
})();
