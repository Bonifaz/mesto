let buttonProfile = document.querySelector('.profile__edit-button');
let form = document.querySelector('.form');
let overlay = document.querySelector('.overlay');
let formName = document.querySelector('.form__item-name');
let name = document.querySelector('.profile__info-title');
let formSubtitle = document.querySelector('.form__item-subtitle');
let subtitle = document.querySelector('.profile__info-subtitle');

console.log(formName);

buttonProfile.addEventListener('click', openFormHandler);

function openFormHandler(){
    form.classList.remove('form__close');
    form.classList.remove('overlay__close');
    form.classList.add('form__open');
    overlay.classList.add('overlay__open');
    formName.setAttribute('value', name.textContent);
    formSubtitle.setAttribute('value', subtitle.textContent);
}

let buttonCross = document.querySelector('.form__cross');

buttonCross.addEventListener('click', closeFormHandler);

function closeFormHandler(){
    form.classList.remove('form__open');
    form.classList.remove('overlay__open');
    form.classList.add('form__close');
    overlay.classList.add('overlay__close');
}

let buttonSave = document.querySelector('.form__button');

buttonSave.addEventListener('click', saveFormHandler);

function saveFormHandler(){
   name.textContent = formName.value;
   subtitle.textContent = formSubtitle.value;
   form.classList.add('form__close');
    overlay.classList.add('overlay__close');
}

