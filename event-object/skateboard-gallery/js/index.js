
'use strict';

const galleryNav = document.getElementsByClassName('gallery-nav')[0];
const products = galleryNav.getElementsByTagName('a');
const fullProductImage = document.getElementsByClassName('gallery-view')[0];


function showProduct(event) {
  event.preventDefault();
  if (this.classList.contains('gallery-current')) {
    return;
  }
  const currentProducts = document.getElementsByClassName('gallery-current');
  for (const currentProduct of currentProducts) {
   currentProduct.classList.remove('gallery-current');
}

this.classList.add('gallery-current');  
fullProductImage.src = this.href; 
}

for(let product of products){
product.addEventListener('click', showProduct);  
}