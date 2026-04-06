/*  Joe's Probate Services - Main JavaScript
    Vanilla JS | No dependencies | Full Interactivity
    ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  // Signal that JS is working — enables CSS animations
  document.documentElement.classList.add('js-ready');

  /* -----------------------------------------------
     1. PRELOADER
     ----------------------------------------------- */
  var preloader = document.getElementById('preloader');

  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add('hidden');
    setTimeout(function () {
      preloader.style.display = 'none';
    }, 700);
  }

  window.addEventListener('load', function () {
    setTimeout(hidePreloader, 600);
  });

  // Safety fallback — hide preloader after 4 seconds no matter what
  setTimeout(hidePreloader, 4000);

  /* -----------------------------------------------
     2. VIDEO FALLBACK — GRADIENT IF VIDEO FAILS
     ----------------------------------------------- */
  var heroVideo = document.getElementById('heroVideo');
  var gradientFallback = document.getElementById('heroGradientFallback');

  if (heroVideo && gradientFallback) {
    heroVideo.addEventListener('error', function () {
      gradientFallback.classList.add('active');
      heroVideo.style.display = 'none';
    });

    // Also check sources
    var sources = heroVideo.querySelectorAll('source');
    var sourceErrors = 0;
    sources.forEach(function (src) {
      src.addEventListener('error', function () {
        sourceErrors++;
        if (sourceErrors >= sources.length) {
          gradientFallback.classList.add('active');
          heroVideo.style.display = 'none';
        }
      });
    });

    // Fallback timeout: if video hasn't started playing in 5s, show gradient
    setTimeout(function () {
      if (heroVideo.readyState < 2 && heroVideo.paused) {
        gradientFallback.classList.add('active');
      }
    }, 5000);
  }

  /* -----------------------------------------------
     3. SCROLL PROGRESS BAR
     ----------------------------------------------- */
  var scrollProgressBar = document.getElementById('scrollProgressBar');

  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = scrollPercent + '%';
  }

  /* -----------------------------------------------
     4. STICKY HEADER — TRANSPARENT TO SOLID
     ----------------------------------------------- */
  var header = document.querySelector('.site-header') || document.querySelector('.header');

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /* -----------------------------------------------
     5. MOBILE NAV
     ----------------------------------------------- */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileOverlay = document.querySelector('.mobile-overlay');

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

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  /* -----------------------------------------------
     6. FAQ ACCORDION
     ----------------------------------------------- */
  var faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      var parentItem = this.closest('.faq-item');
      var answer = parentItem.querySelector('.faq-answer');
      var isActive = parentItem.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach(function (item) {
        item.classList.remove('active');
        var ans = item.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = '0';
      });

      if (!isActive) {
        parentItem.classList.add('active');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* -----------------------------------------------
     7. ENHANCED SCROLL ANIMATIONS — STAGGERED REVEALS
     ----------------------------------------------- */
  // Add stagger classes to grouped elements
  function addStaggerClasses() {
    var groups = [
      '.value-grid .value-card',
      '.services-grid .service-card',
      '.reviews-grid .review-card',
      '.steps-grid .step-card',
      '.stats-grid .stat-item'
    ];

    groups.forEach(function (selector) {
      var items = document.querySelectorAll(selector);
      items.forEach(function (item, index) {
        item.classList.add('fade-in');
        item.classList.add('stagger-' + Math.min(index + 1, 6));
      });
    });

    // Add fade-in to section headers
    document.querySelectorAll('.section-header').forEach(function (el) {
      el.classList.add('fade-in');
    });
  }

  addStaggerClasses();

  // Intersection Observer for all animated elements
  var animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .text-reveal');

  if ('IntersectionObserver' in window && animatedElements.length) {
    var animObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(function (el) {
      animObserver.observe(el);
    });
  }

  /* -----------------------------------------------
     8. TEXT REVEAL — HEADLINES CLIP ANIMATION
     ----------------------------------------------- */
  var headlines = document.querySelectorAll('.section-header h2, .hero-title');
  headlines.forEach(function (h) {
    if (!h.classList.contains('text-reveal')) {
      h.classList.add('text-reveal');
    }
  });

  // Re-observe text-reveal elements
  if ('IntersectionObserver' in window) {
    var textRevealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          textRevealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.text-reveal').forEach(function (el) {
      textRevealObserver.observe(el);
    });
  }

  /* -----------------------------------------------
     9. SMOOTH SCROLL
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
     10. CONTACT FORM VALIDATION
     ----------------------------------------------- */
  var contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('[name="name"]');
      var email = contactForm.querySelector('[name="email"]');
      var phone = contactForm.querySelector('[name="phone"]');
      var errors = [];

      contactForm.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
      contactForm.querySelectorAll('.input-error').forEach(function (el) { el.classList.remove('input-error'); });

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

      var successDiv = document.createElement('div');
      successDiv.className = 'form-success';
      successDiv.innerHTML = '<p>Thank you! Your message has been sent. We will contact you shortly.</p>';
      contactForm.reset();
      contactForm.style.display = 'none';
      contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
    });
  }

  /* -----------------------------------------------
     11. COUNTER ANIMATION — COUNT UP ON SCROLL
     ----------------------------------------------- */
  var statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    var text = el.textContent.trim();
    // Extract number, prefix, suffix (e.g., "500+", "4.9", "98%", "15+")
    var match = text.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
    if (!match) return;

    var prefix = match[1];
    var target = parseFloat(match[2]);
    var suffix = match[3];
    var isFloat = text.indexOf('.') !== -1;
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;

      if (isFloat) {
        el.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + (isFloat ? target.toFixed(1) : target) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && statNumbers.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  /* -----------------------------------------------
     12. BACK TO TOP BUTTON
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
     13. FLOATING CTA — APPEARS AFTER HERO
     ----------------------------------------------- */
  var floatingCta = document.getElementById('floatingCta');
  var hero = document.querySelector('.hero');

  function handleFloatingCta() {
    if (!floatingCta || !hero) return;
    var heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom - 200) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }

  /* -----------------------------------------------
     14. NAVBAR DROPDOWN (mobile toggle)
     ----------------------------------------------- */
  var dropdownParents = document.querySelectorAll('.mobile-nav .has-dropdown, .mobile-nav .dropdown-parent');

  dropdownParents.forEach(function (parent) {
    var toggle = parent.querySelector('a');
    var submenu = parent.querySelector('.dropdown, .dropdown-menu, .sub-menu, .mega-dropdown');

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
     15. PARALLAX EFFECTS — HERO + SECTIONS
     ----------------------------------------------- */
  var parallaxSections = [];
  var ticking = false;

  // Hero parallax
  if (hero) {
    parallaxSections.push({
      el: hero,
      speed: 0.35,
      type: 'background'
    });
  }

  // Section parallax — sections with dark backgrounds
  document.querySelectorAll('.section-dark, .cta-banner, .stats-bar').forEach(function (sec) {
    parallaxSections.push({
      el: sec,
      speed: 0.15,
      type: 'transform'
    });
  });

  function updateParallax() {
    var scrolled = window.scrollY;
    var windowHeight = window.innerHeight;

    parallaxSections.forEach(function (item) {
      var rect = item.el.getBoundingClientRect();
      // Only parallax if section is visible
      if (rect.bottom < -100 || rect.top > windowHeight + 100) return;

      var offset = scrolled - item.el.offsetTop;

      if (item.type === 'background') {
        item.el.style.backgroundPositionY = -(offset * item.speed) + 'px';
      } else {
        var children = item.el.querySelectorAll('.container');
        children.forEach(function (child) {
          child.style.transform = 'translateY(' + (offset * item.speed * 0.3) + 'px)';
        });
      }
    });

    ticking = false;
  }

  /* -----------------------------------------------
     16. TYPED TEXT EFFECT
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
     17. BUTTON MICRO-INTERACTIONS — RIPPLE EFFECT
     ----------------------------------------------- */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
    btn.addEventListener('click', function (e) {
      // Create ripple
      var ripple = document.createElement('span');
      ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.4);transform:scale(0);animation:rippleAnim 0.6s ease-out;pointer-events:none;';
      var rect = this.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });

  // Inject ripple keyframe if not exists
  if (!document.getElementById('rippleStyle')) {
    var style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = '@keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }';
    document.head.appendChild(style);
  }

  /* -----------------------------------------------
     18. HOVER EFFECTS ON ALL CARDS
     ----------------------------------------------- */
  var allCards = document.querySelectorAll('.value-card, .service-card, .review-card, .step-card, .faq-item, .contact-info-card');

  allCards.forEach(function (card) {
    card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-6px) scale(1.03)';
      this.style.boxShadow = '0 16px 40px rgba(0,0,0,0.15)';
      this.style.borderColor = '#8c8c8c';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
      this.style.boxShadow = '';
      this.style.borderColor = '';
    });
  });

  /* -----------------------------------------------
     19. TESTIMONIAL CAROUSEL
     ----------------------------------------------- */
  var reviewsGrid = document.querySelector('.reviews-grid');
  var reviewCards = reviewsGrid ? reviewsGrid.querySelectorAll('.review-card') : [];

  if (reviewCards.length > 1 && reviewsGrid) {
    // Create carousel navigation
    var carouselNav = document.createElement('div');
    carouselNav.className = 'carousel-nav';

    var prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn carousel-prev';
    prevBtn.innerHTML = '&#8592;';
    prevBtn.setAttribute('aria-label', 'Previous review');

    var nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn carousel-next';
    nextBtn.innerHTML = '&#8594;';
    nextBtn.setAttribute('aria-label', 'Next review');

    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'carousel-dots';

    reviewCards.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
      dot.dataset.index = i;
      dotsWrap.appendChild(dot);
    });

    carouselNav.appendChild(prevBtn);
    carouselNav.appendChild(dotsWrap);
    carouselNav.appendChild(nextBtn);
    reviewsGrid.parentNode.insertBefore(carouselNav, reviewsGrid.nextSibling);

    var currentSlide = 0;
    var autoSlideInterval;

    function getVisibleCount() {
      if (window.innerWidth > 900) return 3;
      if (window.innerWidth > 600) return 2;
      return 1;
    }

    function updateCarousel(index) {
      var visibleCount = getVisibleCount();
      var maxIndex = Math.max(0, reviewCards.length - visibleCount);
      currentSlide = Math.min(Math.max(index, 0), maxIndex);

      reviewCards.forEach(function (card, i) {
        if (i >= currentSlide && i < currentSlide + visibleCount) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });

      dotsWrap.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    prevBtn.addEventListener('click', function () {
      updateCarousel(currentSlide - 1);
      resetAutoSlide();
    });

    nextBtn.addEventListener('click', function () {
      var visibleCount = getVisibleCount();
      var maxIndex = Math.max(0, reviewCards.length - visibleCount);
      updateCarousel(currentSlide >= maxIndex ? 0 : currentSlide + 1);
      resetAutoSlide();
    });

    dotsWrap.addEventListener('click', function (e) {
      if (e.target.classList.contains('carousel-dot')) {
        updateCarousel(parseInt(e.target.dataset.index));
        resetAutoSlide();
      }
    });

    function startAutoSlide() {
      autoSlideInterval = setInterval(function () {
        var visibleCount = getVisibleCount();
        var maxIndex = Math.max(0, reviewCards.length - visibleCount);
        updateCarousel(currentSlide >= maxIndex ? 0 : currentSlide + 1);
      }, 5000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    updateCarousel(0);
    startAutoSlide();

    // Update on resize
    window.addEventListener('resize', function () {
      updateCarousel(currentSlide);
    });
  }

  /* -----------------------------------------------
     20. CURSOR GLOW EFFECT
     ----------------------------------------------- */
  var cursorGlow = document.getElementById('cursorGlow');

  if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
    var interactiveElements = 'a, button, .btn, .service-card, .value-card, .review-card, .faq-question, input, select, textarea';

    document.addEventListener('mousemove', function (e) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactiveElements)) {
        cursorGlow.classList.add('active');
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactiveElements)) {
        cursorGlow.classList.remove('active');
      }
    });
  }

  /* -----------------------------------------------
     21. SMOOTH PAGE TRANSITIONS
     ----------------------------------------------- */
  var pageTransitionOverlay = document.getElementById('pageTransitionOverlay');

  if (pageTransitionOverlay) {
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      // Only internal links, not anchors, not tel/mailto, not external, not blank target
      if (!href) return;
      if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
      if (href.startsWith('http') && !href.includes(window.location.hostname)) return;
      if (link.getAttribute('target') === '_blank') return;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        var destination = this.href;
        pageTransitionOverlay.classList.add('active');
        setTimeout(function () {
          window.location.href = destination;
        }, 350);
      });
    });

    // Fade in on page arrival
    pageTransitionOverlay.classList.add('active');
    window.addEventListener('load', function () {
      setTimeout(function () {
        pageTransitionOverlay.classList.remove('active');
      }, 100);
    });
  }

  /* -----------------------------------------------
     22. MEGA DROPDOWN — DESKTOP DELAY
     ----------------------------------------------- */
  var desktopDropdowns = document.querySelectorAll('.main-nav .has-dropdown');

  desktopDropdowns.forEach(function (dd) {
    var timeout;
    dd.addEventListener('mouseenter', function () {
      clearTimeout(timeout);
      // Close other dropdowns
      desktopDropdowns.forEach(function (other) {
        if (other !== dd) other.classList.remove('dropdown-open');
      });
      dd.classList.add('dropdown-open');
    });
    dd.addEventListener('mouseleave', function () {
      timeout = setTimeout(function () {
        dd.classList.remove('dropdown-open');
      }, 200);
    });
  });

  /* -----------------------------------------------
     UNIFIED SCROLL HANDLER (performant)
     ----------------------------------------------- */
  function onScroll() {
    handleScroll();
    handleBackToTop();
    handleFloatingCta();
    updateScrollProgress();

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Run once on load
  onScroll();
});
