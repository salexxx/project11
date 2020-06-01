
class Popup  {
  constructor(elem){
     this.elem = elem;
  }

    close(){
      addform.form.reset();
      this.elem.classList.remove('popup_is-opened');
        
      }
    open(){

       this.elem.classList.add('popup_is-opened');
      
      }
    
  }