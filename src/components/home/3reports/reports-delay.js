// src/components/home/3 reports/reports-delay.js

const reportsSection = document.querySelector('.reports');
const reportsRight = document.querySelector('.reports-right');

// 1. Define your variable here
const DEFAULT_DELAY = 1500; 

if (reportsSection && reportsRight) {
  // Use the HTML attribute if it exists, otherwise use your variable
  const delayTime = reportsSection.dataset.delay 
    ? Number(reportsSection.dataset.delay) 
    : DEFAULT_DELAY;

  const observerOptions = { threshold: 0.4 };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Only the specific box waits for the delay
        setTimeout(() => {
          reportsRight.classList.add('reports-right--visible');
        }, delayTime);
        
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(reportsSection);
}