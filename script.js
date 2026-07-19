// SayHeyKey — interactivity
// Rewritten to fix two bugs from the original script:
//   1. getElementsByClassName() returns a live HTMLCollection, not a single
//      element, so calling `.style` on it directly did nothing (it threw).
//      Each service card now toggles its own panel independently.
//   2. Duplicate/overlapping onclick handlers caused the toggle to fire
//      twice per click. Everything below is wired up once, via delegation.

(function () {
  'use strict';

  /* ---------------- Mobile navigation ---------------- */
  var navToggle = document.getElementById('navToggle');
  var nav = document.querySelector('.nav');
  var navList = document.getElementById('navList');
  var backdrop = document.getElementById('navBackdrop');

  function openMenu() {
    nav.classList.add('is-open');
    backdrop.classList.add('is-visible');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function toggleMenu() {
    var isOpen = nav.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (navToggle && nav && backdrop) {
    navToggle.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', closeMenu);

    // Close the menu after tapping a link (mobile UX nicety).
    navList.addEventListener('click', function (event) {
      if (event.target.closest('.nav__link, .btn')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ---------------- Sticky header shadow ---------------- */
  var header = document.getElementById('siteHeader');

  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  if (header) {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- Service cards (accordion) ---------------- */
  var servicesGrid = document.getElementById('servicesGrid');

  if (servicesGrid) {
    servicesGrid.addEventListener('click', function (event) {
      var trigger = event.target.closest('.card__trigger');
      if (!trigger) return;

      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
    });
  }
})();
