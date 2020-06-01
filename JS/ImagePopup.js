class ImagePopup{
  constructor(event){
    this.event = event;
  }
  
  
    close(event){
      document.querySelector('.imgpopup__close').removeEventListener;
      this.event.classList.remove('popup_is-opened');
    }
  
    open(event){
      this.event.querySelector('.imgpopup__source').setAttribute('src', event.dataset.url);
      this.event.classList.add('popup_is-opened');
      document.querySelector('.imgpopup__close').addEventListener('click', ()=>{
        this.close(event);
      })
   }
  }