export class Card {
    constructor(item, templateSelector, countLike, openImageHandler, openDeleteHandler, setLike, deleteLike, userName, userId, cardId){
        this._item = item;
        this._templateSelector = templateSelector;
        this.openImageHandler = openImageHandler;
        this.openDeleteHandler = openDeleteHandler;
        this._templateCopy = this._getTemplate();
        this._countLike = countLike;
        this._imageCard = this._templateCopy.querySelector('.element__image');
        this._titleCard = this._templateCopy.querySelector('.element__title');
        this._counterLike = this._templateCopy.querySelector('.element__counter');
        this._buttonDeleteCard = this._templateCopy.querySelector('.element__delete');
        this._buttonHeart = this._templateCopy.querySelector('.element__heart');
        this._setLike = setLike;
        this._deleteLike = deleteLike;
        this._userName = userName;
        this._userId = userId;
        this._cardId = cardId;
    }

    _getTemplate(){
        return this._templateSelector.content.cloneNode(true); 
    }

    initCard(){
        this._imageCard.src = this._item.link; 
        this._titleCard.textContent = this._item.name;
        this._item.likes.forEach(likeInfo =>{
            if(likeInfo.name === this._userName){
                this._buttonHeart.classList.add('element__heart_active');
            }
        });
        if(this._item.owner._id != `${this._userId}`){
            this._buttonDeleteCard.remove();
        }
        this._counterLike.textContent = this._countLike;
        this._templateCopy.querySelector('.element').setAttribute('ID', `${this._cardId}`);
        this._setEventListeners();
        return this._templateCopy;
    }

    _setEventListeners(){
        this._buttonDeleteCard.addEventListener('click',(evt) => this.openDeleteHandler(evt.target)); 
        this._buttonHeart.addEventListener('click',(evt) => this.buttonHeartActiveHandler(this._buttonHeart, this._counterLike, evt)); 
        this._imageCard.addEventListener('click',() => this.openImageHandler(this._item.link, this._item.name));
    }

    deleteCardHandler(buttonDeleteCard){ 
        const deleteCardClass = buttonDeleteCard.closest('.element'); 
        deleteCardClass.remove();
    }

    buttonHeartActiveHandler(buttonHeart, counterLike, evt){ 
        buttonHeart.classList.toggle("element__heart_active");
        const id = evt.target.closest('.element').id;
        if(buttonHeart.classList.contains('element__heart_active')){
            this._setLike(id);
            counterLike.textContent = Number(counterLike.textContent) + 1;
        }
        else{
            this._deleteLike(id);
            counterLike.textContent = Number(counterLike.textContent) - 1;
        }
    } 

}