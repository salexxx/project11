
 export default class CardList {
    constructor(container, cardsArray){
      this.container = container;
      this.cardsArray = cardsArray;
    }
    
    addCard(cardElement){
      this.container.appendChild(cardElement);
      this.cardsArray.push(cardElement);
    }
  
    render(cardsArray){
          cardsArray.forEach((elem) =>  {
          this.addCard(elem);
        });
    }
  }