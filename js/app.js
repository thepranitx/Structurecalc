(() => {
  const menu = document.querySelector('.menu-btn');
  const nav = document.querySelector('.main-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }

  const search = document.querySelector('#search');
  const cards = [...document.querySelectorAll('.category-card')];
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      cards.forEach(card => {
        card.hidden = q && !(card.dataset.search || '').includes(q);
      });
    });
  }

  document.querySelectorAll('.coming-soon').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      alert('This calculator is planned for a future StructureCalc release.');
    });
  });
})();