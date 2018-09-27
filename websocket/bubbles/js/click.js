'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
connection.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`);
});
connection.addEventListener('open', () => {
  showBubbles(connection);
  document.addEventListener('click', ({
    clientX: x,
    clientY: y
  }) => {
    connection.send(JSON.stringify({
      x,
      y
    }));
  });
});
window.addEventListener('beforeunload', () => {
  connection.close();
});