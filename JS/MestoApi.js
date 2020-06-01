/* Можно лучше: довольно общее название для класса, лучше отразить назначение сервера, например MestoApi */
class MestoApi {
    constructor(options) {
       this.options = options;
      // тело конструктора
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }
  
    getInitialCards() {
        /*
            Можно лучше: здесь и далее, не нужно хардкодить адрес сервера и ключ авторизации в каждом запросе
            Лучше передать их в конструктор и использовать переданные. 
            При этом итоговый адрес запроса собирается из адреса сервера и адреса ендпоинта:
            например fetch(`${this.baseUrl}/cards`
        */
        return fetch(`${this.options.baseUrl}/cards`, { method: 'GET',
        headers: {
          authorization: this.options.headers.authorization
        }
      })
      /*
        Можно лучше: проверка ответа сервера и преобразование из json
        дублируется во всех методах класса Api, лучше вынести в отдельный метод:
            _getResponseData(res) {
                if (!res.ok) {
                    return Promise.reject(`Ошибка: ${res.status}`); 
                }
                return res.json();
            }
        Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
        не используется вне класса Api   
        */
      .then((res) => {
          return this._getResponseData(res)
         /*  if(res.ok){
          return res.json()}
          /* 
            Надо исправить: здесь и далее, в  Promise.reject нужно передать причину по которой отклонен промис
            например  Promise.reject(`Ошибка: ${res.status}`); 
            https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
          
          return Promise.reject; */
      
      })
    }

    getUser(){
        return fetch(`${this.options.baseUrl}/users/me`, { 
            method: 'GET',
            headers: {
            authorization: this.options.headers.authorization
        }
      })
        .then((res) => {
          return this._getResponseData(res)
        })
    };

    /*
        Надо исправить: передаваемые на сервер данные должны передаваться как параметры метода, а не конструктора
        т.е. editUser(name, about)
    */
    editUser(name, about){
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })


        })
        .then((res) => {
            return this._getResponseData(res)
            /* if(res.ok){
            /* 
                Надо исправить: здесь и далее метод должен возвращаться 
                результат res.json(); т.е. return res.json()
                Зачем здесь стрелочная функция res => {return res.json();}  не ясно            
            
               res => {return res.json();}
            }
            return Promise.reject; */
        })
        

    }

    addCard(name, link){
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })


        })
        .then((res) => {
          return this._getResponseData(res)
        })

    } 

    deleteCard(cardId){
        return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization,
             //   'Content-Type': 'application/json'
            },
           // body: JSON.stringify({
           //     cardId
           // })
        })
        .then((res) => {
            return this._getResponseData(res)
          })

    }    
            
};
 
