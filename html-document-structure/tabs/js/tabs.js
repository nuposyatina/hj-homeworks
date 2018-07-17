'use strict';

const tabs = document.getElementById('tabs'),
  tabsNav = tabs.querySelector('.tabs-nav'),
  tabsContent = tabs.querySelector('.tabs-content'),
  article = tabsNav.querySelector('li'),
  items = tabsContent.children;

document.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < items.length; i++) {
    let listNav = article.cloneNode(true);
    tabsNav.appendChild(listNav).firstElementChild.classList.add(items[i].dataset.tabIcon);
    tabsNav.appendChild(listNav).firstElementChild.textContent = items[i].dataset.tabTitle;
    items[i].classList.add('hidden');
  }
  tabsNav.removeChild(article);
  tabsNav.firstElementChild.classList.add('ui-tabs-active');
  items[0].classList.remove('hidden');

  for (let btn of tabsNav.children) {
    btn.addEventListener('click', setActiveNav);
  }
});

function setActiveNav() {
  let activeTabNav = tabs.querySelector('.ui-tabs-active');
  if (this.classList.contains('ui-tabs-active')) {
    return;
  } else {
    activeTabNav.classList.remove('ui-tabs-active');
    this.classList.add('ui-tabs-active');
    setActiveTab(this);
  }
}

function setActiveTab(btn) {
  let activeTab;
  for (let item of items) {
    if (!item.classList.contains('hidden')) {
      activeTab = item;
    }
  }
  for (var i = 0; i < items.length; i++) {
    if (btn.textContent === items[i].dataset.tabTitle)
      items[i].classList.remove('hidden');
    activeTab.classList.add('hidden');
  }
}