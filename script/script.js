let buttonProfile = document.querySelector('.profile__edit-button');
let formContainer = document.querySelector('.form-container');
let formName = document.querySelector('.form__item_name');
let name = document.querySelector('.profile__info-title');
let formSubtitle = document.querySelector('.form__item-subtitle');
let subtitle = document.querySelector('.profile__info-subtitle');
let buttonSave = document.querySelector('.form__button');
let buttonCross = document.querySelector('.form__cross');
let form = document.querySelector('.form');

buttonProfile.addEventListener('click', openFormHandler);

function openFormHandler(){
    formContainer.classList.add("form-container_open");
    formName.value =  name.textContent;
    formSubtitle.value = subtitle.textContent;
}

buttonCross.addEventListener('click', closeFormHandler);

function closeFormHandler(){
    formContainer.classList.remove("form-container_open");
}

form.addEventListener('submit', saveFormHandler);

function saveFormHandler(evt){
    evt.preventDefault();
    name.textContent = formName.value;
    subtitle.textContent = formSubtitle.value;
    closeFormHandler();
}