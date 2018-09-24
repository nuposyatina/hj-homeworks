'use strict';
const out = document.getElementsByClassName('error-message');

document.addEventListener('submit', () => {
	event.preventDefault();
	let eventTarget = event.target;
	let path = (eventTarget.classList.contains('sign-in-htm')) ?
		'https://neto-api.herokuapp.com/signin' :
		'https://neto-api.herokuapp.com/signup';
	let data = new FormData(eventTarget);
	let tmp = {};

	Array.from(data).forEach(item => tmp[item[0]] = item[1]);
	fetch(path, {
		body: JSON.stringify(tmp),
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((res) => {
			if (200 <= res.status && res.status < 300) {
				return res;
			} else {
				throw new Error('Сервер не доступен');
			}
		})
		.then((res) => res.json())
		.then((resData) => eventTarget.getElementsByClassName('error-message')[0].innerText = (!resData.error) ?
			(eventTarget.classList.contains('sign-in-htm')) ?
				`Пользователь ${resData.name} успешно авторизован` :
				`Пользователь ${resData.name} успешно зарегистрирован` :
			resData.message)
		.catch(() => eventTarget.getElementsByClassName('error-message')[0].innerText = 'Cервер недоступен');
});