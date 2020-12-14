import './../pages/index.css'; 

import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopUp} from '../components/PopUp.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
export {saveFormAddHandler, saveFormHandler, openImageHandler};



const buttonProfile = document.querySelector('.profile__edit-button');
const formContainerEdit = document.querySelector('.pop-up_edit');
const buttonSave = document.querySelector('.pop-up__button_edit');
const popupEditSubmitButton = document.querySelector('.pop-up__button_edit');
const popupAddSubmitButton = document.querySelector('.pop-up__button_add');
const form = document.querySelector('.pop-up__form_edit');
const allPopUps = document.querySelectorAll('.pop-up');
const templateSelector = document.querySelector('#template');
const elements = document.querySelector('.elements');
const formContainerAdd = document.querySelector('.pop-up_add');
const buttonAdd = document.querySelector('.profile__button');
const buttonSaveAdd = document.querySelector('.pop-up__button_add');
const formAdd = document.querySelector('.pop-up__form_add');
const modalWindowImage = document.querySelector('.pop-up__modal-image');
const userInfoSelectors = {
    name: '.profile__info-title',
    prof: '.profile__info-subtitle'
}

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

const callItems = new Section({
    items: initialCards,
    renderer: (item, containForCards) => {
        const cardClass = new Card(item, templateSelector, openImageHandler);
        const card = cardClass.initCard();
        containForCards.append(card);
    }, 
},elements);
callItems.rendItems();

const callFormValidator = new FormValidator(objects, form);
callFormValidator.enableValidation();

const callFormValidatorAdd = new FormValidator(objects, formAdd);
callFormValidatorAdd.enableValidation();

const classEditPopup = new PopupWithForm(formContainerEdit, buttonSave);
const classAddPopUp = new PopupWithForm(formContainerAdd, buttonSaveAdd);
const popupWithImageClass = new PopupWithImage(modalWindowImage);
const classUserInfo = new UserInfo(userInfoSelectors);

function openImageHandler(link, name){ 
    popupWithImageClass.open(link, name);
} 

function saveFormHandler(evt, infoUser){
    evt.preventDefault();
    classUserInfo.setUserInfo(infoUser);
    classEditPopup.close();
}

function renderCard(item, templateSelector){
    const addCardDefault = new Card(item, templateSelector, openImageHandler);
    popupAddSubmitButton.classList.add('pop-up__button_disabled');
    popupAddSubmitButton.setAttribute('disabled', 'disabled');
    return addCardDefault.initCard();
}

function saveFormAddHandler(evt, infoPic){ 
    evt.preventDefault();
    const item = {}; 
    item.name = infoPic[0];
    item.link = infoPic[1];
    const card = renderCard(item, templateSelector);
    popupAddSubmitButton
    callItems.addItem(card, elements);
    classAddPopUp.close()
}

popupWithImageClass.setEventListeners();
classAddPopUp.setEventListeners();
classEditPopup.setEventListeners();
 
buttonProfile.addEventListener('click', () => {
    const infoUser = classUserInfo.getUserInfo();
    document.querySelector('.pop-up__item_name').value = infoUser.name;
    document.querySelector('.pop-up__item_subtitle').value = infoUser.prof;
    callFormValidator._hideInputError(document.querySelector('.pop-up__item_name'));
    callFormValidator._hideInputError(document.querySelector('.pop-up__item_subtitle'));
    popupEditSubmitButton.classList.remove('pop-up__button_disabled');
    popupEditSubmitButton.removeAttribute('disabled', 'disabled');
    classEditPopup.open();

});
buttonAdd.addEventListener('click', () => {
    callFormValidatorAdd._hideInputError(document.querySelector('.pop-up__item-place'));
    callFormValidatorAdd._hideInputError(document.querySelector('.pop-up__item-link'));
    classAddPopUp.open();
});

allPopUps.forEach(popUp => {
    popUp.addEventListener('click', function (evt){
        if(evt.target.classList.contains('pop-up')){
            classEditPopup.close();
            classAddPopUp.close();
            popupWithImageClass.close();
        }
    })
})