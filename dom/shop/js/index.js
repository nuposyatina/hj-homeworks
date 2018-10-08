
'use strict';

const buttons = document.querySelectorAll('button.add');
const totalPrice = document.querySelector('#cart-total-price');
const cartCount = document.querySelector('#cart-count');
let count = 0;
let sum = 0;

for (let button of buttons) {
	button.addEventListener('click', (e) => {
		cartCount.textContent = ++count;
		totalPrice.textContent = getPriceFormatted(sum += parseInt(event.currentTarget.dataset.price));
	})
}