
import {openImageHandler} from '../pages/index.js';


export class Card {
    constructor(item, templateSelector){
        this._item = item;
        this._templateSelector = templateSelector;
        this.openImageHandler = openImageHandler;
    }

    _getTemplate(){
        return this._templateSelector.content.cloneNode(true); 
    }

    initCard(){
        const templateCopy = this._getTemplate();
        const buttonHeart = templateCopy.querySelector('.element__heart'); 
        const buttonDeleteCard = templateCopy.querySelector('.element__delete');
        const openImageButton = templateCopy.querySelector('.element__image'); 
        openImageButton.src = this._item.link; 
        templateCopy.querySelector('.element__title').textContent = this._item.name;
        buttonDeleteCard.addEventListener('click',() => this.deleteCardHandler(buttonDeleteCard)); 
        buttonHeart.addEventListener('click',() => this.buttonHeartActiveHandler(buttonHeart)); 
        openImageButton.addEventListener('click',() => this.openImageHandler(this._item.link, this._item.name));
        return templateCopy;
    }

    deleteCardHandler(buttonDeleteCard){ 
        const deleteCardClass = buttonDeleteCard.closest('.element'); 
        deleteCardClass.remove(); 
    } 

    buttonHeartActiveHandler(buttonHeart){ 
        buttonHeart.classList.toggle("element__heart_active"); 
    } 

}