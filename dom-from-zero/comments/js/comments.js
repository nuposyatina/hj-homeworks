'use strict';

const commentsContainer = document.querySelector('.comments');
let formatComment = (tmpl) => {
	let elem = document.createElement(tmpl.tag);
	elem.classList.add(tmpl.cls);
	if (tmpl.style) {
		elem.setAttribute('style', tmpl.style);
	}
	if (Array.isArray(tmpl.content)) {
		for (let item of tmpl.content) {
			elem.appendChild(formatComment(item));
		}
	} else if (typeof tmpl.content === 'object') {
		elem.appendChild(formatComment(tmpl.content));
	} else if (typeof tmpl.content === 'string') {
		let textNode = document.createTextNode(tmpl.content);
		elem.appendChild(textNode);
	}
	commentsContainer.appendChild(elem);
	return elem;
};
let showComments = (data) => data.map(block => {
	formatComment(block);
});
let createComment = (res) => res.map(({author: {name, pic}, text, date}) => {
	return {
		tag: 'div',
		cls: 'comment-wrap',
		content: [
			{
				tag: 'div',
				cls: 'photo',
				title: `${name}`,
				content: {
					tag: 'div',
					cls: 'avatar',
					style: `background-image: url('${pic}')`,
					content: ''
				}
			},
			{
				tag: 'div',
				cls: 'comment-block',
				content: [
					{
						tag: 'pre',
						cls: 'comment-text',
						content: {
							tag: 'pre',
							content: `${text}`
						}
					},
					{
						tag: 'div',
						cls: 'bottom-comment',
						content:
							[{
								tag: 'div',
								cls: 'comment-date',
								content: `${new Date(date).toLocaleString('ru-Ru')}`
							},
								{
									tag: 'ul',
									cls: 'comment-actions',
									content: [
										{
											tag: 'li',
											cls: 'complain',
											content: 'Пожаловаться'
										},
										{
											tag: 'li',
											cls: 'reply',
											content: 'Ответить'
										}
									]

								}
							]
					}
				]
			}
		]
	};
});
fetch('https://neto-api.herokuapp.com/comments')
	.then(res => res.json())
	.then(createComment)
	.then(showComments);