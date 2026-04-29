let currentSlideIndex = 1;
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    changeSlide(1);
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function changeSlide(direction) {
  const slides = document.querySelectorAll('.instructor-slide');
  const dots = document.querySelectorAll('.dot');
  
  if (slides.length === 0) return;

  slides[currentSlideIndex - 1].classList.remove('active');
  dots[currentSlideIndex - 1].classList.remove('active');
  
  currentSlideIndex += direction;
  
  if (currentSlideIndex > slides.length) {
    currentSlideIndex = 1;
  } else if (currentSlideIndex < 1) {
    currentSlideIndex = slides.length;
  }
  
  slides[currentSlideIndex - 1].classList.add('active');
  dots[currentSlideIndex - 1].classList.add('active');
}

function currentSlide(index) {
  const slides = document.querySelectorAll('.instructor-slide');
  const dots = document.querySelectorAll('.dot');
  
  slides[currentSlideIndex - 1].classList.remove('active');
  dots[currentSlideIndex - 1].classList.remove('active');
  
  currentSlideIndex = index;
  
  slides[currentSlideIndex - 1].classList.add('active');
  dots[currentSlideIndex - 1].classList.add('active');
  
  stopAutoSlide();
  startAutoSlide();
}

function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
  document.getElementById('menuToggle').classList.toggle('active');
}

// MODERNIZATION SCRIPTS
document.addEventListener('DOMContentLoaded', () => {
  startAutoSlide();
  
  const slider = document.querySelector('.instructor-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, {passive: true});

    slider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoSlide();
    }, {passive: true});

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        changeSlide(1); // Swipe left -> next slide
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        changeSlide(-1); // Swipe right -> prev slide
      }
    }
  }

  // 1. Scroll Progress Bar & Header Shrink & Back to Top
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    // Header Shrink
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }

    // Back to top button
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
  });

  if (backToTop) {
      backToTop.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  // 2. Intersection Observer for Scroll Animations (Reveal)
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // 3. Animated Counters
  const counterElements = document.querySelectorAll('[data-count]');
  const counterOptions = {
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const target = entry.target;
      const targetCount = parseFloat(target.getAttribute('data-count'));
      const isFloat = targetCount % 1 !== 0;
      const duration = 2000; 
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = (targetCount * progress);

        if (isFloat) {
            target.innerText = currentCount.toFixed(1);
        } else {
            target.innerText = Math.round(currentCount);
        }

        if (frame >= totalFrames) {
          target.innerText = targetCount;
          clearInterval(counter);
        }
      }, frameDuration);

      observer.unobserve(target);
    });
  }, counterOptions);

  counterElements.forEach(el => {
    counterObserver.observe(el);
  });

  // 4. Active Nav Link Tracking
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

});
