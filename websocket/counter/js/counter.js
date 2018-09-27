'use strict';

const counter = document.getElementsByClassName('counter')[0];
const error = document.getElementsByClassName('errors')[0];
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', ({
  data
}) => {
  let {
    connections,
    errors
  } = JSON.parse(data);
  counter.innerText = connections;
  error.innerText = errors;
});
window.addEventListener('beforeunload', () => {
  connect.close(1000);
});