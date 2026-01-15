(function () {
  const stage = document.querySelector('[data-whyus-scene]');
  const section = document.querySelector('.why-us');
  const imageBox = document.querySelector('.why-us-image');
  const topPanel = document.querySelector('.panel-top');
  const leftPanel = document.querySelector('.panel-left');
  const rightPanel = document.querySelector('.panel-right');

  if (!stage || !section || !imageBox || !topPanel || !leftPanel || !rightPanel) return;

  // 1. READ DYNAMIC DATA FROM ASTRO ATTRIBUTE
  const sceneData = JSON.parse(stage.getAttribute('data-whyus-scene'));
  const F1 = sceneData.F1;
  const F2 = sceneData.F2; // Renamed from F3

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const lerp  = (a, b, t) => a + (b - a) * t;

  // 2. IMAGE FRAME POSITIONS (Vertical offset)
  const IMG_F1 = { y: 0 };  
  const IMG_F2 = { y: 60 }; 

  function setPanelPos(el, pos) {
    el.style.left = pos.x + '%';
    el.style.top  = pos.y + '%';
  }

  function interpFrames(fA, fB, t) {
    return {
      top: {
        x: lerp(fA.top.x,   fB.top.x,   t),
        y: lerp(fA.top.y,   fB.top.y,   t)
      },
      left: {
        x: lerp(fA.left.x,  fB.left.x,  t),
        y: lerp(fA.left.y,  fB.left.y,  t)
      },
      right: {
        x: lerp(fA.right.x, fB.right.x, t),
        y: lerp(fA.right.y, fB.right.y, t)
      }
    };
  }

  function updateOnScroll() {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;
    const totalScrollable = sectionHeight - viewportHeight;
    
    if (totalScrollable <= 0) return;

    const sectionScroll = clamp(-rect.top, 0, totalScrollable);
    const raw = sectionScroll / totalScrollable; 

    const holdStart = 0.8; 
    let t = raw < holdStart ? raw / holdStart : 1;

    // ---- PANELS: Interpolate between F1 and F2 ----
    const frameNow = interpFrames(F1, F2, t);

    setPanelPos(topPanel,  frameNow.top);
    setPanelPos(leftPanel, frameNow.left);
    setPanelPos(rightPanel, frameNow.right);



    // ---- IMAGE BOX: scale starts at 0.8 (20% padding) ----
    const scaleF1 = 0.8;   
    const scaleF2 = 0.45;  

    const imgScale = lerp(scaleF1, scaleF2, t);
    const imgY     = lerp(IMG_F1.y, IMG_F2.y, t);

    imageBox.style.transform = `translateY(${imgY}px) scale(${imgScale})`;

    // ---- CORNER RADIUS ----
    const radiusF1 = 12; // Starts slightly rounded since it's not full screen
    const radiusF2 = 24; 
    const radius = lerp(radiusF1, radiusF2, t);
    imageBox.style.borderRadius = radius + 'px';
  }

  window.addEventListener('scroll', updateOnScroll, { passive: true });
  window.addEventListener('resize', updateOnScroll);
  updateOnScroll();
})();