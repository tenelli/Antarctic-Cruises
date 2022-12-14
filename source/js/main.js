import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
const routes = document.querySelectorAll('.routes__article');
routes.forEach((article) => {
  article.classList.remove('routes__article--no-js');
  article.addEventListener('click', () => {
    let temp = article.firstElementChild;
    let card = article.lastElementChild;
    temp.classList.toggle('on-top');
    card.classList.toggle('on-top');
    temp.classList.toggle('on-bottom');
    card.classList.toggle('on-bottom');
  });

  article.addEventListener('focusin', () => {
    let temp = article.firstElementChild;
    let card = article.lastElementChild;
    temp.classList.toggle('on-top');
    card.classList.toggle('on-top');
    temp.classList.toggle('on-bottom');
    card.classList.toggle('on-bottom');
  });
});


let burgerButton = document.querySelector('[data-open-button]');
let modal = document.querySelector('[data-modal-container]');
let closeButton = document.querySelector('[data-close-button]');
let pageBody = document.body;
let headerLogo = document.querySelector('[data-header-logo]');
let headerTitle = document.querySelector('[data-header-title]');
let headerDescription = document.querySelector('[data-header-description]');
let header = document.querySelector('[data-page-header');
let headerMain = document.querySelector('[data-header-main]');
let headerNavigation = document.querySelector('[data-header-navigation');
let headerDarkLogo = document.querySelector('[data-dark-logo]');

// убрала модификаторы там, где это можно было вменяемо сделать
headerMain.classList.remove('header__main--no-js');
headerLogo.classList.remove('hidden-mobile');
headerNavigation.classList.add('hidden-mobile');
headerDarkLogo.classList.remove('is-shown');
headerTitle.classList.remove('header__title--no-js');
let modalAnchor = document.querySelectorAll('[data-modal-wrapper]');


if (modal) {
  burgerButton.classList.remove('header__burger--no-js');
  burgerButton.addEventListener('click', openModal);
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function closeModal() {
  modal.classList.add('visually-hidden');
  headerLogo.classList.remove('hidden-mobile');
  headerTitle.classList.remove('hidden-mobile');
  headerDescription.classList.remove('hidden-mobile');
  header.classList.remove('header--modal');
  pageBody.classList.remove('scroll-lock');
  modal.removeEventListener('keydown', trapFocus);
  closeButton.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onModalEsc);
  document.removeEventListener('click', onClickOverlay);
  modalAnchor.forEach((anchor) => {
    anchor.removeEventListener('click', closeModal);
  });
}

function openModal() {
  pageBody.classList.add('scroll-lock');
  closeButton.focus();
  modal.classList.remove('visually-hidden');
  headerLogo.classList.add('hidden-mobile');
  headerTitle.classList.add('hidden-mobile');
  headerDescription.classList.add('hidden-mobile');
  header.classList.add('header--modal');
  modal.addEventListener('keydown', trapFocus);
  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onModalEsc);
  modal.addEventListener('click', onClickOverlay);
  modalAnchor.forEach((anchor) => {
    anchor.addEventListener('click', closeModal);
  });
}

function onModalEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

let modalWrapper = document.querySelector('[data-modal-wrapper]');
function onClickOverlay(evt) {
  const elementsСlickArea = !evt.composedPath().includes(modalWrapper);
  if (elementsСlickArea) {
    closeModal();
  }
}

let focusableEls = modal.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="tel"]:not([disabled]), input[type="text"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
let firstFocusableEl = focusableEls[0];
let lastFocusableEl = focusableEls[focusableEls.length - 1];
let KEYCODE_TAB = 9;

let trapFocus = (evt) => {
  const isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

  if (!isTabPressed) {
    return;
  }

  if (evt.shiftKey) {
    if (document.activeElement === firstFocusableEl) {
      lastFocusableEl.focus();
      evt.preventDefault();
    }
  } else {
    if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus();
      evt.preventDefault();
    }
  }
};

/* global ymaps */
let block = document.querySelector('#map');
block.firstElementChild.classList.add('visually-hidden');
ymaps.ready(init);
function init() {
  if (!block) {
    return;
  }

  let map = new ymaps.Map('map', {
    center: [59.938635, 30.323118],
    zoom: 15.5,
  });

  let placemark = new ymaps.Placemark([59.937428, 30.322603], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/svg/map_tag.svg',
    iconImageSize: [18, 22],
    iconImageOffset: [-15, -12],
  });

  map.geoObjects.add(placemark);
}

let formName = document.querySelector('[data-name-input]');
let formPhone = document.querySelector('[data-tel-input]');
let formEmail = document.querySelector('[data-email-input]');
let form = document.querySelector('[data-form]');
let isStorageSupport = true;
let userNameStorage = '';
let userPhoneStorage = '';
let userEmailStorage = '';

if (form) {
  try {
    userNameStorage = localStorage.getItem('formName');
    userPhoneStorage = localStorage.getItem('formPhone');
    userEmailStorage = localStorage.getItem('formEmail');
  } catch (err) {
    isStorageSupport = false;
  }
}

if (userNameStorage) {
  formName.value = userNameStorage;
  formPhone.value = userPhoneStorage;
  formEmail.value = userEmailStorage;
}

function checkFillInputField(evt) {
  if (!formName || !formPhone || !formEmail) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('formName', formName.value);
      localStorage.setItem('formPhone', formPhone.value);
      localStorage.setItem('formEmail', formEmail.value);
    }
  }
}

form.addEventListener('submit', checkFillInputField);

// если нужен запрет ввода, а не сообщение валидации

/* formPhone.addEventListener('keyup', function () {
    formPhone.value = formPhone.value.replace(/[A-Za-zА-Яа-яёЁ]/g, '');
  });
*/
