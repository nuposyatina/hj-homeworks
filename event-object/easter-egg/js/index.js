
'use strict';
const navPanel = document.getElementsByTagName('nav')[0];
const keys = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
const secret = document.getElementsByClassName('secret')[0];
let count = 0;
function showSecret (event) {
	if (event.altKey && event.ctrlKey && (event.code === 'KeyT')) {
		navPanel.classList.toggle('visible');
	}
	if (event.code === keys[count]) {
		count++;
		if (count === keys.length) {
			secret.classList.add('visible');
		}
	} else {
		count = 0;
	}
};
document.addEventListener('keydown', showSecret);