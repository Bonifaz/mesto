import {PopUp} from './PopUp.js';
import {saveFormHandler, saveFormAddHandler} from './index.js'
export class PopupWithForm extends PopUp{
    constructor(popUpSelector, submitSelector){
        super(popUpSelector);
        this.submitSelector = submitSelector;
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
        if(this.popUpSelector.classList.contains('pop-up_edit')){
            this.popUpSelector.querySelector('.pop-up__form').addEventListener('submit', (evt) => saveFormHandler(evt, this._getInputValues()));
        }
        if(this.popUpSelector.classList.contains('pop-up_add')){
            this.popUpSelector.querySelector('.pop-up__form').addEventListener('submit',  (evt) => saveFormAddHandler(evt, this._getInputValues()));
        }
    }
    close(){
        const resetinput = Array.from(this.popUpSelector.querySelectorAll('.pop-up__item'));
        resetinput.forEach(item =>{
            item.value = '';
        });
        super.close();
    }
}