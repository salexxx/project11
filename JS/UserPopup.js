
export default class UserPopup  {
    constructor(elem){
       this.elem = elem;
    }
  
      close(){
        
        this.elem.classList.remove('popup_is-opened');
          
        }
      open(){
  
         this.elem.classList.add('popup_is-opened');
        }
      
    }