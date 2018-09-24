'use strict';
const counterEl = document.getElementById('counter');

let counter = {
  'increment': () => localStorage.count++,
  'decrement': () => (localStorage.count > 0) ? localStorage.count-- : 0,
  'reset': () => localStorage.count = 0,
  'refresh': () => counterEl.innerHTML = localStorage.count
};

let init = () => {
  if (!localStorage.count) {
    localStorage.count = 0;
  }
  counter.refresh();
};

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('click', () => {
  if (event.target.parentElement.classList.contains('wrap-btns')) {
    counter[event.target.id]();
    counter.refresh();
  }
});