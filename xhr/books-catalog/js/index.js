'use strict';

const content = document.querySelector('#content')
const booksRequest = new XMLHttpRequest();
booksRequest.open('GET', 'https://neto-api.herokuapp.com/book/');
booksRequest.send();
booksRequest.addEventListener('load', addBooks);
let booksList = '';

function addBooks() {
  const bookInfo = JSON.parse(booksRequest.responseText);

  for (let info of bookInfo) {
    booksList += `<li data-title ="${info.title}"
                     data-author="${info.author.name}"
                     data-info="${info.info}"
                     data-price="${info.price}" >
                <img src ="${info.cover.small}">
                </li>`
    content.innerHTML = bookList;
  }
}