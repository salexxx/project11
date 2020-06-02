 export default class Card {
    constructor (name, link, likes, elemownerId, elemId, userId, api){
      this.name = name;
      this.link = link;
      this.likes = likes;
      this.elemownerId = elemownerId;
      this.elemId = elemId;
      this.userId = userId;
      this.api = api;
      this.remove = this.remove.bind(this);
      this.like = this.like.bind(this);
    }
    create(){
  /*  // Прочитайте на досуге вот про такие удобные вещи
    // https://developer.mozilla.org/ru/docs/Web/HTML/Element/template -- шиблон
    // https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment -- контейнер без лишних оберток
    // очень выручают когда нужно создавать много похожих объектов
    // будет здорово если попробуете реализовать, там реально 4-5 строк кода */

    const placeCard = document.createElement('div');
    const placecardImage = document.createElement('div');
    const placecardDescription = document.createElement('div');
    const placecardLikeArea = document.createElement('div')
    const placecardbuttonDelete = document.createElement('button');
    const placecardbuttonLike = document.createElement('button');
    const placecardLikeQuantity = document.createElement('span')
    const placecardName = document.createElement('h3');

    placeCard.classList.add('place-card');
    placecardImage.classList.add('place-card__image');
    placecardImage.style.backgroundImage = `url(${this.link})`;
    placecardImage.dataset.url = this.link;
    placecardbuttonDelete.classList.add('place-card__delete-icon');
    placecardDescription.classList.add('place-card__description');
    placecardName.classList.add('place-card__nam');
    placecardName.textContent = this.name;
    placecardbuttonLike.classList.add('place-card__like-icon');
    placecardLikeQuantity.classList.add('place-card__like-icon-quantity');
    placecardLikeQuantity.textContent = this.likes;
    placecardLikeArea.classList.add('place-card__like-area');
    placecardImage.appendChild(placecardbuttonDelete);
    placecardDescription.appendChild(placecardName);
    placecardDescription.appendChild(placecardLikeArea);
    placecardLikeArea.appendChild(placecardbuttonLike);
    placecardLikeArea.appendChild(placecardLikeQuantity);
    placeCard.appendChild(placecardImage);
    placeCard.appendChild(placecardDescription);
/*
    this._element = `<div class="place-card">
    <div class="place-card__image" style="background: url(${this.link})">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name">${this.name}</h3>
      <button class="place-card__like-icon"></button>
    </div>
  </div>`
return this._element; */
    this.placeCardElement = placeCard;
    this.setEventListener();

    return placeCard;
  }
    setEventListener(){
        this
        .placeCardElement
        .querySelector('.place-card__like-icon')
        .addEventListener('click', this.like);

        if (this.elemownerId === this.userId){ 
         // debugger;       
        this
        .placeCardElement
        .querySelector('.place-card__delete-icon')
        .style
        .display = 'block';
        
        this
        .placeCardElement
        .querySelector('.place-card__delete-icon')
        .addEventListener('click', this.remove);
        }
    }

    like(event){
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(event){
      if(window.confirm('Вы действительно хотите удалить карточку?')){
        this.api.deleteCard(this.elemId);
        this.placeCardElement.querySelector('.place-card__like-icon').removeEventListener("click", this.like);
        event.target.removeEventListener("click", this.remove);
        event.target.closest('.place-card').remove();
      }

    }
  }