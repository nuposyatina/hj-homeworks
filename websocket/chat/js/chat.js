'use strict';

const chat = document.querySelector('.chat');
const chatBox = init(chat);
const socket = new WebSocket('wss://neto-api.herokuapp.com/chat');

chatBox.content.setAttribute('style', 'overflow-y: auto;');

socket.addEventListener('open', () => {
  triggerStatus('Пользователь появился в сети');
  chatBox.status.textContent = chatBox.status.dataset.online;
  chatBox.submit.disabled = false;
});

socket.addEventListener('close', () => {
  triggerStatus('Пользователь не в сети');
  chatBox.status.textContent = chatBox.status.dataset.offline;
  chatBox.submit.disabled = true;
});

socket.addEventListener('message', (event) => {
  const data = event.data;
  const messageInput = chatBox.templates.loading;
  const messageTemplates = chatBox.templates.messageTemplates.cloneNode(true);

  if (data === '...') {
    chatBox.content.appendChild(messageInput).scrollIntoView({
      block: "end",
      behavior: "smooth"
    });
  } else {
    addMessage(messageTemplates, data);
    chatBox.content.appendChild(messageTemplates).scrollIntoView({
      block: "end",
      behavior: "smooth"
    });
  }
});

chatBox.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = chatBox.input.value;
  const messagePersonal = chatBox.templates.messagePersonal.cloneNode(true);

  addMessage(messagePersonal, value);
  chatBox.content.appendChild(messagePersonal).scrollIntoView({
    block: "end",
    behavior: "smooth"
  });
  socket.send(value);
  chatBox.form.reset();
});

function init(chatElem) {
  return {
    form: chatElem.querySelector('.message-box'),
    input: chatElem.querySelector('.message-input'),
    submit: chatElem.querySelector('.message-submit'),
    content: chatElem.querySelector('.messages-content'),
    status: chatElem.querySelector('.chat-status'),
    templates: {
      messageTemplates: chatElem.querySelector('[class="message"]'),
      messagePersonal: chatElem.querySelector('.message.message-personal'),
      loading: chatElem.querySelector('.message.loading').cloneNode(true),
      status: chatElem.querySelector('.message.message-status')
    }
  };
}

function triggerStatus(messageStatus) {
  const message = chatBox.templates.status.cloneNode(true);
  message.querySelector('.message-text').textContent = messageStatus;
  chatBox.content.appendChild(message);
}

function addMessage(who, data) {
  const time = new Date();
  const hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  who.querySelector('.message-text').textContent = data;
  who.querySelector('.timestamp').textContent = `${hour}:${minutes}`;
}