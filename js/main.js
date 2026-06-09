/**
 * Varun Chobari — Cinematic Portfolio
 * Premium interactions & scroll storytelling
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Navigation --- */
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link, .nav__link');

  function handleScroll() {
    if (window.scrollY > 50) {
      nav?.classList.add('is-scrolled');
    } else {
      nav?.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  function toggleMenu() {
    const isOpen = mobileMenu?.classList.toggle('is-open');
    navToggle?.classList.toggle('is-active');
    document.body.classList.toggle('menu-open', isOpen);
    navToggle?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  navToggle?.addEventListener('click', toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu?.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  /* --- Intersection Observer: Reveals --- */
  if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll('.reveal, .line-reveal');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal, .line-reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  /* --- Hero video fallback --- */
  const heroVideo = document.querySelector('.hero__video');
  const heroVisual = document.querySelector('.hero__visual');

  if (heroVideo) {
    const enableFallback = () => heroVisual?.classList.add('no-video');

    heroVideo.addEventListener('error', enableFallback);

    heroVideo.play().catch(enableFallback);
  }

  /* --- Hero parallax --- */
  const heroMedia = document.querySelector('.hero__video') || document.querySelector('.hero__image');
  if (heroMedia && !prefersReducedMotion) {
    window.addEventListener(
      'scroll',
      () => {
        const scrolled = window.scrollY;
        if (heroVisual && scrolled < window.innerHeight) {
          heroMedia.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
        }
      },
      { passive: true }
    );
  }

  /* --- Magnetic buttons --- */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const magneticButtons = document.querySelectorAll('.btn--magnetic');

    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* --- Cursor glow --- */
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && !prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.classList.add('is-active');
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('is-active');
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  /* --- Smooth anchor scroll with offset --- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* --- Active nav link on scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[data-section]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('is-active', link.dataset.section === id);
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* --- Portrait image fallback --- */
  const portraitImages = document.querySelectorAll('[data-portrait]');
  portraitImages.forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.fallback) {
        img.src = img.dataset.fallback;
      }
    });
  });
})();
