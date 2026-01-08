// GRID TOGGLE SCRIPT 
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleGrid');
    const overlay = document.querySelector('.grid-overlay');
  
    if (!toggleBtn || !overlay) return;
  
    toggleBtn.addEventListener('click', () => {
      overlay.classList.toggle('hidden');
      toggleBtn.textContent = overlay.classList.contains('hidden')
        ? 'Show Grid'
        : 'Hide Grid';
    });
  });