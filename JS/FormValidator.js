class FormValidator {
    constructor(form){
      this.form = form;
      this.button = this.form.querySelector('button');
    }

    
    
    //checkInputValidity
    setSubmitButtonState(input){
      const errElem = input.nextElementSibling;
  if (input.value ==''){ return false}
    if (!input.checkValidity()) {
      if (input.validity.valueMissing) {
        errElem.textContent = errorMessages.valueMissing;
        return false;
      }
      if (input.validity.tooShort) {
        errElem.textContent = errorMessages.tooShort;
        return false;
      }
      if (input.validity.typeMismatch) {
        errElem.textContent = errorMessages.typeMismatch;
        return false;
      }
    }
  
    errElem.textContent = '';
    return true;
    }
  
    checkInputValidity(input){
      if(!this.setSubmitButtonState(input)){
      this.button.setAttribute('disabled', true);
      return false
      } else {this.button.removeAttribute('disabled', true); return true;}
    }
  
    setEventListener(event){
      const inputElements = Array.from(this.form.querySelectorAll('input'));
      this.form.addEventListener('input', ()=>{
        if (inputElements.every((input) => this.checkInputValidity(input))) {
          this.button.removeAttribute('disabled', true);
          } 
      })
      if (!inputElements.every((input) => this.checkInputValidity(input))) {
        this.button.setAttribute('disabled', true);
        } 

    }
  }
  
  