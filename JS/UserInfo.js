
 export default class UserInfo {
    constructor(name, occupation){
     this.name = name;
      this.occupation = occupation;
    }
   
    updateUserInfo(name, occupation){
     document.querySelector('.user-info__name').textContent = name;
     document.querySelector('.user-info__job').textContent = occupation;
   }
   
   setUserInfo(){
     this.name = document.querySelector('.user-info__name').textContent;
     this.occupation = document.querySelector('.user-info__job').textContent;
   }
   }
   