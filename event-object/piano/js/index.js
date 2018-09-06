'use strict';

const piano = document.getElementsByTagName('ul')[0],
  keys = piano.getElementsByTagName('li'),
  players = document.getElementsByTagName('audio');

const sounds = {
  middle: ['./sounds/middle/first.mp3', './sounds/middle/second.mp3', './sounds/middle/third.mp3', './sounds/middle/fourth.mp3', './sounds/middle/fifth.mp3'],
  lower: ['./sounds/lower/first.mp3', './sounds/lower/second.mp3', './sounds/lower/third.mp3', './sounds/lower/fourth.mp3', './sounds/lower/fifth.mp3'],
  higher: ['./sounds/higher/first.mp3', './sounds/higher/second.mp3', './sounds/higher/third.mp3', './sounds/higher/fourth.mp3', './sounds/higher/fifth.mp3']
};

var sources = sounds.middle;

function playSound() {
  const sound = this.getElementsByTagName('audio')[0];
  sources.forEach(function (el, i) {
    players[i].src = el;
  })
  sound.play();
}

function addClass(event) {
  if (event.repeat) {
    return;
  }

  switch (event.code) {
    case 'ShiftLeft':
      piano.classList.remove('middle');
      piano.classList.toggle('lower');
      sources = sounds.lower;
      break;

    case 'ShiftRight':
      piano.classList.remove('middle');
      piano.classList.toggle('lower');
      sources = sounds.lower;
      break;

    case 'AltLeft':
      piano.classList.remove('middle');
      piano.classList.toggle('higher');
      sources = sounds.higher;
      break;

    case 'AltRight':
      piano.classList.remove('middle');
      piano.classList.toggle('higher');
      sources = sounds.higher;
      break;
  }
}

function removeClass() {
  piano.classList.add('middle');
  piano.classList.remove('lower');
  piano.classList.remove('higher');
  sources = sounds.middle;
}

document.addEventListener('keydown', addClass);
document.addEventListener('keyup', removeClass);

for (let key of keys) {
  key.addEventListener('click', playSound);
}