'use strict'

const imgArr = ['i/airmax-jump.png', 'i/airmax-on-foot.png', 'i/airmax-playground.png', 'i/airmax-top-view.png', 'i/airmax.png']
const slider = document.getElementById('slider');
const len = imgArr.length;
let i = 0;
const onInterval = function () {
  slider.src = imgArr[i++];
  if (i >= len) i = 0;
};
onInterval();
setInterval(onInterval, 5000);