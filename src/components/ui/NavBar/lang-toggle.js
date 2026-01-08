document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('.lang-toggle');
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all, add to the one clicked
      langButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
});