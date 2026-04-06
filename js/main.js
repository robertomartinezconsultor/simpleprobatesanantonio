/*  Joe's Probate Services - Main JavaScript
    Vanilla JS | No dependencies
    ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------
     1. STICKY HEADER
     ----------------------------------------------- */
  const header = document.querySelector('.header');

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /* -----------------------------------------------
     2. MOBILE NAV
     ----------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function openMobileNav() {
    hamburger && hamburger.classList.add('active');
    mobileNav && mobileNav.classList.add('active');
    mobileOverlay && mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    hamburger && hamburger.classList.remove('active');
    mobileNav && mobileNav.classList.remove('active');
    mobileOverlay && mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (hamburger.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav on link click
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  /* -----------------------------------------------
     3. FAQ ACCORDION
     ----------------------------------------------- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const parentItem = this.closest('.faq-item');
      const answer = parentItem.querySelector('.faq-answer');
      const isActive = parentItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item.active').forEach(function (item) {
        item.classList.remove('active');
        var ans = item.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = '0';
      });

      // Toggle current
      if (!isActive) {
        parentItem.classList.add('active');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* -----------------------------------------------
     4. SCROLL ANIMATIONS (IntersectionObserver)
     ----------------------------------------------- */
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if ('IntersectionObserver' in window && animatedElements.length) {
    const animObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedElements.forEach(function (el) {
      animObserver.observe(el);
    });
  }

  /* -----------------------------------------------
     5. SMOOTH SCROLL
     ----------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* -----------------------------------------------
     6. CONTACT FORM VALIDATION
     ----------------------------------------------- */
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('[name="name"]');
      var email = contactForm.querySelector('[name="email"]');
      var phone = contactForm.querySelector('[name="phone"]');
      var errors = [];

      // Clear previous errors
      contactForm.querySelectorAll('.field-error').forEach(function (el) {
        el.remove();
      });
      contactForm.querySelectorAll('.input-error').forEach(function (el) {
        el.classList.remove('input-error');
      });

      if (name && !name.value.trim()) {
        errors.push({ field: name, msg: 'Name is required.' });
      }
      if (email && !email.value.trim()) {
        errors.push({ field: email, msg: 'Email is required.' });
      } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        errors.push({ field: email, msg: 'Please enter a valid email.' });
      }
      if (phone && !phone.value.trim()) {
        errors.push({ field: phone, msg: 'Phone number is required.' });
      }

      if (errors.length > 0) {
        errors.forEach(function (err) {
          err.field.classList.add('input-error');
          var span = document.createElement('span');
          span.className = 'field-error';
          span.textContent = err.msg;
          err.field.parentNode.insertBefore(span, err.field.nextSibling);
        });
        return;
      }

      // Success — show message
      var successDiv = document.createElement('div');
      successDiv.className = 'form-success';
      successDiv.innerHTML = '<p>Thank you! Your message has been sent. We will contact you shortly.</p>';
      contactForm.reset();
      contactForm.style.display = 'none';
      contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
    });
  }

  /* -----------------------------------------------
     7. COUNTER ANIMATION
     ----------------------------------------------- */
  var counters = document.querySelectorAll('.counter');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out quad
      var eased = 1 - (1 - progress) * (1 - progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  }

  /* -----------------------------------------------
     8. BACK TO TOP BUTTON (dynamic)
     ----------------------------------------------- */
  var backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '&#8679;';
  document.body.appendChild(backToTop);

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -----------------------------------------------
     9. NAVBAR DROPDOWN (mobile toggle)
     ----------------------------------------------- */
  var dropdownParents = document.querySelectorAll('.mobile-nav .has-dropdown, .mobile-nav .dropdown-parent');

  dropdownParents.forEach(function (parent) {
    var toggle = parent.querySelector('a');
    var submenu = parent.querySelector('.dropdown, .dropdown-menu, .sub-menu');

    if (toggle && submenu) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        parent.classList.toggle('open');
        if (parent.classList.contains('open')) {
          submenu.style.maxHeight = submenu.scrollHeight + 'px';
        } else {
          submenu.style.maxHeight = '0';
        }
      });
    }
  });

  /* -----------------------------------------------
     10. PARALLAX EFFECT (hero)
     ----------------------------------------------- */
  var hero = document.querySelector('.hero');
  var ticking = false;

  function parallax() {
    if (!hero) return;
    var scrolled = window.scrollY;
    hero.style.backgroundPositionY = -(scrolled * 0.35) + 'px';
    ticking = false;
  }

  /* -----------------------------------------------
     11. TYPED TEXT EFFECT
     ----------------------------------------------- */
  var typedEl = document.querySelector('.typed-text');

  if (typedEl) {
    var phrases = ['Affordable.', 'Fast.', 'Local.', 'Bilingual.', 'Trusted.'];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 100;
    var deleteSpeed = 60;
    var pauseEnd = 1800;
    var pauseDelete = 400;

    function typeLoop() {
      var current = phrases[phraseIndex];
      if (isDeleting) {
        charIndex--;
        typedEl.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeLoop, pauseDelete);
          return;
        }
        setTimeout(typeLoop, deleteSpeed);
      } else {
        charIndex++;
        typedEl.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(typeLoop, pauseEnd);
          return;
        }
        setTimeout(typeLoop, typeSpeed);
      }
    }

    typeLoop();
  }

  /* -----------------------------------------------
     12. PRELOADER
     ----------------------------------------------- */
  var preloader = document.querySelector('.preloader');

  function hidePreloader() {
    if (!preloader) return;
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease';
    setTimeout(function () {
      preloader.style.display = 'none';
    }, 500);
  }

  /* -----------------------------------------------
     UNIFIED SCROLL HANDLER (performant)
     ----------------------------------------------- */
  function onScroll() {
    handleScroll();
    handleBackToTop();

    if (hero && !ticking) {
      ticking = true;
      requestAnimationFrame(parallax);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Run once on load
  onScroll();

  /* -----------------------------------------------
     PAGE LOAD
     ----------------------------------------------- */
  window.addEventListener('load', hidePreloader);
});
