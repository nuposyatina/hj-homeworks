'use strict';

let content = document.getElementById('content');
let from = document.getElementById('from');
let to = document.getElementById('to');
let result = document.getElementById('result');
let loader = document.getElementById('loader');
let source = document.getElementById('source');

document.addEventListener('DOMContentLoaded', () => {loader.classList.remove('hidden');});

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', loadConverter);
xhr.open('GET', 'https://neto-api.herokuapp.com/currency', true);
xhr.send();



function loadConverter () {
  content.classList.remove('hidden');
  loader.classList.add('hidden');
  const currencyList = JSON.parse(xhr.responseText);
  let options = currencyList.reduce(function(currencyNames, current) {
    return currencyNames + '<option value="' + current.value + '" code="' + current.code + '">' + current.code + '</option>';
  }, '');
  from.innerHTML = options;
  to.innerHTML = options;
}

function converter () {
  let total = parseFloat(source.value) / parseFloat(to.value) * parseFloat(from.value);
  result.value = total.toFixed(2);
}
from.addEventListener('change', converter);
to.addEventListener('change', converter);
source.addEventListener('input', converter);