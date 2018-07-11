'use strict';

const btns = document.querySelectorAll('.tabs nav a');
const content = document.getElementById('content');

for (let btn of btns) {
  btn.addEventListener('click', contentUpdate);
}

function contentUpdate(event) {
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active')
    this.classList.add('active');
  }
  event.preventDefault();
  xhr.open('GET', document.querySelector('.active').href, true);
  xhr.send();
}

var xhr = new XMLHttpRequest();
xhr.addEventListener("loadstart", onLoadStart);
xhr.addEventListener("load", onLoad);
xhr.addEventListener("loadend", onLoadEnd);
xhr.open('GET', document.querySelector('.active').href, true);
xhr.send();

function onLoadStart() {
  document.getElementById('preloader').classList.remove('hidden')
}

function onLoadEnd() {
  document.getElementById('preloader').classList.add('hidden')
}

function onLoad() {
  content.innerHTML = xhr.responseText;
}