import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';

const buttonProfile = document.querySelector('.profile__edit-button');
const formContainerEdit = document.querySelector('.pop-up_edit');
const formName = document.querySelector('.pop-up__item_name');
const name = document.querySelector('.profile__info-title');
const formSubtitle = document.querySelector('.pop-up__item_subtitle');
const subtitle = document.querySelector('.profile__info-subtitle');
const buttonSave = document.querySelector('.pop-up__button_edit');
const buttonCross = document.querySelector('.pop-up__cross_edit');
const form = document.querySelector('.pop-up__form_edit');

const AllPopUps = document.querySelectorAll('.pop-up');

const cardTemplate = document.querySelector('#template').content;
const templateSelector = document.querySelector('#template');
const cardImage = document.querySelector('.element__image');

const elements = document.querySelector('.elements');
const cardTitle = document.querySelector('.element__title');
const cardInfo = document.querySelector('.element__card-info');

const formContainerAdd = document.querySelector('.pop-up_add');
const formPlace = document.querySelector('.pop-up__item-place');
const formLink = document.querySelector('.pop-up__item-link');
const buttonAdd = document.querySelector('.profile__button');
const buttonCrossAdd = document.querySelector('.pop-up__cross_add');
const buttonSaveAdd = document.querySelector('.pop-up__button_add');
const formAdd = document.querySelector('.pop-up__form_add');

const modalWindowImage = document.querySelector('.pop-up__modal-image');
const closeImageButton = document.querySelector('.pop-up__close-icon');
const modalImage = document.querySelector('.pop-up__image');
const modalImageTitle = document.querySelector('.pop-up__bottom-title');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    
]; 

    const objects = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__item',
    submitButtonSelector: '.pop-up__button',
    inactiveButtonClass: 'pop-up__button_disabled',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__error_visible'
}

const callFormValidator = new FormValidator(objects, form);
callFormValidator.enableValidation();

const callFormValidatorAdd = new FormValidator(objects, formAdd);
callFormValidatorAdd.enableValidation();

function addCard(){
    elements.prepend(initCard());
}

function openImageHandler(link, name){ 
    modalImage.src = link; 
    modalImageTitle.textContent = name; 
    openPopUp(modalWindowImage); 
} 

function saveFormHandler(evt){ 
    evt.preventDefault(); 
    name.textContent = formName.value; 
    subtitle.textContent = formSubtitle.value; 
    closePopUp(formContainerEdit);
} 

initialCards.forEach(function (item){ 
    const addCardDefault = new Card(item, templateSelector, openPopUp, openImageHandler);
    elements.prepend(addCardDefault.initCard());
});
 
function saveFormAddHandler(evt){ 
    evt.preventDefault(); 
    const item = {};
    item.name = formPlace.value;
    item.link = formLink.value;
    const addCardDefault = new Card(item, templateSelector, openPopUp, openImageHandler);
    elements.prepend(addCardDefault.initCard());
    closePopUp(formContainerAdd);
} 

function openPopUp(popUp){
    popUp.classList.add("pop-up_open");
    document.addEventListener('keydown', checkEsc);
}

function closePopUp(popUp){
    popUp.classList.remove("pop-up_open");
    document.removeEventListener('keydown', checkEsc);
}

function checkEsc(evt){
    const searchOpenPopUp = document.querySelector('.pop-up_open');
    const escapeButton = 27;
    if(evt.which === escapeButton){
        closePopUp(searchOpenPopUp);
    } else {
        return 0;
    } 
}
 
buttonProfile.addEventListener('click', () => {
    formName.value =  name.textContent; 
    formSubtitle.value = subtitle.textContent; 
    openPopUp(formContainerEdit);
});

form.addEventListener('submit', saveFormHandler); 
buttonCross.addEventListener('click', () => closePopUp(formContainerEdit)); 
buttonAdd.addEventListener('click',() => openPopUp(formContainerAdd)); 
buttonCrossAdd.addEventListener('click',() => closePopUp(formContainerAdd)); 
formAdd.addEventListener('submit', saveFormAddHandler); 
closeImageButton.addEventListener('click',() => closePopUp(modalWindowImage)); 

AllPopUps.forEach(popUp => {
    popUp.addEventListener('click', function (evt){
        if(evt.target.classList.contains('pop-up')){
            closePopUp(popUp);
        } else {
            return 0;
        }
    })
})
