export class UserInfo{
    constructor(userInfoSelectors){
        this.userInfoSelectors = userInfoSelectors;
        this._userName = document.querySelector(this.userInfoSelectors.name);
        this._userProf = document.querySelector(this.userInfoSelectors.prof);
        this._userAvatar = document.querySelector(this.userInfoSelectors.avatar);
    }
    
    getUserInfo(){
        const userInfoObj = {
            name: this._userName.textContent,
            prof: this._userProf.textContent
        }
        return userInfoObj;
    }

    setUserInfo(infoUser){
        this._userName.textContent = infoUser[0]; 
        this._userProf.textContent = infoUser[1];
    }

    setAvatar(link){
        this._userAvatar.src=link;
    }
}