let currentSlideIndex = 1;
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    changeSlide(1);
  }, 2000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function changeSlide(direction) {
  const slides = document.querySelectorAll('.instructor-slide');
  const dots = document.querySelectorAll('.dot');
  
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
  
  // Reinicia o auto-slide quando usuário clica nos dots
  stopAutoSlide();
  startAutoSlide();
}

function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// Iniciar auto-slide quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  startAutoSlide();
  
  // Parar auto-slide quando mouse está sobre o slider
  const slider = document.querySelector('.instructor-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
  }
});
