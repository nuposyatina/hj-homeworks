'use strict';

const slider = document.querySelector('.slider'),
  navButtons = slider.querySelectorAll('.slider-nav a'),
  slides = slider.querySelectorAll('.slides .slide');

slides[0].classList.add('slide-current');

let currentSlide,
  activeSlide,
  prevBtn,
  nextBtn,
  firstBtn,
  lastBtn;

Array.from(navButtons).forEach(function(button) {
  switch (button.getAttribute('data-action')) {
    case 'prev':
      prevBtn = button;
      break;

    case 'next':
      nextBtn = button;
      break;

    case 'first':
      firstBtn = button;
      break;

    case 'last':
      lastBtn = button;
      break;
  }
});

document.addEventListener('DOMContentLoaded', checkDisabled);

function checkDisabled() {
  currentSlide = slider.querySelector('.slide-current')
  if (currentSlide.nextElementSibling) {
    nextBtn.classList.remove('disabled');
    lastBtn.classList.remove('disabled');
  } else {
    nextBtn.classList.add('disabled');
    lastBtn.classList.add('disabled');
  }
  if (currentSlide.previousElementSibling) {
    prevBtn.classList.remove('disabled');
    firstBtn.classList.remove('disabled');
  } else {
    prevBtn.classList.add('disabled');
    firstBtn.classList.add('disabled');
  }
}



prevBtn.addEventListener('click', function() {
  currentSlide = slider.querySelector('.slide-current');
  activeSlide = currentSlide.previousElementSibling;
  if (!activeSlide) {
    return;
  } else {
    currentSlide.classList.remove('slide-current');
    activeSlide.classList.add('slide-current');
    checkDisabled()
  }

})

nextBtn.addEventListener('click', function() {
  currentSlide = slider.querySelector('.slide-current');
  activeSlide = currentSlide.nextElementSibling;
  if (!activeSlide) {
    return;
  } else {
    currentSlide.classList.remove('slide-current');
    activeSlide.classList.add('slide-current');
    checkDisabled()
  }
})

firstBtn.addEventListener('click', function() {
  currentSlide = slider.querySelector('.slide-current');
  activeSlide = slider.querySelector('.slides').firstElementChild;
  if (!activeSlide) {
    return;
  } else {
    currentSlide.classList.remove('slide-current');
    activeSlide.classList.add('slide-current');
    checkDisabled()
  }
})

lastBtn.addEventListener('click', function() {
  currentSlide = slider.querySelector('.slide-current');
  activeSlide = slider.querySelector('.slides').lastElementChild;
  if (!activeSlide) {
    return;
  } else {
    currentSlide.classList.remove('slide-current');
    activeSlide.classList.add('slide-current');
    checkDisabled()
  }
})