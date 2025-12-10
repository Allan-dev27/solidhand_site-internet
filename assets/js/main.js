/**
* Template Name: Logis
* Template URL: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();


/**
 * Initialisation du carrousel Hero
 */
(function() {
  "use strict";

  /**
   * Initialisation du carrousel avec Bootstrap
   */
  const initHeroCarousel = () => {
    const heroCarousel = document.querySelector('#hero-carousel');
    
    if (heroCarousel) {
      // Créer les indicateurs dynamiquement
      const carouselItems = heroCarousel.querySelectorAll('.carousel-item');
      const indicators = heroCarousel.querySelector('.carousel-indicators');
      
      if (indicators && carouselItems.length > 0) {
        indicators.innerHTML = '';
        carouselItems.forEach((item, index) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.setAttribute('data-bs-target', '#hero-carousel');
          button.setAttribute('data-bs-slide-to', index);
          if (index === 0) {
            button.classList.add('active');
            button.setAttribute('aria-current', 'true');
          }
          button.setAttribute('aria-label', `Slide ${index + 1}`);
          indicators.appendChild(button);
        });
      }

      // Initialiser le carrousel Bootstrap
      const carousel = new bootstrap.Carousel(heroCarousel, {
        interval: 5000,
        ride: 'carousel',
        pause: 'hover',
        wrap: true
      });
    }
  };

  /**
   * Mobile nav toggle
   */
  const mobileNavToggle = () => {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', function(e) {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    }
  };

  /**
   * Scroll top button
   */
  const scrollTop = () => {
    let scrollTop = document.querySelector('.scroll-top');

    if (scrollTop) {
      function toggleScrollTop() {
        if (window.scrollY > 100) {
          scrollTop.classList.add('active');
        } else {
          scrollTop.classList.remove('active');
        }
      }
      
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      window.addEventListener('load', toggleScrollTop);
      document.addEventListener('scroll', toggleScrollTop);
    }
  };

  /**
   * Preloader
   */
  const preloader = () => {
    const preloaderEl = document.querySelector('#preloader');
    if (preloaderEl) {
      window.addEventListener('load', () => {
        preloaderEl.remove();
      });
    }
  };

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  const toggleScrolled = () => {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    
    if (!selectHeader.classList.contains('scroll-up-sticky') && 
        !selectHeader.classList.contains('sticky-top') && 
        !selectHeader.classList.contains('fixed-top')) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        selectBody.classList.add('scrolled');
      } else {
        selectBody.classList.remove('scrolled');
      }
    });
  };

  /**
   * Initiate glightbox
   */
  const initGLightbox = () => {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  };

  /**
   * Init swiper sliders
   */
  const initSwiper = () => {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  };

  /**
   * Animation on scroll function and init
   */
  const aosInit = () => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  };

  /**
   * Initiate Pure Counter
   */
  const initPureCounter = () => {
    new PureCounter();
  };

  /**
   * Frequently Asked Questions Toggle
   */
  const initFaqToggle = () => {
    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        faqItem.parentNode.classList.toggle('faq-active');
      });
    });
  };

  /**
   * Init all functions on DOM loaded
   */
  document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    mobileNavToggle();
    scrollTop();
    preloader();
    toggleScrolled();
    aosInit();
    initFaqToggle();
    
    // Init GLightbox si disponible
    if (typeof GLightbox !== 'undefined') {
      initGLightbox();
    }
    
    // Init Swiper si disponible
    if (typeof Swiper !== 'undefined') {
      initSwiper();
    }
    
    // Init PureCounter si disponible
    if (typeof PureCounter !== 'undefined') {
      initPureCounter();
    }
  });

})();

/**
 * Initialisation du carrousel de partenaires
 */
(function() {
  "use strict";

  /**
   * Init swiper sliders - version améliorée
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      // Récupérer la configuration JSON
      let configElement = swiperElement.querySelector(".swiper-config");
      
      if (!configElement) {
        console.warn("Configuration Swiper manquante");
        return;
      }

      let config = JSON.parse(configElement.innerHTML.trim());

      // Créer l'instance Swiper
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  /**
   * Fonction d'initialisation spéciale pour les onglets
   */
  function initSwiperWithCustomPagination(swiperElement, config) {
    let uniqueID = Math.random().toString(36).substring(2, 11);
    swiperElement.classList.add(uniqueID);
    swiperElement.nextElementSibling.classList.add(uniqueID + '-pagi');
    
    let swiper = new Swiper('.' + uniqueID, config);
    
    let paginationDiv = document.querySelector('.' + uniqueID + '-pagi');
    if (paginationDiv) {
      let paginationElements = paginationDiv.querySelectorAll('span');
      
      paginationElements.forEach((el, index) => {
        el.addEventListener('click', function() {
          swiper.slideTo(index);
        });
      });
      
      swiper.on('slideChange', function() {
        let activeIndex = swiper.realIndex;
        paginationElements.forEach((el, index) => {
          if (index === activeIndex) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });
      });
    }
  }

  /**
   * Initialiser au chargement du DOM
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les carrousels Swiper
    if (typeof Swiper !== 'undefined') {
      initSwiper();
    } else {
      console.error("Swiper n'est pas chargé");
    }
  });

  /**
   * Réinitialiser après les animations AOS
   */
  if (typeof AOS !== 'undefined') {
    window.addEventListener('load', function() {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    });
  }

})();
