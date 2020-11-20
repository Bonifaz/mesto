

 export class FormValidator {
    constructor(objects, form){
        this._objects = objects;
        this._form = form;
    }

    enableValidation(){
        this._form.addEventListener('submit', function(evt){
            evt.preventDefault();
        });
        this._setAddEventListeners(this._inputs());
    }

    _inputs(){
        const inputsObjects = Array.from(this._form.querySelectorAll(this._objects.inputSelector));
        return inputsObjects;
    }

    _allInputsValid(inputsObjects) {
        const hasInvalidInputs = inputsObjects.some((input) => {
            return !input.validity.valid;
            });
        return !hasInvalidInputs;
    }

    _setAddEventListeners(inputsObjects){
        inputsObjects.forEach(input => {
            input.addEventListener('input',() => this._validForms(inputsObjects, input));
        });
    }

    _validForms(inputsObjects, input){
        const retValue = this._allInputsValid(inputsObjects);
                this._toggleClassSubmitButton(retValue);
                if (input.validity.valid) {
                    this._hideInputError(input);
                } else {
                    this._showInputError(input);
                }
    }

    _hideInputError(input){
        input.classList.remove('pop-up__input_type_error');
        const inputObjectsError = this._form.querySelector(`#${input.id}-error`);
        inputObjectsError.classList.remove('pop-up__error_visible');
        inputObjectsError.textContent = '';
    }  
    
    
    _showInputError(input){
        input.classList.add('pop-up__input_type_error');
        const inputObjectsError = this._form.querySelector(`#${input.id}-error`);
        inputObjectsError.textContent = input.validationMessage;
        inputObjectsError.classList.add('pop-up__error_visible');
    } 

    

    _toggleClassSubmitButton(isValidForm){
        const buttonValid = this._form.querySelector(this._objects.submitButtonSelector);
        if(isValidForm){
            buttonValid.classList.remove('pop-up__button_disabled');
            buttonValid.removeAttribute('disabled', 'disabled');
        } else {
            buttonValid.classList.add('pop-up__button_disabled');
            buttonValid.setAttribute('disabled', 'disabled');
        }
    }
}

