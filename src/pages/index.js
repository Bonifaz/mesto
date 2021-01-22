import './../pages/index.css';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopUp} from '../components/PopUp.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {initialCards, validationSettings} from '../utils/constants.js';
import {Api} from '../components/Api.js'

const buttonProfile = document.querySelector('.profile__edit-button');
const formContainerEdit = document.querySelector('.pop-up_edit');
const popupDeleteContainer = document.querySelector('.pop-up_delete');
const buttonSave = document.querySelector('.pop-up__button_edit');
const popupEditSubmitButton = document.querySelector('.pop-up__button_edit');
const popupAddSubmitButton = document.querySelector('.pop-up__button_add');
const formContainerAvatar = document.querySelector('.pop-up_avatar');
const form = document.querySelector('.pop-up__form_edit');
const formAvatar = document.querySelector('.pop-up__form_avatar');
const allPopUps = document.querySelectorAll('.pop-up');
const templateSelector = document.querySelector('#template');
const elements = document.querySelector('.elements');
const formContainerAdd = document.querySelector('.pop-up_add');
const buttonAdd = document.querySelector('.profile__button');
const popupAvatarSubmitButton = document.querySelector('.pop-up__button_avatar');
const formAdd = document.querySelector('.pop-up__form_add');
const modalWindowImage = document.querySelector('.pop-up__modal-image');
const profileInfoTitleSelector = '.profile__info-title';
const profileInfoSubtitleSelector = '.profile__info-subtitle';
const profileInfoAvatar = '.profile__avatar';
const avatar = document.querySelector(profileInfoAvatar);
const profileName = document.querySelector('.pop-up__item_name');
const porfileProf = document.querySelector('.pop-up__item_subtitle');
const cardTitle = document.querySelector('.pop-up__item-place');
const cardLink = document.querySelector('.pop-up__item-link');
const deleteButtonSelector = '.element__delete';
const confirmDeleteButton = document.querySelector('.pop-up__button_delete');
const counterLike = '.element__counter';
const buttonAvatarEdit = document.querySelector('.profile__avatar-elements');

const token = 'b38e7e87-f50b-4971-8f98-b921d67a88e2';
const addressCard = 'https://mesto.nomoreparties.co/v1/cohort-19/cards';
const addressInfo = 'https://mesto.nomoreparties.co/v1/cohort-19/users/me';
const userInfoSelectors = {
    name: profileInfoTitleSelector,
    prof: profileInfoSubtitleSelector,
    avatar: profileInfoAvatar
}

const contApi = new Api(token);
const formValidatorEdit = new FormValidator(validationSettings, form);
formValidatorEdit.enableValidation();
const formValidatorAdd = new FormValidator(validationSettings, formAdd);
formValidatorAdd.enableValidation();
const formValidatorAvatar = new FormValidator(validationSettings, formAvatar);
formValidatorAvatar.enableValidation();
const popupDelete = new PopUp(popupDeleteContainer);
popupDelete.setEventListeners();
const popupWithFormEdit = new PopupWithForm(formContainerEdit, saveFormHandler);
const popupWithFormAdd = new PopupWithForm(formContainerAdd, saveFormAddHandler);
const popupWithImage = new PopupWithImage(modalWindowImage);
const PopupWithFormAvatar = new PopupWithForm(formContainerAvatar, saveFormAvatar);

const userInfo = new UserInfo(userInfoSelectors);

contApi.getCard(addressCard)
    .then(res => {
        const items = new Section({
            items: res,
            renderer: (item, containForCards) => {
                const card = createCard(item, templateSelector);
                card.querySelector('.element').setAttribute('ID', `${item._id}`);
                card.querySelector(counterLike).textContent = item.likes.length;
                if(item.owner._id != 'adea68492bbd1b62eed03704'){
                    card.querySelector(deleteButtonSelector).remove();
                }
                containForCards.append(card);
            }, 
        },elements);
        items.rendItems();
    });

contApi.getInfo(addressInfo)
    .then(res =>{
        const item = [];
        item[0] = res.name;
        item[1] = res.about;
        userInfo.setAvatar(res.avatar);
        userInfo.setUserInfo(item);
    })


function openImageHandler(link, name){ 
    popupWithImage.open(link, name);
} 

function saveFormAvatar(evt, link){
    contApi.editingAvatar(addressInfo,`${link[0]}`);
    avatar.src=link[0];
    PopupWithFormAvatar.close();
}

function saveFormHandler(evt, infoUser){
    evt.preventDefault();
    contApi.editingInfo(addressInfo, infoUser[0], infoUser[1]);
    userInfo.setUserInfo(infoUser);
    popupWithFormEdit.close();
}

function createCard(item, templateSelector){
    const addCardDefault = new Card(item, templateSelector, openImageHandler, openDeleteHandler);
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
    contApi.postCard(addressCard, item.name, item.link);
    popupWithFormAdd.close()
}

function openDeleteHandler(target){
    popupDelete.open();
    const id = target.closest('.element').id;
    confirmDeleteButton.addEventListener('click', () => deleteCard(id));
}

function deleteCard(id){
   contApi.deleteCard(addressCard, id);
   popupDelete.close();
}

popupWithImage.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();
PopupWithFormAvatar.setEventListeners();
 
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

buttonAvatarEdit.addEventListener('click', () =>{
    PopupWithFormAvatar.open();
})
