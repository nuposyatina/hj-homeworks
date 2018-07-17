const todoList = document.querySelector('.todo-list');
const done = document.querySelector('.done');
const undone = document.querySelector('.undone');
const checkBoxes = document.querySelectorAll('input');

for (let checkBox of checkBoxes) {
  checkBox.addEventListener('change', function () {
    if (this.parentElement.parentElement.classList.contains('done')) {
      if (!this.checked) {
        let label = this.parentElement;
        undone.appendChild(label);
      }
    } else {
      if (this.checked) {
        let label = this.parentElement;
        done.appendChild(label);
      }
    }
  });
}