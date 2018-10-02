'use strict';
const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const colors = ['#ffe9c4', '#ffffff', '#d4fbff'];
const random = (min, max) => (Math.random() * (max - min)) + min;

const getStars = () => {
  const x = Math.floor(random(0, ctx.canvas.offsetWidth));
  const y = Math.floor(random(0, ctx.canvas.offsetHeight));
  const r = random(0, 1.2);
  ctx.beginPath();
  ctx.globalAlpha = random(0.8, 1);
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = colors[Math.floor(random(0, 3.1))];
  ctx.fill();
  ctx.closePath();
};
const getSky = (count) => {
  let a = count - 100;
  let b = count + 100;
  let i = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  while (i < random(a, b)) {
    getStars();
    i++;
  }
};

canvas.setAttribute('width', '800');
canvas.setAttribute('height', '400');
canvas.style.backgroundColor = '#000000';
getSky(300);
canvas.addEventListener('click', () => getSky(300));