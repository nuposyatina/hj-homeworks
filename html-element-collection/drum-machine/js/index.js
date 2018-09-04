'use strict';
const drumKit = document.getElementsByClassName('drum-kit')[0],
      btns = drumKit.getElementsByTagName('li');

const play = function () {
  const sound = this.getElementsByTagName('audio')[0];
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

for (const btn of btns) {
  btn.onclick = play;
}