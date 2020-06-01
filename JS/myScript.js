formElem.onsubmit = (e) => {
    e.preventDefault();
    /*
        Надо исправить: не нужно для каждого обращения к серверу создавать отдельный экземпляр класса Api. 
        В конструктор класса должны передаваться только параметры сервера, а все
        передаваемые данные должны передаваться как параметры методов
        OK
    */
   //const api = new Api({name: e.target.elements.name.value, link: e.target.elements.link.value});
   api.addCard(e.target.elements.name.value, e.target.elements.link.value)
    .then((res) =>{
        
        /* Можно лучше: в ответ на отправку данных сервер возвращает обновленные данные, 
           нужно использовать их 
        OK 
           */
        const newcard = new Card(res.name, res.link)
        cardlist.addCard(newcard.create());
        popup.close();  
    })
    .catch((err) => console.log(err)) 
    /* 
        Надо исправить: не хватает обработки ошибок. В конце цепочки обработки промиса 
        должен быть блок catch обрабатывающий ошибку в случае если запрос на сервер выполнится 
        неудачно. Пример обработчки ошибок есть в конце задания. Сейчас достаточно вывести ошибку
        в консоль, но на реальном проекте лучше всетаки сообщить об этом пользователю
        OK
   
        */	
}

userElem.onsubmit = (e) => {
    e.preventDefault();
    //const api = new Api({name: e.target.elements.name.value, 
    //                     about: e.target.elements.occupation.value})
    api.editUser(e.target.elements.name.value, e.target.elements.occupation.value)
    .then((res)=> {
        /* Можно лучше: в ответ на отправку данных сервер возвращает обновленные данные, 
           нужно использовать их 
         OK 
           */
        userinfo.updateUserInfo(res.name, res.about)
        userpopup.close();
    })
    .catch((err) => console.log(err))
    /* 
        Надо исправить: не хватает обработки ошибок. В конце цепочки обработки промиса 
        должен быть блок catch обрабатывающий ошибку в случае если запрос на сервер выполнится 
        неудачно. Пример обработчки ошибок есть в конце задания. Сейчас достаточно вывести ошибку
        в консоль, но на реальном проекте лучше всетаки сообщить об этом пользователю
        OK
    */	
}