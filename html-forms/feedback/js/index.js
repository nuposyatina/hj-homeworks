'use strict';

const form = document.querySelector('.contentform');
const inputs = form.querySelectorAll('fieldset input');
const textarea = form.querySelector('fieldset textarea');
const buttons = document.querySelectorAll('.button-contact');
const message = document.getElementById('output');
const amount = inputs.length;

function updateForm () {
  for (var i = 0; i < amount; i++) {
    if (inputs[i].name === 'name'){
      document.getElementById('name').value = inputs[i].value;
    } else if (inputs[i].name === 'lastname'){
      document.getElementById('lastname').value = inputs[i].value;
    } else if (inputs[i].name === 'company'){
      document.getElementById('company').value = inputs[i].value;
    } else if (inputs[i].name === 'role'){
      document.getElementById('role').value = inputs[i].value;
    } else if (inputs[i].name === 'zip'){
      document.getElementById('zip').value = inputs[i].value;
    } else if (inputs[i].name === 'city'){
      document.getElementById('city').value = inputs[i].value;
    } else if (inputs[i].name === 'address'){
      document.getElementById('address').value = inputs[i].value;
    } else if (inputs[i].name === 'subject'){
      document.getElementById('subject').value = inputs[i].value;
    }
  }
  document.getElementById('message').value = message.value;
}

function checkFormComplete() {
  let counter = 0;
  for (var i = 0; i < amount; i++) {
    if (inputs[i].value === "") {
      return;
    } else {
      counter +=1;
    }
  }
  if (counter === amount && textarea.value !== "") {
    buttons[0].disabled = false;
  }
}

function changeVisible (event) {
  event.preventDefault()
  form.classList.toggle('hidden');
  updateForm()
  message.classList.toggle('hidden');
}

for (let input of inputs) {
  input.addEventListener('input', checkFormComplete);
}



for (let btn of buttons) {
  btn.addEventListener('click', changeVisible);
}
