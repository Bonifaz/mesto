import '../pages/index.css';

import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {validationSettings} from '../utils/constants.js';
import {Api} from '../components/Api.js'
import {renderLoading} from '../utils/utils.js';
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
const modalWindowImage = document.querySelector('.pop-up_modal-image');
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
const api = new Api(token, addressCard, addressInfo);

const formValidatorEdit = new FormValidator(validationSettings, form);
formValidatorEdit.enableValidation();
const formValidatorAdd = new FormValidator(validationSettings, formAdd);
formValidatorAdd.enableValidation();
const formValidatorAvatar = new FormValidator(validationSettings, formAvatar);
formValidatorAvatar.enableValidation();
const popupDelete = new Popup(popupDeleteContainer);
popupDelete.setEventListeners();
const popupWithFormEdit = new PopupWithForm(formContainerEdit, saveFormHandler);
popupWithFormEdit.setEventListeners();
const popupWithFormAdd = new PopupWithForm(formContainerAdd, saveFormAddHandler);
popupWithFormAdd.setEventListeners();
const popupWithImage = new PopupWithImage(modalWindowImage);
popupWithImage.setEventListeners();
const popupWithFormAvatar = new PopupWithForm(formContainerAvatar, saveFormAvatar);
popupWithFormAvatar.setEventListeners();
const userInfo = new UserInfo(userInfoSelectors);

const cardList = new Section({
    renderer: (item, containForCards, name, id) => {
        const card = createCard(item, templateSelector, item.likes.length, name, id, item._id);
        containForCards.append(card);
    }, 
},elements);

Promise.all([api.getCard(), api.getInfo()])
    .then(values =>{
        cardList.renderItems(values[0], values[1].name, values[1]._id);
        const item = {};
        item.name = values[1].name;
        item.subtitle = values[1].about;
        item.avatar = values[1].avatar;
        userInfo.setUserInfo(item);
        userInfo.setAvatar(item.avatar);
    })
    .catch((err) => {
        console.log(err);
});

function setLikeHandler(id){
    api.setLike(id)
    .catch((err) => {
        console.log(err);
});
}

function deleteLikeHandler(id){
    api.deleteLike(id)
    .catch((err) => {
        console.log(err);
});
}

function openImageHandler(link, name){ 
    popupWithImage.open(link, name);
} 

function saveFormAvatar(evt, link){
    renderLoading(popupAvatarSubmitButton);
    api.editingAvatar(`${link.linkAvatar}`)
        .then(res =>{
            
            userInfo.setAvatar(link.linkAvatar);
            popupWithFormAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(popupAvatarSubmitButton);
        });
}



function saveFormHandler(evt, infoUser){
    evt.preventDefault();
    renderLoading(buttonSave);
    api.editingInfo(infoUser.name, infoUser.subtitle)
        .then(res =>{
            userInfo.setUserInfo(infoUser);
            popupWithFormEdit.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(()=>{
            renderLoading(buttonSave)
        })
}

function createCard(item, templateSelector, countLike, name, id, cardId){
    const addCardDefault = new Card(item, templateSelector, countLike, openImageHandler, openDeleteHandler, setLikeHandler, deleteLikeHandler, name, id, cardId);
    return addCardDefault.initCard();
}

function popupAddButtonDisabled(){
    popupAddSubmitButton.classList.add(validationSettings.inactiveButtonClass);
    popupAddSubmitButton.setAttribute('disabled', 'disabled');
}

function saveFormAddHandler(evt, infoPic){ 
    evt.preventDefault();
    renderLoading(popupAddSubmitButton);
    const item = {}; 
    item.name = infoPic.place;
    item.link = infoPic.link;
    api.postCard(item.name, item.link)
        .then(res =>{
            const card = createCard(res, templateSelector, res.likes.length, res.owner.name, res.owner._id, res._id);
            cardList.addItem(card, elements);
            popupWithFormAdd.close()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() =>{
            renderLoading(popupAddSubmitButton);;
            popupAddButtonDisabled();
        })
    
}

function openDeleteHandler(target){
    popupDelete.open();
    const id = target.closest('.element').id;
    confirmDeleteButton.addEventListener('click', () => {
        renderLoading(confirmDeleteButton);
        api.deleteCard(id)
            .then(res =>{
                cardList.deleteItem(document.getElementById(id))
                popupDelete.close();
                
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(()=>{
                renderLoading(confirmDeleteButton);
            });
    });
}

buttonProfile.addEventListener('click', () => {
    const infoUser = userInfo.getUserInfo();
    profileName.value = infoUser.name;
    porfileProf.value = infoUser.prof;
    formValidatorEdit.hideAllInputsError()
    formValidatorEdit.toggleClassSubmitButton(true);
    popupWithFormEdit.open();

});

buttonAdd.addEventListener('click', () => {
    formValidatorAdd.hideAllInputsError();
    popupWithFormAdd.open();
});

buttonAvatarEdit.addEventListener('click', () =>{
    popupWithFormAvatar.open();
})
