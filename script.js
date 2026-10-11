// Project filters + "Show all projects".
// Each <article class="card"> lists its tags in data-tags. Card order = priority.
(function () {
  var LIMIT = 6; // cards shown before "Show all projects"
  var buttons = document.querySelectorAll('.filter');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.projects .card'));
  var countEl = document.getElementById('project-count');
  var totalEl = document.getElementById('project-total');
  var noResults = document.querySelector('.no-results');
  var row = document.querySelector('.projects');
  var moreRow = document.querySelector('.more-row');
  var moreBtn = document.querySelector('.more-btn');
  var phone = window.matchMedia('(max-width: 640px)');
  var current = 'all';
  var expanded = false;

  if (totalEl) totalEl.textContent = cards.length;

  function render() {
    var matches = cards.filter(function (card) {
      var tags = (card.getAttribute('data-tags') || '').split(/\s+/);
      return current === 'all' || tags.indexOf(current) !== -1;
    });
    // Limit only applies to "All" on larger screens (phones use a swipe row)
    var limited = current === 'all' && !expanded && !phone.matches && matches.length > LIMIT;
    var shown = 0;
    cards.forEach(function (card) {
      var idx = matches.indexOf(card);
      var visible = idx !== -1 && (!limited || idx < LIMIT);
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (countEl) countEl.textContent = shown;
    if (noResults) noResults.hidden = shown !== 0;
    if (moreRow) moreRow.hidden = !(current === 'all' && !phone.matches && matches.length > LIMIT);
    if (moreBtn) {
      moreBtn.textContent = expanded ? 'Show fewer projects' : 'Show all ' + matches.length + ' projects';
      moreBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }
    buttons.forEach(function (b) {
      var on = b.getAttribute('data-filter') === current;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      current = b.getAttribute('data-filter');
      if (row) row.scrollLeft = 0;
      render();
    });
  });

  if (moreBtn) {
    moreBtn.addEventListener('click', function () {
      var wasExpanded = expanded;
      expanded = !expanded;
      render();
      if (wasExpanded) document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (phone.addEventListener) phone.addEventListener('change', render);
  render();

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

// Organisations strip: show logos when the files exist, and loop the list seamlessly.
(function () {
  var section = document.querySelector('.orgs');
  if (!section) return;
  var list = section.querySelector('.org-list');
  var track = section.querySelector('.orgs-track');
  var pause = section.querySelector('.orgs-pause');

  // Swap each name for its logo if assets/img/logo-<name>.png (or .svg) exists
  list.querySelectorAll('.org[data-logo]').forEach(function (li) {
    var name = li.getAttribute('data-logo');
    var label = li.textContent.trim();
    var exts = ['png', 'svg'];
    (function tryNext(i) {
      if (i >= exts.length) return; // no logo file: keep the text name
      var img = new Image();
      img.alt = label;
      img.onload = function () {
        // Square/round logos get a little more height so they match wide logos visually
        if (img.naturalWidth / img.naturalHeight < 1.6) img.className = 'is-square';
        li.innerHTML = '';
        li.appendChild(img);
        syncClone();
      };
      img.onerror = function () { tryNext(i + 1); };
      img.src = 'assets/img/logo-' + name + '.' + exts[i];
    })(0);
  });

  // Add 3 hidden copies (4 in total) so the loop never shows a gap, even on wide screens.
  // The animation moves exactly half the track, i.e. two copies, then repeats.
  var clones = [];
  for (var k = 0; k < 3; k++) {
    var c = list.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    track.appendChild(c);
    clones.push(c);
  }
  function syncClone() {
    clones.forEach(function (c) {
      c.innerHTML = list.innerHTML;
      c.querySelectorAll('img').forEach(function (im) { im.alt = ''; });
    });
  }

  if (pause) {
    pause.addEventListener('click', function () {
      var paused = section.classList.toggle('is-paused');
      pause.textContent = paused ? 'Play' : 'Pause';
      pause.setAttribute('aria-pressed', paused ? 'true' : 'false');
    });
  }
})();

// Writing: show my latest Medium posts from assets/data/medium.json
// (that file is refreshed daily by .github/workflows/medium-posts.yml)
(function () {
  var section = document.getElementById('writing');
  if (!section || !window.fetch) return;
  var list = section.querySelector('.posts');
  var empty = section.querySelector('.posts-empty');
  var SHOW = 3;

  function formatDate(iso) {
    var p = (iso || '').split('-');
    if (p.length !== 3) return '';
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  fetch('assets/data/medium.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var posts = (data.posts || []).slice(0, SHOW);
      if (!posts.length) throw new Error('no posts');
      posts.forEach(function (p) {
        var li = el('li', 'post');
        var a = el('a', 'post-link');
        a.href = p.url;
        a.target = '_blank';
        a.rel = 'noopener';
        var meta = formatDate(p.date);
        if (p.minutes) meta += (meta ? ' · ' : '') + p.minutes + ' min read';
        a.appendChild(el('span', 'post-date', meta));
        a.appendChild(el('h3', 'post-title', p.title));
        if (p.excerpt) a.appendChild(el('p', 'post-excerpt', p.excerpt));
        a.appendChild(el('span', 'post-more', 'Read on Medium ↗'));
        li.appendChild(a);
        list.appendChild(li);
      });
      list.hidden = false;
    })
    .catch(function () { if (empty) empty.hidden = false; });
})();
