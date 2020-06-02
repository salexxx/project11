import Card from '../JS/Card.js';
import CardList from '../JS/CardList.js';
import FormValidator from '../JS/FormValidator.js';
import Popup from '../JS/Popup.js';
import ImagePopup from '../JS/ImagePopup.js';
import MestoApi from '../JS/MestoApi.js';
import UserInfo from '../JS/UserInfo.js';
import UserPopup from '../JS/UserPopup.js';



//import "../pages/index.css";

const userinfoButton = document.querySelector('.user-info__button');
const userEditButton = document.querySelector('.user-info__edit-button');
const popupclose = document.querySelector('.popup__close');
const userpopupclose = document.querySelector('.userpopup__close');
const imgpopupclose = document.querySelector('.imgpopup__close');

const errorMessages = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
}

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
const api = new MestoApi({
  baseUrl: 'https://praktikum.tk/cohort10',
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
  console.log(res);
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

/*  +  */
userinfoButton.addEventListener('click', () => {
  formElem.reset(); //REVIEW3
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


/*  Edit */
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


/*
  REVIEW По 9 проектной работе

  Все необходимые по заданию запросы к серверу выполняются, отлично, что сделан так же запрос добавления карточки
  Но есть несколько замечаний:

  Надо исправить: 
  - не нужно для каждого обращения к серверу создавать отдельный экземпляр класса Api. 
  В конструктор класса должны передаваться только параметры сервера, а все
  передаваемые данные должны передаваться как параметры методов
  OK
  
  - передаваемые на сервер данные должны передаваться как параметры метода, а не конструктора класса Api
  OK

  - из методов должен возвращаться результат res.json(); т.е. return res.json()
    Зачем в некоторых местах стрелочная функция res => {return res.json();}  не ясно
  OK
  - у запросов addCard и editUser так же нужна обработка ошибок блоком catch       
  OK
  
  Можно лучше: 
  - не нужно хардкодить адрес сервера и ключ авторизации в каждом запросе
  они должны передаваться в конструктор класса
  OK

  - в Promise.reject нужно передать причину по которой отклонен промис
  OK

  - проверка ответа сервера и преобразование из json
    дублируется во всех методах класса Api, лучше вынести в отдельный метод
  OK

  - при запросах addCard и editUser в ответ на отправку данных сервер возвращает обновленные данные, нужно использовать их
  OK  
  - к файлам классов не принято добавлять префикс class, это лишнее
 OK
  - содержимое файла myScript.js лучше оставить в script.js

  - все обработчики лучше вешать однотипно через addEventListener,
  т.е. на кнопки formElem и userElem так же вешать через addEventListener

  - когда код расположен в разных файлах, его нужно 
	заключать в модули, т.к. если файлов будет много, то в разных 
	файлах могут появится функции или переменные с одинаковыми именами,
	они будут переопределять друг друга. Модуль должен предоставлять
	наружу только минимально необходимый api
	Для создании модулей можно воспользоваться IIFE, подробнее:
	https://learn.javascript.ru/closures-module
	https://habr.com/ru/company/ruvds/blog/419997/ 
	Нужно обернуть в IIFE как минимум содержимое файла script.js


*/










/* REVIEW. Резюме.

В целом работа произвела хорошее впечатление - грамотно передаются экземпляры класса Card в метод класса cardlist, правильно добавляются
на элементы обработчики событий лайка и удаления карточки, код на классы разбит логично.

Но, при запуске проекта с целью проверки правильности работы его функционала, выявились досадные и очевидные ошибки.

Поэтому, надо исправить прежде всего (потом, возможно, выявятся ещё ошибки):

I. По форме добавления новой карточки.

  1.  Поскольку дополнительный пункт - полная валидация формы ввода новой карточки, не отлажен и не соответствует
  всем его требованиям (не все сообщения об ошибках высвечиваются правильно), к следующей проверке необходимо сделать минимальную(но правильную) валидацию
  формы карточки: нужно сделать так, чтобы кнопка сабмита этой формы была заблокирована, если хотя бы одно из полей форм пустое, и была разблокирована, если
  в обоих полях есть какая-то информация, то есть оба поля непустые. Сообщения об ошибках высвечиваться на этой форме не должны и кнопка сабмита при
  активации менять цвет не должна.
  ИСПРАВЛЕНО ... кроме кнопки

  2. Сейчас форма карточки не исчезает с экрана после сабмита - надо это исправить.
   ИСПРАВЛЕНО

  3. При открытии формы добавления новой карточки в её полях не должно быть никакой информации, поэтому в слушателе открытия этой формы
  надо вызывать метод reset().
  ИСПРАВЛЕНО

  4. Форме добавления новой карточки в index.html нужно присвоить атрибут novalidate и убрать у полей атрибуты required, чтобы не высвечивались системные
  сообщения об ошибках - это обязательное требование по новому чек-листу, да и просто некрасиво они высвечиваются.
  ИСПРАВЛЕНО


II. По форме профиля.

  1. Не выполнен обязательный пункт - в значения полей формы профиля при её открытии должна вноситься информация
  из DOM-элементов страницы, где она хранится, сейчас этого не происходит. Перенос удобно сделать в самом начале слушателя события 'click' открытия
  формы профиля и, я думаю, Вы для этого можете использовать метод класса UserInfo setUserInfo (подумайте, Вы лучше знаете свой код).
  ИСПРАВЛЕНО

  2. И, поскольку информация со страницы всегда валидна, при открытии формы профиля пользователю у неё всегда должен быть валидный вид, то есть
  на форме не должны присутствовать сообщения об ошибках и кнопка "Сохранить" должна быть доступна и чёрного цвета.
  Поэтому, в слушателе события открытия формы профиля надо убрать с формы все сообщения об ошибках и сделать доступной
  кнопку "Сохранить".  Как Вы это сделаете, остаётся на Ваше усмотрение, но наиболее красивый способ - вызывать в слушателе события открытия формы профиля
  функции валидации, которые уберут сообщения об ошибках и сделают кнопку "Сохранить" доступной и чёрного цвета.

  3. Сейчас форма профиля не исчезает с экрана после сабмита - надо это исправить.
  ИСПРАВЛЕНО

  4. Форме профиля в index.html нужно присвоить атрибут novalidate и убрать у полей атрибуты required, чтобы не высвечивались системные
  сообщения об ошибках - это обязательное требование по новому чек-листу.
  ИСПРАВЛЕНО


III. Нужно удалять обработчики событий лайка и удаления карточки при удалении этой карточки (обязательное требование по чек-листу), то есть
    в методе remove карточки перед её фактическим удалением  надо делать удаление её событий с помощью removeEventListener, об removeEventListener
    можно почитать здесь https://learn.javascript.ru/introduction-browser-events.
  ИСПРАВЛЕНО

IV. Все файлы с расширением js должны быть занесены в отдельную папку в корне проекта.

V. Проверьте работоспособность функционала валидации форм проекта после внесения изменений, необходимо, чтобы весь этот функционал работал правильно.


______________________________________________________________________________________________________________________________________________________

REVIEW2. Резюме2.

Сейчас почти весь функционал работает правильно.

Что нужно ещё доисправить.

1. Правильно удалить обработчики событий лайка и удаления карточки (подробный комментарий в файле класса Card).
Интересную статью об очистке памяти от неиспользуемых сущностей в JS (в связи с требованием удаления обработчиков событий) можно почитать
здесь https://habr.com/en/post/309318/.
ИСПРАВЛЕНО

2. Делать кнопку сабмита  активной и чёрного цвета в слушателе открытия формы профиля. В программировании в одинаковых
случаях все функции должны работать одинаково, поэтому, если на форме содержится валидная информация, кнопка сабмита должна
быть доступна во всех ситуациях, как ей и положено.
ИСПРАВЛЕНО



REVIEW3. Резюме3.

Критические ошибки исправлены.


1.Вы добавляете слушатели событий сабмита форм с помощью атрибута onsubmit, хотя в требованиях к стилю кода js указывается,
что добавление обработчиков событий во всём проекте должно осуществляться одним способом - если с помощью addEventListener,
то нужно везде с помощью addEventListener.

2. Слушателю сабмита, я думаю, не имеет смысла задавать атрибут async, так как я не знаю, в каких случаях нужен async без оператора await, который
 приостанавливает выполнение асинхронной функции до получения ответа (от сервера, например), а в 8-м задании никакого ответа ожидать не надо.

3. В слушателе открытия формы карточки надо делать её reset (требование 6-го задания).

4. Если Вы делаете полную валидацию формы карточки (доп. задание в 7), то в слушателе её открытия нужно так же как и в с слушателе открытия
формы профиля, убирать сообщения об ошибках.

Задание принято.
Желаю успехов в дальнейшем получении знаний!

*/
