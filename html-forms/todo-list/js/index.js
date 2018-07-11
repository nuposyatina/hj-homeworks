'use strict';

function complete() {
  let taskCounter = 0;
  for (let i in tasks) {
    if (tasks[i].checked) {
      taskCounter++;
    }
  }
  output.value = taskCounter + '/' + tasks.length;
  if (taskCounter == tasks.length) {
    listBlock.classList.add('complete');
  } else {
    listBlock.classList.remove('complete');
  }
}

const listBlock = document.querySelector('.list-block');
const tasks = listBlock.getElementsByTagName('input');

const output = listBlock.querySelector('output');
complete();
for (let i in tasks) {
  tasks[i].onclick = complete;
}
document.addEventListener('DOMContentLoaded', complete);