
'use strict';
const btns = document.querySelectorAll('button.add');
const cartCount = document.querySelector('#cart-count');
const cartTotalPrice = document.querySelector('#cart-total-price');
let counter = 0;
let sum = 0;

for (let btn of btns) {
	btn.addEventListener('click', () => {
		cartCount.innerText = ++counter;
		cartTotalPrice.innerText = getPriceFormatted(sum += parseInt(event.currentTarget.dataset.price));
	});
}