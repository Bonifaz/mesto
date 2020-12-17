export class Card {
    constructor(item, templateSelector, openImageHandler){
        this._item = item;
        this._templateSelector = templateSelector;
        this.openImageHandler = openImageHandler;
        this._templateCopy = this._getTemplate();
        this._imageCard = this._templateCopy.querySelector('.element__image');
        this._titleCard = this._templateCopy.querySelector('.element__title');
        this._buttonDeleteCard = this._templateCopy.querySelector('.element__delete');
        this._buttonHeart = this._templateCopy.querySelector('.element__heart');
    }

    _getTemplate(){
        return this._templateSelector.content.cloneNode(true); 
    }

    initCard(){
        this._imageCard.src = this._item.link; 
        this._titleCard.textContent = this._item.name;
        this._setEventListeners();
        return this._templateCopy;
    }

    _setEventListeners(){
        this._buttonDeleteCard.addEventListener('click',() => this.deleteCardHandler(this._buttonDeleteCard)); 
        this._buttonHeart.addEventListener('click',() => this.buttonHeartActiveHandler(this._buttonHeart)); 
        this._imageCard.addEventListener('click',() => this.openImageHandler(this._item.link, this._item.name));
    }

    deleteCardHandler(buttonDeleteCard){ 
        const deleteCardClass = buttonDeleteCard.closest('.element'); 
        deleteCardClass.remove(); 
    } 

    buttonHeartActiveHandler(buttonHeart){ 
        buttonHeart.classList.toggle("element__heart_active"); 
    } 

}