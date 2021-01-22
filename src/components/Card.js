export class Card {
    constructor(item, templateSelector, openImageHandler, openDeleteHandler, likes){
        this._item = item;
        this._likes = likes;
        this._templateSelector = templateSelector;
        this.openImageHandler = openImageHandler;
        this.openDeleteHandler = openDeleteHandler;
        this._templateCopy = this._getTemplate();
        this._imageCard = this._templateCopy.querySelector('.element__image');
        this._titleCard = this._templateCopy.querySelector('.element__title');
        this._counterLike = this._templateCopy.querySelector('.element__counter');
        this._buttonDeleteCard = this._templateCopy.querySelector('.element__delete');
        this._buttonHeart = this._templateCopy.querySelector('.element__heart');
    }

    _getTemplate(){
        return this._templateSelector.content.cloneNode(true); 
    }

    initCard(){
        this._imageCard.src = this._item.link; 
        this._titleCard.textContent = this._item.name;
        this._counterLike.textContent = this._likes;
        this._setEventListeners();
        return this._templateCopy;
    }

    _setEventListeners(){
        this._buttonDeleteCard.addEventListener('click',(evt) => this.openDeleteHandler(evt.target)); 
        this._buttonHeart.addEventListener('click',(evt) => this.buttonHeartActiveHandler(this._buttonHeart, evt)); 
        this._imageCard.addEventListener('click',() => this.openImageHandler(this._item.link, this._item.name));
    }

    deleteCardHandler(buttonDeleteCard){ 
        const deleteCardClass = buttonDeleteCard.closest('.element'); 
        deleteCardClass.remove(); 
    } 

    buttonHeartActiveHandler(buttonHeart, evt){ 
        buttonHeart.classList.toggle("element__heart_active");
        const id = evt.target.closest('.element').id;
        if(buttonHeart.classList.contains('element__heart_active')){
            fetch(`https://mesto.nomoreparties.co/v1/cohort-19/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: `b38e7e87-f50b-4971-8f98-b921d67a88e2`
                },
            });
        }
        else{
            fetch(`https://mesto.nomoreparties.co/v1/cohort-19/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `b38e7e87-f50b-4971-8f98-b921d67a88e2`
                },
            });
        }
    } 

}