
document.addEventListener('DOMContentLoaded', () => {
    const highlightEls = document.querySelectorAll('.hl-text');
    if (!highlightEls.length) return;
  
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
  
      highlightEls.forEach(el => observer.observe(el));
    } else {
      highlightEls.forEach(el => el.classList.add('is-visible'));
    }
  });
