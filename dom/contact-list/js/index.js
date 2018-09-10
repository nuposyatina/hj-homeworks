'use strict';
const contacts = JSON.parse(loadContacts());
const contactsList = document.querySelector('.contacts-list');
contactsList.innerHTML = '';
let contactsListElements = '';
for (let contact of contacts) {
	contactsListElements += `<li data-email="${contact.email}" data-phone="${contact.phone}"><strong>${contact.name}</strong></li>`;
}
contactsList.innerHTML = contactsListElements;