let currentSlideIndex = 1;

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
}

function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}
