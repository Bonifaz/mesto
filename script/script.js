let buttonProfile = document.querySelector('.profile__edit-button');
let formContainer = document.querySelector('.pop-up');
let formName = document.querySelector('.pop-up__item_name');
let name = document.querySelector('.profile__info-title');
let formSubtitle = document.querySelector('.pop-up__item_subtitle');
let subtitle = document.querySelector('.profile__info-subtitle');
let buttonSave = document.querySelector('.pop-up__button');
let buttonCross = document.querySelector('.pop-up__cross');
let form = document.querySelector('.pop-up__form');

function openFormHandler(){
    formContainer.classList.add("pop-up_open");
    formName.value =  name.textContent;
    formSubtitle.value = subtitle.textContent;
}

function closeFormHandler(){
    formContainer.classList.remove("pop-up_open");
}

function saveFormHandler(evt){
    evt.preventDefault();
    name.textContent = formName.value;
    subtitle.textContent = formSubtitle.value;
    closeFormHandler();
}

buttonProfile.addEventListener('click', openFormHandler);
form.addEventListener('submit', saveFormHandler);
buttonCross.addEventListener('click', closeFormHandler);
