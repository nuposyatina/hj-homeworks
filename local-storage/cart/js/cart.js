'use strict';
const cartApp = {
  addButton: document.getElementById('AddToCart'),
  totalPrice: 0,
  template: {
    name: '',
    path: 'https://neto-api.herokuapp.com/cart',
    target: '',
    url: function () {
      return `${this.path}/${this.target}`;
    },
    template: '',
    htmlElement: function () {
      return document.getElementById(`${this.name}Swatch`);
    },
    enabled: function () {
      return document.querySelector(`#${this.name}Swatch input:enabled`);
    },
    selected: function () {
      return localStorage[`${this.name}Selected`];
    },
    get: function (url = this.url(), config = {}) {
      return fetch(url, config)
        .then((res) => {
          if (200 <= res.status && res.status < 300) {
            return res;
          }
          throw new Error(res.statusText);
        })
        .then((res) => res.json())
        .catch(err => console.log(`Ошибка:${err}`));
    }
  },
};
cartApp.filter = Object.create(cartApp, {
  getAllFilters: {
    value: function () {
      return Object.keys(this).map(item => this[item]);
    }
  },
});

Object.defineProperties(cartApp.filter, {
  'template': {
    enumerable: false
  },
  'getAllFiltersGet': {
    enumerable: false
  },
  'getAllFilters': {
    enumerable: false
  }
});

cartApp.filter.colors = Object.create(cartApp.template, {
  name: {
    value: 'color'
  },
  target: {
    value: 'colors'
  },
  template: {
    value: ({
        title,
        type,
        isAvailable
      }) =>
      `<div data-value="${type}" class="swatch-element color ${type} ${(isAvailable) ? 'available' : 'soldout'}">
  <div class="tooltip">${title}</div>
  <input quickbeam="color" id="swatch-1-${type}" type="radio" name="color" value="${type}" ${(isAvailable) ? '' : 'disabled'}>
  <label for="swatch-1-${type}" style="border-color: red;">
    <span style="background-color: ${type};"></span>
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>`
  },

});

cartApp.filter.sizes = Object.create(cartApp.template, {
  name: {
    value: 'size'
  },
  target: {
    value: 'sizes'
  },
  template: {
    value: ({
        title,
        type,
        isAvailable
      }) =>
      `<div data-value="${type}" class="swatch-element plain ${type} ${(isAvailable) ? 'available' : 'soldout'}">
  <input id="swatch-0-${type}" type="radio" name="size" value="${type}" ${(isAvailable) ? '' : 'disabled'}>
  <label for="swatch-0-${type}">
    ${title}
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>`
  },

});

cartApp.cart = Object.create(cartApp.template, {
  name: {
    value: 'cart'
  },
  template: {
    value: () =>
      `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
        <span>
          <strong class="quick-cart-text">Оформить заказ<br></strong>
          <span id="quick-cart-price">${this.totalPrice}</span>
        </span>
      </a>`
  },
  productTemplate: {
    value: ({
      id,
      title,
      pic,
      quantity
    }) => `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${id}" style="opacity: 1;">
  <div class="quick-cart-product-wrap">
    <img src=${pic} title=${title}>
    <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
    <span class="s2"></span>
  </div>
  <span class="count hide fadeUp" id="quick-cart-product-count-${id}">${quantity}</span>
  <span class="quick-cart-product-remove remove" data-id="${id}"></span>
</div>`
  },
  addToCartForm: {
    value: function () {
      return document.getElementById('AddToCartForm');
    }
  },
  priceLabel: {
    value: function () {
      return document.getElementById('quick-cart-price');
    }
  },
  htmlElement: {
    value: function () {
      return document.getElementById('quick-cart');
    }
  },
  close: {
    value: () => document.getElementById('quick-cart-pay').classList.remove('open')
  },
  refresh: {
    value: function (data) {
      for (let {
          id,
          title,
          pic,
          quantity,
          price
        } of data) {
        this.htmlElement().innerHTML = this.productTemplate({
          id,
          title,
          pic,
          quantity,
          price
        });
        this.totalPrice = quantity * price;
        this.htmlElement().innerHTML += this.template();
        this.priceLabel().innerText = this.totalPrice;
      }
    }
  },
  add: {
    value: function () {
      let data = new FormData(this.addToCartForm());
      data.append('productId', this.addToCartForm().dataset.productId);
      this.get(this.url(), {
        body: data,
        method: 'POST'
      }).then((res) => this.refresh(res));
    }
  },
  remove: {
    value: function () {
      let data = new FormData();
      data.append('productId', event.target.dataset.id);
      this.get(`${this.url()}remove`, {
          body: data,
          method: 'POST'
        }).then((res) => {
          if (res.length === 0) {
            this.close();
            this.htmlElement().innerHTML = '';
          } else {
            this.refresh(res);
          }
        })
        .catch(err => console.log(`Ошибка:${err}`));;
    }
  },
  getCart: {
    value: function () {
      return this.get()
        .then(res => this.refresh(res))
        .catch(err => console.log(`Ошибка:${err}`));

    }
  }

});

cartApp.init = function () {
  let data = this.filter.getAllFilters().map(item => item.get());

  Promise.all(data)
    .then(res => {
      res
        .map((item, index) => item
          .forEach(({
              title,
              type,
              isAvailable
            }) =>
            this.filter.getAllFilters()[index].htmlElement().innerHTML +=
            this.filter.getAllFilters()[index].template({
              title,
              type,
              isAvailable
            })));
      this.filter.getAllFilters().forEach(item => {
        if (!item.selected()) {
          localStorage[`${item.name}Selected`] = item.enabled().id;
        }
        document.getElementById(item.selected()).checked = true;
      });
    })
    .catch(err => console.log(`Ошибка:${err}`));
  this.cart.getCart();
};

cartApp.init();

const getEvents = (event) => {
  if (event.target === cartApp.addButton || event.target === cartApp.addButton.children[0]) {
    event.preventDefault();
    cartApp.cart.add();
  } else if (event.target.classList.contains('remove')) {
    cartApp.cart.remove();
  } else if (cartApp.filter.getAllFilters().find(item => item.name === event.target.name)) {
    localStorage[`${event.target.name}Selected`] = event.target.id;
  } else if (event.target.alt) {
    slider();
  }

};
document.addEventListener('click', getEvents);

const slider = () => {
  event.preventDefault();
  document.querySelector('#big-image').style.setProperty('background-image', `url(${event.target.offsetParent.href})`);
};