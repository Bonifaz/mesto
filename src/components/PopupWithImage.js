import {Popup} from './Popup.js';
export class PopupWithImage extends Popup{
    open(src, title){
        const popUpImage = this.popUpSelector;
        const image = popUpImage.querySelector('.pop-up__image');
        image.src = src;
        image.alt = title;
        popUpImage.querySelector('.pop-up__bottom-title').textContent = title;
        super.open();
    }
}