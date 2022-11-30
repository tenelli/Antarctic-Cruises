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
});


const phoneInputs = Array.from(document.querySelectorAll('input[data-tel-input]'));

const regExp = /\D/g;

const isBackspaceKey = (evt) => evt.key === 'Backspace';

const getInputNumbersValue = function (input) {
  return input.value.replace(regExp, '');
};

const onPhonePaste = function (evt) {
  const input = evt.target;
  const inputNumbersValue = getInputNumbersValue(input);
  const pasted = evt.clipboardData || window.Clipboard;
  if (pasted) {
    const pastedText = pasted.getData('Text');
    if (regExp.test(pastedText)) {
      input.value = inputNumbersValue;
      return;
    }
  }
};

const onPhoneInput = (evt) => {
  const input = evt.target;
  const selectionStart = input.selectionStart;
  let inputNumbersValue = getInputNumbersValue(input);
  let formattedInputValue = '';

  if (!inputNumbersValue) {
    input.value = '';
    return;
  }
  if (input.value.length !== selectionStart) {
    if (evt.data && regExp.test(evt.data)) {
      input.value = inputNumbersValue;
    }
    return;
  }

  if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
    if (inputNumbersValue[0] === '9') {
      inputNumbersValue = '7' + inputNumbersValue;
    }
    const firstSymbols = (inputNumbersValue[0] === '8') ? '8' : '+7';
    formattedInputValue = input.value = firstSymbols + ' ';
    if (inputNumbersValue.length > 1) {
      formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
    }
  } else {
    formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
  }
  input.value = formattedInputValue;
};


const onPhoneKeyDown = function (evt) {
  const inputValue = evt.target.value.replace(regExp, '');
  if (isBackspaceKey(evt) && inputValue.length === 1) {
    evt.target.value = '';
  }
};

if (phoneInputs) {
  phoneInputs.forEach((input) => {
    input.addEventListener('input', onPhoneInput);
    input.addEventListener('keydown', onPhoneKeyDown, false);
    input.addEventListener('paste', onPhonePaste, false);
  });
}


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

if (modal) {
  burgerButton.classList.remove('visually-hidden');
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
  closeButton.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onModalEsc);
  document.removeEventListener('click', onClickOverlay);
}

function openModal() {
  pageBody.classList.add('scroll-lock');
  modal.classList.remove('visually-hidden');
  headerLogo.classList.add('hidden-mobile');
  headerTitle.classList.add('hidden-mobile');
  headerDescription.classList.add('hidden-mobile');
  header.classList.add('header--modal');
  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onModalEsc);
  modal.addEventListener('click', onClickOverlay);
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

  let placemark = new ymaps.Placemark([59.937468, 30.323023], {}, {
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
