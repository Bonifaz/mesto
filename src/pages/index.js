import './../pages/index.css';

import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopUp} from '../components/PopUp.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {initialCards, validationSettings} from '../utils/constants.js';



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
const profileInfoTitleSelector = '.profile__info-title';
const profileInfoSubtitleSelector = '.profile__info-subtitle';
const profileName = document.querySelector('.pop-up__item_name');
const porfileProf = document.querySelector('.pop-up__item_subtitle');
const cardTitle = document.querySelector('.pop-up__item-place');
const cardLink = document.querySelector('.pop-up__item-link');
const userInfoSelectors = {
    name: profileInfoTitleSelector,
    prof: profileInfoSubtitleSelector
}

const items = new Section({
    items: initialCards,
    renderer: (item, containForCards) => {
        const card = createCard(item, templateSelector)
        containForCards.append(card);
    }, 
},elements);
items.rendItems();

const formValidatorEdit = new FormValidator(validationSettings, form);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(validationSettings, formAdd);
formValidatorAdd.enableValidation();

const popupWithFormEdit = new PopupWithForm(formContainerEdit, saveFormHandler);
const popupWithFormAdd = new PopupWithForm(formContainerAdd, saveFormAddHandler);
const popupWithImage = new PopupWithImage(modalWindowImage);
const userInfo = new UserInfo(userInfoSelectors);

function openImageHandler(link, name){ 
    popupWithImage.open(link, name);
} 

function saveFormHandler(evt, infoUser){
    evt.preventDefault();
    userInfo.setUserInfo(infoUser);
    popupWithFormEdit.close();
}

function createCard(item, templateSelector){
    const addCardDefault = new Card(item, templateSelector, openImageHandler);
    popupAddButtonDisabled();
    return addCardDefault.initCard();
}

function popupAddButtonDisabled(){
    popupAddSubmitButton.classList.add(validationSettings.inactiveButtonClass);
    popupAddSubmitButton.setAttribute('disabled', 'disabled');
}

function saveFormAddHandler(evt, infoPic){ 
    evt.preventDefault();
    const item = {}; 
    item.name = infoPic[0];
    item.link = infoPic[1];
    const card = createCard(item, templateSelector);
    items.addItem(card, elements);
    popupWithFormAdd.close()
}

popupWithImage.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();
 
buttonProfile.addEventListener('click', () => {
    const infoUser = userInfo.getUserInfo();
    profileName.value = infoUser.name;
    porfileProf.value = infoUser.prof;
    formValidatorEdit._hideInputError(profileName);
    formValidatorEdit._hideInputError(porfileProf);
    popupEditSubmitButton.classList.remove(validationSettings.inactiveButtonClass);
    popupEditSubmitButton.removeAttribute('disabled', 'disabled');
    popupWithFormEdit.open();

});
buttonAdd.addEventListener('click', () => {
    formValidatorAdd._hideInputError(cardTitle);
    formValidatorAdd._hideInputError(cardLink);
    popupWithFormAdd.open();
});