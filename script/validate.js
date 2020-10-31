const objects = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__item',
    submitButtonSelector: '.pop-up__button',
    inactiveButtonClass: 'pop-up__button_disabled',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__error_visible'
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){
    const formsObjects = Array.from(document.querySelectorAll(formSelector));
    formsObjects.forEach(form => {
        form.addEventListener('submit', function(evt){
            evt.preventDefault();
        });
        setAddEventListeners(inputs(form, inputSelector), form);
    }); 
}

function inputs(form, inputSelector){
    const inputsObjects = Array.from(form.querySelectorAll(inputSelector));
    return inputsObjects;
}

function setAddEventListeners(inputsObjects, form){
    inputsObjects.forEach(input => {
        input.addEventListener('input', function (evt){
            toggleClassSubmitButton(allFormsValid(inputsObjects), form);
            if (input.validity.valid) {
                hideInputError(input, form);
            } else {
                showInputError(input, form);
            }
        });
    });
}

function hideInputError(input, form){
    input.classList.remove('pop-up__input_type_error');
    const inputObjectsError = form.querySelector(`#${input.id}-error`);
    inputObjectsError.classList.remove('pop-up__error_visible');
    inputObjectsError.textContent = '';
}  


function showInputError(input, form){
    input.classList.add('pop-up__input_type_error');
    const inputObjectsError = form.querySelector(`#${input.id}-error`);
    inputObjectsError.textContent = input.validationMessage;
    inputObjectsError.classList.add('pop-up__error_visible');
}  

function allFormsValid (inputsObjects) {
    const formsValid = inputsObjects.some((input) => {
        return !input.validity.valid;
        })
    return !formsValid;
}

function toggleClassSubmitButton(isValidForm, form){
    const buttonValid = form.querySelector(objects.submitButtonSelector);
    
    if(isValidForm){
        buttonValid.classList.remove('pop-up__button_disabled');
        buttonValid.removeAttribute('disabled', 'disabled');
    } else {
        buttonValid.classList.add('pop-up__button_disabled');
        buttonValid.setAttribute('disabled', 'disabled');
    }
}

enableValidation(objects);

