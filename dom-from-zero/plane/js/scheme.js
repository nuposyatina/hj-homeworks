'use strict'
const acSelect = document.getElementById('acSelect');
const btnSeatMap = document.getElementById('btnSeatMap');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
const seatMapDiv = document.getElementById('seatMapDiv');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');
const getData = () => fetch(`https://neto-api.herokuapp.com/plane/${acSelect.value}`);
const init = () => {
	btnSetFull.disabled = true;
	btnSetEmpty.disabled = true;
	totalPax.textContent = 0;
	totalAdult.textContent = 0;
	totalHalf.textContent = 0;
};
document.addEventListener('DOMContentLoaded', init);

btnSeatMap.addEventListener('click', event => {
	event.preventDefault();
	seatMapDiv.innerHTML ='';
	getData()
		.then(res => res.json())
		.then(showScheme)
		.catch();

	btnSetFull.disabled = false;
	btnSetEmpty.disabled = false;
});

const shemeTemplate = (scheme) => {
	return {
		tag: 'div',
		cls: ['row', 'seating-row', 'text-center'],
		content: [
			{
				tag: 'div',
				cls: ['col-xs-1', 'row-number'],
				content: {
					tag: 'h2',
					content: 1
				}
			},
			{
				tag: 'div',
				cls: 'col-xs-5',
				content: [
					{
						tag: 'div',
						cls: ['col-xs-4', 'seat'],
						content: {
							tag: 'span',
							cls: 'seat-label',
							content: 'A'
						}
					},
					{
						tag: 'div',
						cls: ['col-xs-4', 'seat'],
						content: {
							tag: 'span',
							cls: 'seat-label',
							content: 'B'
						}
					},
					{
						tag: 'div',
						cls: ['col-xs-4', 'seat'],
						content: {
							tag: 'span',
							cls: 'seat-label',
							content: 'C'
						}
					}
				]
			},
			{
				tag: 'div',
				cls: 'col-xs-5',
				content: [
					{
						tag: 'div',
						cls: ['col-xs-4', 'seat'],
						content: {
							tag: 'span',
							cls: 'seat-label',
							content: 'D'
						}
					},
					{
						tag: 'div',
						cls: ['col-xs-4', 'seat'],
						content: {
							tag: 'span',
							cls: 'seat-label',
							content: 'E'
						}
					},
					{
						tag: 'div',
						cls: ['col-xs-4', 'seat'],
						content: {
							tag: 'span',
							cls: 'seat-label',
							content: 'F'
						}
					}
				]
			}
		]
	};
};

const createScheme = (scheme) => {
	if ((scheme === undefined) || (scheme === null) || (scheme === false)) {
		return document.createTextNode('');
	}
	if ((typeof scheme === 'string') || (typeof scheme === 'number') || (scheme === true)) {
		return document.createTextNode(scheme);
	}
	if (Array.isArray(scheme)) {
		return scheme.reduce((f, elem) => {
			f.appendChild(createScheme(elem));
			return f;
		}, document.createDocumentFragment());
	}
	const element = document.createElement(scheme.tag || 'div');
	[].concat(scheme.cls || [])
		.forEach(className => element.classList.add(className));
	if (scheme.attr) {
		Object.keys(scheme.attr)
			.forEach(key => element.setAttribute(key, scheme.attr[key]));
	}
	element.appendChild(createScheme(scheme.content));
	return element;
};

function showScheme(list) {
	const blockScheme = document.createDocumentFragment();
	document.getElementById('seatMapTitle').textContent = `${list.title} (${list.passengers} пассажиров)`;

	list.scheme.forEach((el, i) => {
		let scheme = createScheme(shemeTemplate(list));
		scheme.querySelector('.row-number h2').textContent = i++;
		if (el === 0) {
			for (let key of scheme.querySelectorAll('.col-xs-4')) {
				key.classList.remove('seat');
				key.textContent = '';
			}
		} else if (el === 4) {
			scheme.getElementsByClassName('col-xs-5')[0].firstElementChild.classList.remove('seat');
			scheme.getElementsByClassName('col-xs-5')[0].firstElementChild.textContent = '';
			scheme.getElementsByClassName('col-xs-5')[1].lastElementChild.classList.remove('seat');
			scheme.getElementsByClassName('col-xs-5')[1].lastElementChild.textContent = '';
		}
		blockScheme.appendChild(scheme);
	});
	seatMapDiv.appendChild(blockScheme);

	const place = seatMapDiv.querySelectorAll('.col-xs-4');
	for (let key of place) {
		key.addEventListener('click', e => {
			if (e.altKey) {
				e.currentTarget.classList.add('half');
				e.currentTarget.classList.remove('adult');
			} else {
				(e.currentTarget.classList.contains('half')) ? e.currentTarget.classList.remove('half') : e.currentTarget.classList.toggle('adult');
			}
			counterPlace();
		});
	}
}

btnSetFull.addEventListener('click', e => {
	e.preventDefault();
	seatMapDiv.querySelectorAll('.seat').forEach(el => {
		if (!el.classList.contains('half')) {
			el.classList.add('adult');
		}
		counterPlace();
	});
});

btnSetEmpty.addEventListener('click', e => {
	e.preventDefault();
	seatMapDiv.querySelectorAll('.seat').forEach(el => {
		el.classList.remove('adult');
		el.classList.remove('half');
	});
	counterPlace();
});

function counterPlace() {
	totalAdult.textContent = seatMapDiv.getElementsByClassName('adult').length;
	totalHalf.textContent = seatMapDiv.getElementsByClassName('half').length;
	totalPax.textContent = parseInt(totalHalf.textContent) + parseInt(totalAdult.textContent);
}