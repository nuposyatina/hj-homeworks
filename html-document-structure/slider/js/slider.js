'use strict';

const slider = document.querySelector('.slider'),
  nav = slider.querySelector('.slider-nav'),
  slides = slider.querySelectorAll('.slides .slide');
const prevBtn = document.querySelector('[data-action="prev"]');
const nextBtn = document.querySelector('[data-action="next"]');
const firstBtn = document.querySelector('[data-action="first"]');
const lastBtn = document.querySelector('[data-action="last"]');
let currentSlide,
  activeSlide;

document.addEventListener('DOMContentLoaded', start);

function start() {
  slides[0].classList.add('slide-current');
  checkDisabled();
  nav.addEventListener('click', getNewSlide);
};

function checkDisabled() {
  const currentSlide = slider.querySelector('.slide-current')
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
};

function getNewSlide() {
  toggleSlide(event.target);
  checkDisabled();
};

function toggleSlide(button) {
  currentSlide = slider.querySelector('.slide-current');
  switch (button.dataset.action) {
    case 'next':
      activeSlide = currentSlide.nextElementSibling;
      break;
    case 'prev':
      activeSlide = currentSlide.previousElementSibling;
      break;
    case 'first':
      activeSlide = slider.querySelector('.slides').firstElementChild;
      break;
    case 'last':
      activeSlide = slider.querySelector('.slides').lastElementChild;
      break;
  }
  if (!activeSlide) {
    return true;
  } else {
    currentSlide.classList.remove('slide-current');
    activeSlide.classList.add('slide-current');
    checkDisabled()
  }
};