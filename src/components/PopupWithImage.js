import {PopUp} from './PopUp.js';
export class PopupWithImage extends PopUp{
    open(src, title){
        const popUpImage = this.popUpSelector;
        popUpImage.querySelector('.pop-up__image').src = src;
        popUpImage.querySelector('.pop-up__image').alt = title;
        popUpImage.querySelector('.pop-up__bottom-title').textContent = title;

        super.open();
    }
}