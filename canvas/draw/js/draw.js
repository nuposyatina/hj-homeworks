'use strict';
let canvas = document.querySelector('#draw');
let ctx = canvas.getContext('2d');
let curves = [];
let brushWidht = 100;
let drawing = false;
let needsRepaint = false;
let color = 0;
let brushCount;
let shift;

document.addEventListener('DOMContentLoaded', canvasSize);
document.addEventListener('dblclick', clear)

function clear() {
  curves = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  needsRepaint = true;
}

window.addEventListener('resize', () => {
  canvasSize()
  clear();
});

function canvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

function getBrushSize() {
  switch (brushWidht) {
    case 100:
      brushCount = true;
      break;
    case 5:
      brushCount = false;
      break;
  }

  return brushCount ? brushWidht-- : brushWidht++;
}

function getColor() {
  if (shift) {
    return (color > 0 && color <= 359) ? color-- : color = 359;
  } else {
    return (color <= 359) ? color++ : color = 0;
  }
}

function smoothCurveBetween(p1, p2) {
  const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
  ctx.lineWidth = getBrushSize();
  ctx.strokeStyle = `hsl(${getColor()}, 100%, 50%)`;
  console.log('​smoothCurveBetween -> getColor()', getColor());
  ctx.quadraticCurveTo(...p1, ...cp);
}

function smoothCurve(points) {
  ctx.beginPath();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  if (points.length > 2) {
    for (let i = points.length - 2; i < points.length - 1; i++) {
      ctx.moveTo(...points[i]);
      smoothCurveBetween(points[i], points[i + 1]);
    }
    ctx.stroke();
  }
}

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  const curve = [];
  curve.push([e.offsetX, e.offsetY]);
  curves.push(curve);
  needsRepaint = true;
  if (e.shiftKey) {
    shift = true;
  }
});

canvas.addEventListener("mouseup", (e) => {
  curves = [];
  drawing = false;
});

canvas.addEventListener("mouseleave", () => {
  curves = [];
  drawing = false;
});

canvas.addEventListener("mousemove", (e) => {

  if (drawing) {
    if (e.shiftKey) {
      shift = true;
    } else {
      shift = false;
    }
    const point = [e.offsetX, e.offsetY]
    curves[curves.length - 1].push(point);
    needsRepaint = true;

  }
});


function repaint() {
  curves.forEach((curve) => smoothCurve(curve));
}

function tick() {
  if (needsRepaint) {
    repaint();
    needsRepaint = false;
  }

  window.requestAnimationFrame(tick);
}

tick();