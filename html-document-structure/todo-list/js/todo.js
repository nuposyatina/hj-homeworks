const todoList = document.querySelector('.todo-list');
const done = document.querySelector('.done');
const undone = document.querySelector('.undone');
const checkBoxes = document.querySelectorAll('input');
document.addEventListener('DOMContentLoaded', start);

function start () {
  for (checBox of checkBoxes) {
    checBox.addEventListener('input', check);
  }
}

function check () {
  if (event.target.checked) {
    done.appendChild(event.target.parentElement);
  } else {
    undone.appendChild(event.target.parentElement);
  }
}