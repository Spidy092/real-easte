(function () {
  'use strict';

  var menuButton = document.querySelector('[data-menu-toggle]');
  var primaryNav = document.querySelector('[data-primary-nav]');

  if (menuButton && primaryNav) {
    menuButton.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  document.querySelectorAll('[data-faq-question]').forEach(function (question) {
    question.addEventListener('click', function () {
      var answerId = question.getAttribute('aria-controls');
      var answer = document.getElementById(answerId);
      var isOpen = question.getAttribute('aria-expanded') === 'true';
      if (!answer) return;
      question.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
      var marker = question.querySelector('[data-faq-marker]');
      if (marker) marker.textContent = isOpen ? '+' : '−';
    });
  });

  document.querySelectorAll('[data-lead-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var status = form.querySelector('[data-form-status]');
      if (status) {
        status.hidden = false;
        status.textContent = 'This preview form is not connected yet. Please email sale@bhaivatech.com or WhatsApp +91 81975 19766.';
      }
      form.reset();
    });
  });

  /* gstack-shortcut(dec-29d0bfb4-1c5e-407a-89c8-eeb99f6dd342): curated static directory ceiling; upgrade when live inventory and repeated enquiries justify a marketplace backend. */
  var propertyCards = Array.prototype.slice.call(document.querySelectorAll('[data-property-card]'));
  var emptyState = document.querySelector('[data-empty-state]');
  var resultCount = document.querySelector('[data-result-count]');
  var filters = document.querySelectorAll('[data-property-filter]');

  function filterProperties() {
    if (!propertyCards.length) return;
    var values = {};
    filters.forEach(function (filter) {
      values[filter.name] = filter.value.toLowerCase();
    });

    var visibleCount = 0;
    propertyCards.forEach(function (card) {
      var matches = Object.keys(values).every(function (key) {
        return !values[key] || (card.dataset[key] || '').toLowerCase().indexOf(values[key]) !== -1;
      });
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (resultCount) {
      resultCount.textContent = visibleCount + (visibleCount === 1 ? ' property' : ' properties');
    }
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  filters.forEach(function (filter) {
    filter.addEventListener('input', filterProperties);
    filter.addEventListener('change', function () {
      var nextParams = new URLSearchParams();
      filters.forEach(function (item) {
        if (item.value) nextParams.set(item.name, item.value);
      });
      var query = nextParams.toString();
      window.history.replaceState({}, '', window.location.pathname + (query ? '?' + query : ''));
      filterProperties();
    });
  });

  var clearFilters = document.querySelector('[data-clear-filters]');
  if (clearFilters) {
    clearFilters.addEventListener('click', function () {
      filters.forEach(function (filter) { filter.value = ''; });
      window.history.replaceState({}, '', window.location.pathname);
      filterProperties();
    });
  }

  var params = new URLSearchParams(window.location.search);
  filters.forEach(function (filter) {
    var value = params.get(filter.name);
    if (value) filter.value = value;
  });
  filterProperties();

  var queryLocality = params.get('locality');
  var queryIntent = params.get('intent');
  document.querySelectorAll('[data-query-locality]').forEach(function (element) {
    if (queryLocality) element.textContent = queryLocality;
  });
  document.querySelectorAll('[data-query-intent]').forEach(function (element) {
    if (queryIntent) element.textContent = queryIntent === 'rent' ? 'Rent' : queryIntent === 'buy' ? 'Buy' : queryIntent;
  });

  function relayoutPretext() {
    var pretext = window.Pretext;
    var elements = document.querySelectorAll('[data-pretext]');
    if (!pretext || typeof pretext.prepare !== 'function' || typeof pretext.layout !== 'function') return;

    elements.forEach(function (element) {
      var font = window.getComputedStyle(element).font;
      var lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
      var prepared = pretext.prepare(element.textContent, font);
      var result = pretext.layout(prepared, element.clientWidth, lineHeight);
      if (result && result.height) element.style.minHeight = result.height + 'px';
    });
  }

  function setupPretext() {
    if (!document.fonts || !document.fonts.ready) {
      relayoutPretext();
      return;
    }
    document.fonts.ready.then(relayoutPretext);

    document.querySelectorAll('[data-pretext][contenteditable="true"]').forEach(function (element) {
      new MutationObserver(function () {
        relayoutPretext();
      }).observe(element, { characterData: true, childList: true, subtree: true });
    });

    if ('ResizeObserver' in window) {
      new ResizeObserver(relayoutPretext).observe(document.body);
    } else {
      window.addEventListener('resize', relayoutPretext, { passive: true });
    }
  }

  window.addEventListener('pretext-ready', relayoutPretext, { once: true });
  setupPretext();
})();
