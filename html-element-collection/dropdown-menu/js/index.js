'use strict';

const btn = document.getElementsByClassName("wrapper-dropdown")[0];
btn.onclick = () => {
  btn.classList.toggle("active");
}