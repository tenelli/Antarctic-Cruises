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
  if (window.matchMedia('screen and (max-width: 1023px)').matches) {
    article.addEventListener('click', () => {
      let temp = article.firstElementChild;
      let card = article.lastElementChild;
      temp.classList.toggle('hidden');
      card.classList.toggle('hidden');
    });
  }
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
  // Положение курсора
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
