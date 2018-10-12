'use strict';
const eye = document.getElementsByClassName('big-book__eye')[0];
const drawEye = (event) => {
  const {
    width,
    height,
    left,
    bottom
  } = eye.getBoundingClientRect();
  let coef = Math.max(
    document.documentElement.clientWidth - left + width / 2, left + width / 2,
    document.documentElement.clientHeight - bottom - height / 2, bottom - height / 2
  ) / 2;
  let size = () => 3 - Math.sqrt(Math.pow((left + width / 2) - event.x, 2) + Math.pow((bottom + height / 2) - event.y, 2)) / coef;
  let xCoef = () => document.documentElement.clientWidth / 60;
  let yCoef = () => document.documentElement.clientHeight / 60;
  let xCoord = () => ((event.x) / xCoef() - 30);
  let yCoord = () => ((event.y) / yCoef() - 30);
  document.querySelector('.big-book__pupil').style.setProperty('--pupil-size', size());
  document.querySelector('.big-book__pupil').style.setProperty('--pupil-x', `${xCoord()}px`);
  document.querySelector('.big-book__pupil').style.setProperty('--pupil-y', `${yCoord()}px`);

};
document.addEventListener('mousemove', drawEye);