'use strict';

function createElement(node) {
	if ((node === undefined) || (node === null) || (node === false)) {
		return document.createTextNode('');
	}

	if ((typeof node === 'string') || (typeof node === 'number') || (node === true)) {
		return document.createTextNode(node);
	}

	if (Array.isArray(node)) {
		return node.reduce((f, elem) => {
			f.appendChild(createElement(elem));
			return f;
		}, document.createDocumentFragment());
	}

	const element = document.createElement(node.name || 'div' );

	if (node.props) {
		Object.keys(node.props)
			.forEach(key => element.setAttribute(key, node.props[key]))
	}

	element.appendChild(createElement(node.childs));

	return element;
}