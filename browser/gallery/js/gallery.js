'use strict';

const currentPhoto = document.getElementById('currentPhoto');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');

const imgArr = ['i/breuer-building.jpg', 'i/guggenheim-museum.jpg', 'i/headquarters.jpg', 'i/IAC.jpg', 'i/new-museum.jpg'];

const len = imgArr.length;
let i = 0;
currentPhoto.src = imgArr[i];

const getNextImg = function () {
  i++;
  if (i >= len) i = 0;
  currentPhoto.src = imgArr[i];
}

const getPrevImg = function () {
  i--;
  if (i < 0) i = len - 1;
  currentPhoto.src = imgArr[i];
}


prevPhoto.onclick = getPrevImg;
nextPhoto.onclick = getNextImg;