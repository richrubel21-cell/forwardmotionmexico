/* Forward Motion Project México — language toggle (Spanish default, English secondary).
 *
 * Scaffolding only for now: Spanish (data-es / data-es-content) currently MIRRORS the
 * English text as a placeholder so the site reads correctly. Replace the data-es /
 * data-es-content values with the approved Spanish copy when ready — no JS changes needed.
 *
 * How it works:
 *   - Any element with data-es / data-en has its visible text swapped on toggle.
 *   - Any element with data-es-content / data-en-content has its `content` attribute
 *     swapped (used for <meta name="description">).
 *   - The chosen language is remembered in localStorage and applied on every page load.
 *   - Default language is Spanish ('es').
 */
(function () {
  var KEY = 'fmx-lang';
  var DEFAULT_LANG = 'es';

  function apply(lang) {
    document.documentElement.setAttribute('lang', lang);

    var textNodes = document.querySelectorAll('[data-es]');
    for (var i = 0; i < textNodes.length; i++) {
      var t = textNodes[i].getAttribute('data-' + lang);
      if (t !== null) textNodes[i].textContent = t;
    }

    var attrNodes = document.querySelectorAll('[data-es-content]');
    for (var j = 0; j < attrNodes.length; j++) {
      var c = attrNodes[j].getAttribute('data-' + lang + '-content');
      if (c !== null) attrNodes[j].setAttribute('content', c);
    }

    var btn = document.getElementById('langToggle');
    if (btn) {
      // Button shows the language you can switch TO.
      btn.textContent = (lang === 'es') ? 'EN' : 'ES';
      btn.setAttribute('aria-label', (lang === 'es') ? 'Switch to English' : 'Cambiar a español');
    }
  }

  function currentLang() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    return (saved === 'en' || saved === 'es') ? saved : DEFAULT_LANG;
  }

  function init() {
    apply(currentLang());
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = (document.documentElement.getAttribute('lang') === 'es') ? 'en' : 'es';
        try { localStorage.setItem(KEY, next); } catch (e) {}
        apply(next);
      });
    }
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
