export class PopUp{
    constructor(popUpSelector){
        this.popUpSelector = popUpSelector;
    }

    open(){
        this.popUpSelector.classList.add("pop-up_open");
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
    close(){
        this.popUpSelector.classList.remove("pop-up_open");
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
    _handleEscClose(evt){
        const searchOpenPopUp = document.querySelector('.pop-up_open');
        const escapeButton = 27;
        if(evt.which === escapeButton){
            closePopUp(searchOpenPopUp);
        }  
    }
    setEventListeners(){
        this.popUpSelector.querySelector('.pop-up__cross').addEventListener('click', () => this.close());
    }
}