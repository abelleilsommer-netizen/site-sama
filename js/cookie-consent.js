/* ============================================================
   SAMA – Bandeau de consentement aux cookies (RGPD/CNIL)
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'sama_cookie_consent';

  // If the user has already made a choice, do nothing.
  if (localStorage.getItem(STORAGE_KEY)) return;

  /* ---------- Styles ---------- */
  var style = document.createElement('style');
  style.textContent = [
    '/* ── Cookie Banner ── */',
    '#sama-cookie-banner {',
    '  position: fixed;',
    '  bottom: 0; left: 0; right: 0;',
    '  z-index: 99999;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  flex-wrap: wrap;',
    '  gap: 16px;',
    '  padding: 18px 32px;',
    '  background: #528790;',
    '  color: #ffffff;',
    '  font-family: "Inter", sans-serif;',
    '  font-size: 13px;',
    '  line-height: 1.6;',
    '  box-shadow: 0 -4px 24px rgba(0,0,0,0.15);',
    '  transform: translateY(100%);',
    '  animation: samaCookieSlideIn 0.45s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;',
    '}',

    '@keyframes samaCookieSlideIn {',
    '  to { transform: translateY(0); }',
    '}',

    '@keyframes samaCookieSlideOut {',
    '  from { transform: translateY(0); }',
    '  to   { transform: translateY(110%); }',
    '}',

    '#sama-cookie-banner.sama-hiding {',
    '  animation: samaCookieSlideOut 0.35s cubic-bezier(0.55,0,1,0.45) forwards;',
    '}',

    '#sama-cookie-text {',
    '  flex: 1 1 320px;',
    '  min-width: 0;',
    '}',

    '#sama-cookie-text strong {',
    '  display: block;',
    '  font-size: 14px;',
    '  font-weight: 600;',
    '  letter-spacing: -0.01em;',
    '  margin-bottom: 4px;',
    '}',

    '#sama-cookie-text a {',
    '  color: #f9ff85;',
    '  text-decoration: underline;',
    '  text-underline-offset: 2px;',
    '}',

    '#sama-cookie-text a:hover {',
    '  opacity: 0.85;',
    '}',

    '#sama-cookie-actions {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 10px;',
    '  flex-wrap: wrap;',
    '  flex-shrink: 0;',
    '}',

    '.sama-cookie-btn {',
    '  cursor: pointer;',
    '  border: 1.5px solid #ffffff;',
    '  border-radius: 0px;',
    '  padding: 8px 20px;',
    '  font-family: inherit;',
    '  font-size: 13px;',
    '  font-weight: 500;',
    '  letter-spacing: -0.01em;',
    '  line-height: 1;',
    '  transition: background 0.2s, color 0.2s, opacity 0.2s;',
    '  white-space: nowrap;',
    '}',

    '#sama-cookie-accept {',
    '  background: #ffffff;',
    '  color: #528790;',
    '}',

    '#sama-cookie-accept:hover {',
    '  background: #f0f8f9;',
    '}',

    '#sama-cookie-decline {',
    '  background: transparent;',
    '  color: #ffffff;',
    '}',

    '#sama-cookie-decline:hover {',
    '  background: rgba(255,255,255,0.12);',
    '}',

    '/* Mobile */ @media (max-width: 600px) {',
    '  #sama-cookie-banner {',
    '    flex-direction: column;',
    '    align-items: flex-start;',
    '    padding: 16px 20px;',
    '  }',
    '  #sama-cookie-actions {',
    '    width: 100%;',
    '  }',
    '  .sama-cookie-btn {',
    '    flex: 1 1 auto;',
    '    text-align: center;',
    '  }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  /* ---------- HTML ---------- */
  var banner = document.createElement('div');
  banner.id = 'sama-cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Consentement aux cookies');
  banner.innerHTML =
    '<div id="sama-cookie-text">' +
    '<strong> Ce site utilise des cookies</strong>' +
    'En naviguant sur ce site, vous acceptez l\'utilisation de cookies nécessaires à son bon fonctionnement. ' +
    'Pour en savoir plus, consultez notre <a href="politique-confidentialite.html">Politique de confidentialité</a>.' +
    '</div>' +
    '<div id="sama-cookie-actions">' +
    '<button class="sama-cookie-btn" id="sama-cookie-decline">Refuser</button>' +
    '<button class="sama-cookie-btn" id="sama-cookie-accept">Accepter</button>' +
    '</div>';

  /* ---------- Logic ---------- */
  function dismiss(choice) {
    localStorage.setItem(STORAGE_KEY, choice);
    banner.classList.add('sama-hiding');
    banner.addEventListener('animationend', function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, { once: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(banner);

    document.getElementById('sama-cookie-accept').addEventListener('click', function () {
      dismiss('accepted');
    });
    document.getElementById('sama-cookie-decline').addEventListener('click', function () {
      dismiss('declined');
    });
  });

})();
