/* Forward Motion Project México — private access gate.
 *
 * Simple client-side gate for the private review period. It hides every page
 * behind an access-code prompt until the correct code is entered; the unlock is
 * remembered in localStorage so the visitor only enters it once.
 *
 * NOTE: This is a client-side gate (the page content still exists in the source),
 * so it keeps the general public out but is not cryptographically secure. Remove
 * the <script src="assets/gate.js"> include from each page to take the gate down
 * when the site goes public.
 */
(function () {
  var KEY = 'fmx-gate-ok';
  var CODE = 'CANTU2026';

  function unlocked() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  // Already unlocked → let the page render normally.
  if (unlocked()) return;

  // Hide the page immediately (this runs in <head>, before the body paints).
  var root = document.documentElement;
  root.style.visibility = 'hidden';

  function unlock() {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
    var ov = document.getElementById('fmx-gate');
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    root.style.visibility = '';
  }

  function build() {
    var ov = document.createElement('div');
    ov.id = 'fmx-gate';
    ov.setAttribute('style', [
      'visibility:visible', 'position:fixed', 'inset:0', 'z-index:2147483647',
      'background:#0b1f3a', 'display:flex', 'align-items:center', 'justify-content:center',
      'padding:24px', 'font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif'
    ].join(';'));

    var card = document.createElement('div');
    card.setAttribute('style', [
      'visibility:visible', 'background:#ffffff', 'border-radius:14px', 'max-width:380px',
      'width:100%', 'padding:34px 30px', 'box-shadow:0 20px 60px rgba(0,0,0,0.4)', 'text-align:center'
    ].join(';'));

    card.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:6px;">' +
        '<span style="font-weight:800;color:#0b1f3a;font-size:15px;letter-spacing:-0.3px;">Forward Motion Project México</span>' +
        '<img src="assets/mx-flag.svg" alt="México" width="20" height="12" style="border-radius:2px;box-shadow:0 0 0 1px rgba(11,31,58,0.15);">' +
      '</div>' +
      '<p style="color:#6b7280;font-size:13px;margin:0 0 18px;">Sitio privado &middot; Private site</p>' +
      '<input id="fmx-code" type="password" autocomplete="off" ' +
        'placeholder="Código de acceso / Access code" ' +
        'style="width:100%;box-sizing:border-box;font-size:15px;padding:11px 14px;border:1.5px solid rgba(11,31,58,0.2);border-radius:8px;outline:none;text-align:center;letter-spacing:1px;">' +
      '<p id="fmx-err" style="color:#c0392b;font-size:12px;height:14px;margin:8px 0 0;visibility:hidden;">Código incorrecto &middot; Incorrect code</p>' +
      '<button id="fmx-enter" type="button" ' +
        'style="margin-top:12px;width:100%;background:linear-gradient(135deg,#9b59d0,#20b2aa);color:#fff;border:0;border-radius:999px;padding:11px;font-size:14px;font-weight:700;letter-spacing:0.5px;cursor:pointer;">Entrar &middot; Enter</button>';

    ov.appendChild(card);
    document.body.appendChild(ov);

    var input = document.getElementById('fmx-code');
    var err = document.getElementById('fmx-err');
    var btn = document.getElementById('fmx-enter');

    function attempt() {
      if (input.value.trim().toUpperCase() === CODE) {
        unlock();
      } else {
        err.style.visibility = 'visible';
        input.value = '';
        input.focus();
      }
    }

    btn.addEventListener('click', attempt);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') attempt(); });
    input.focus();
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
