 export default class MestoApi {
    constructor(options) {
       this.options = options;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }
  
    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, { method: 'GET',
        headers: {
          authorization: this.options.headers.authorization
        }
      })
      .then((res) => {
          return this._getResponseData(res)
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
            },
        })
        .then((res) => {
            return this._getResponseData(res)
          })

    }    
            
};
 
