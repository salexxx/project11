
class UserPopup  {
    constructor(elem){
       this.elem = elem;
    }
  
      close(){
        userform.form.reset();
        this.elem.classList.remove('popup_is-opened');
          
        }
      open(){
  
         this.elem.classList.add('popup_is-opened');
         //userform.form.name.value = document.querySelector('.user-info__name').textContent;
         //userform.form.occupation.value = document.querySelector('.user-info__job').textContent;
        }
      
    }