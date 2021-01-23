import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{
    constructor(popUpSelector, popupSubmitHandler){
        super(popUpSelector);
        this.popupSubmitHandler = popupSubmitHandler;
        
    }
    _getInputValues(){
        const inputList = Array.from(this.popUpSelector.querySelectorAll('.pop-up__item'));
        const elInputoInformo = {};
        for(let i=0; i<inputList.length; i++){
            elInputoInformo[i] = inputList[i].value;
        }
        return elInputoInformo;
    }
    setEventListeners(){
        super.setEventListeners();
        this.popUpSelector.querySelector('.pop-up__form').addEventListener('submit',  (evt) => this.popupSubmitHandler(evt, this._getInputValues()));
    }
    close(){
        this.popUpSelector.querySelector('form').reset();
        super.close();
    }
}