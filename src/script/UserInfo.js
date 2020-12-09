

export class UserInfo{
    constructor(userInfoSelectors){
        this.userInfoSelectors = userInfoSelectors;
    }
    
    getUserInfo(){
        const userInfoObj = {
            name: document.querySelector(this.userInfoSelectors.name).textContent,
            prof: document.querySelector(this.userInfoSelectors.prof).textContent
        }
        return userInfoObj;
    }

    setUserInfo(infoUser){
        document.querySelector(this.userInfoSelectors.name).textContent = infoUser[0]; 
        document.querySelector(this.userInfoSelectors.prof).textContent = infoUser[1];
    }
}