// Project filters: each <article class="card"> lists its tags in data-tags.
(function () {
  var buttons = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.projects .card');
  var countEl = document.getElementById('project-count');
  var totalEl = document.getElementById('project-total');
  var noResults = document.querySelector('.no-results');
  var row = document.querySelector('.projects');

  if (totalEl) totalEl.textContent = cards.length;

  function applyFilter(filter) {
    var shown = 0;
    cards.forEach(function (card) {
      var tags = (card.getAttribute('data-tags') || '').split(/\s+/);
      var match = filter === 'all' || tags.indexOf(filter) !== -1;
      card.hidden = !match;
      if (match) shown += 1;
    });
    if (countEl) countEl.textContent = shown;
    if (noResults) noResults.hidden = shown !== 0;
    if (row) row.scrollLeft = 0; // back to the first card on phones
    buttons.forEach(function (b) {
      var on = b.getAttribute('data-filter') === filter;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { applyFilter(b.getAttribute('data-filter')); });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
