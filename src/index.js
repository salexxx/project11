import Card from '../JS/Card.js';
import CardList from '../JS/CardList.js';
import FormValidator from '../JS/FormValidator.js';
import Popup from '../JS/Popup.js';
import ImagePopup from '../JS/ImagePopup.js';
import MestoApi from '../JS/MestoApi.js';
import UserInfo from '../JS/UserInfo.js';
import UserPopup from '../JS/UserPopup.js';

import  '../pages/index.css';

const userinfoButton = document.querySelector('.user-info__button');
const userEditButton = document.querySelector('.user-info__edit-button');
const popupclose = document.querySelector('.popup__close');
const userpopupclose = document.querySelector('.userpopup__close');
const imgpopupclose = document.querySelector('.imgpopup__close');


let cardsArray = [];
const card = new Card;
const cardlist = new CardList(document.querySelector('.places-list'), cardsArray);
const popup = new Popup(document.querySelector('.popup'));
const userpopup = new UserPopup(document.querySelector('.userpopup'));
const imgpopup = new ImagePopup(document.querySelector('.imgpopup'));

const userinfo  = new UserInfo(document.querySelector('.user-info__button'));
const addform = new FormValidator(document.querySelector('.popup__form'));
const userform = new FormValidator(document.querySelector('.userpopup__form'));
let userId = '';

const Url = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort10' : 'https://praktikum.tk/cohort10';
const api = new MestoApi({
  baseUrl: Url, 
  headers: {
    authorization: '7ef5077b-99dd-460c-a5bd-17774aa4e016',
    'Content-Type': 'application/json'
  }
});

api.getUser()
.then((res) => {
  userinfo.updateUserInfo(res.name, res.about);
  userId = res._id;
})
.catch((err) => {
  console.log(err)
})

api.getInitialCards()
.then((res) => {

     cardsArray = res.map((elem) => {
     const card = new Card(elem.name, elem.link, elem.likes.length, elem.owner._id, elem._id, userId, api);
     return card.create()})
     cardlist.render(cardsArray)
})
.catch((err) =>{
  console.log(err)
})

cardlist.container.addEventListener('click', ()=>{
  if (event.target.classList.contains('place-card__image')){
  imgpopup.open(event.target);
}
popupclose.addEventListener('click', () => {
  popup.close(event.target);
})
})

userinfoButton.addEventListener('click', () => {
  formElem.reset(); 
  formElem.onsubmit = (e) => {
    e.preventDefault();
    api.addCard(e.target.elements.name.value, e.target.elements.link.value)
    .then((res) =>{
        const newcard = new Card(res.name, res.link, res.likes.length, res.owner._id, res._id, userId, api)
        cardlist.addCard(newcard.create());
        popup.close();  
    })
    .catch((err) => console.log(err)) 
}
  popup.open(popup);
  addform.setEventListener(event);
  popupclose.addEventListener('click', () => {
  document.querySelectorAll('.popup__error-message').forEach(elem => {elem.textContent = ''}); // убрал ошибки при закрытии 
  addform.form.reset();
  popup.close();
  });
});

userEditButton.addEventListener('click', () => {
  userElem.onsubmit = (e) => {
    e.preventDefault();
    api.editUser(e.target.elements.name.value, e.target.elements.occupation.value)
    .then((res)=> {
        userinfo.updateUserInfo(res.name, res.about)
        userpopup.close();
    })
    .catch((err) => console.log(err))
}
  userpopup.open();
  userform.form.name.value = document.querySelector('.user-info__name').textContent;
  userform.form.occupation.value = document.querySelector('.user-info__job').textContent;
  userform.setEventListener(event);

userpopupclose.addEventListener('click', () => {
  userform.form.reset();
  userpopup.close();
});

});

