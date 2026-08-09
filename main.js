(function () {
  'use strict';

  var root = document.documentElement;
  var LOGO = { dark: 'assets/logo-white.png', light: 'assets/logo-black.png' };
  var TITLES = {
    ar: 'ABDERRAHMANE GSR | علامة كاليستنيكس جزائرية — استشارة، تدريب، ملابس ومستلزمات رياضية',
    en: 'ABDERRAHMANE GSR | Algerian Calisthenics Brand — Coaching, Training Plans & Sports Gear'
  };
  var DESCRIPTIONS = {
    ar: 'ABDERRAHMANE GSR علامة جزائرية متخصصة في رياضة الكاليستنيكس، تجمع بين الاستشارة والتدريب من جهة، والملابس والمستلزمات الرياضية من جهة أخرى. الانضباط والقوة.',
    en: 'ABDERRAHMANE GSR is an Algerian calisthenics brand bringing together coaching and consultation on one side, and sports apparel and gear on the other. Discipline and power.'
  };

  /* ---------------- Theme ---------------- */
  function applyThemeIcon(theme) {
    var icon = document.getElementById('themeIcon');
    if (!icon) return;
    icon.innerHTML = theme === 'dark'
      ? '<circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line>'
      : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  }

  function applyLogos(theme) {
    var src = theme === 'dark' ? LOGO.dark : LOGO.light;
    ['navLogo', 'heroLogo', 'footerLogo'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.src = src;
    });
  }

  function setTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    applyLogos(theme);
    applyThemeIcon(theme);
    if (persist) {
      try { localStorage.setItem('gsr-theme', theme); } catch (e) {}
    }
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('gsr-theme'); } catch (e) {}
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved, false);
    } else {
      var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      setTheme(prefersLight ? 'light' : 'dark', false);
    }
  }

  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next, true);
    });
  }
  initTheme();

  /* ---------------- Language ---------------- */
  var langBtn = document.getElementById('langToggle');

  function setLang(lang, persist) {
    document.querySelectorAll('[data-ar]').forEach(function (el) {
      var val = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (val !== null) el.innerHTML = val;
    });
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    if (langBtn) langBtn.textContent = lang === 'ar' ? 'EN' : 'AR';
    document.title = TITLES[lang];
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', DESCRIPTIONS[lang]);
    if (persist) {
      try { localStorage.setItem('gsr-lang', lang); } catch (e) {}
    }
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem('gsr-lang'); } catch (e) {}
    setLang(saved === 'en' ? 'en' : 'ar', false);
  }

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = root.getAttribute('lang') === 'ar' ? 'en' : 'ar';
      setLang(next, true);
    });
  }
  initLang();

  /* ---------------- Mobile menu ---------------- */
  var menuBtn = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('show'); });
  }
})();
