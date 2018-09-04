'use strict';

const player = document.getElementsByTagName('audio')[0];
const play = document.getElementsByClassName('playstate')[0];
const mediaPlayer = document.getElementsByClassName('mediaplayer')[0];
const songs = ['LA Chill Tour', 'This is it band', 'LA fusion jam'];
const addresses = ['mp3/LA Chill Tour.mp3', 'mp3/This is it band.mp3', 'mp3/LA Fusion Jam.mp3'];
player.src = addresses[0];
play.onclick = () => { 
  mediaPlayer.classList.toggle('play');
  if (mediaPlayer.classList.contains('play')) {
    player.play();
  } else {
    player.pause();
  }  
}

const stop = document.getElementsByClassName('stop')[0];
stop.onclick = () => {
  mediaPlayer.classList.remove('play');
  player.pause();
  player.currentTime = 0;
}

const len = songs.length;
const next = document.getElementsByClassName('next')[0];
let i = 0;

const process = () => {
  if (i >= len) i = 0;
  else if (i < 0) i = len - 1;
  const nameOfNextSong = document.getElementsByClassName('title')[0];
  player.src = addresses[i];
  nameOfNextSong.title = songs[i];
  if (mediaPlayer.classList.contains('play')) {
    player.play();
  }
}

next.onclick = () => {
  ++i;
  process();
}
const back = document.getElementsByClassName('back')[0];
back.onclick = () => {
  --i;
  process();
}
