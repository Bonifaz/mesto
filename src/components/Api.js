export class Api{
    constructor(token, cardAddress, userInfoAddress){
        this._token = token;
        this._cardAddress = cardAddress;
        this._userInfoAddress = userInfoAddress;
    }

    getCard(){
        return fetch(`${this._cardAddress}`, {
            headers: {
                authorization: `${this._token}`
            }})
            .then(res => {
                return this._checkResponse(res);
        })
    }

    getInfo(){
        return fetch(`${this._userInfoAddress}`, {
            headers: {
                authorization: `${this._token}`
            }})
            .then(res =>{
                return this._checkResponse(res);
        })
    }

    editingInfo(name, about){
        return fetch(`${this._userInfoAddress}`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
              })
        })
        .then(res =>{
            return this._checkResponse(res);
        })
    }

    editingAvatar(link){
        return fetch(`${this._userInfoAddress}/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `${link}`
              })
        })
        .then(res =>{
            return this._checkResponse(res);
        });
    }

    postCard(name, link){
        return fetch(`${this._cardAddress}`, {
            method: 'POST',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
        })
        .then(res =>{
            return this._checkResponse(res);
        })
    }

    deleteCard(id){
        return fetch(`${this._cardAddress}/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`
            },
        })
        .then(res =>{
            return this._checkResponse(res);
        })
    }

    setLike(id){
        return fetch(`${this._cardAddress}/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `${this._token}`
            },
        })
        .then(res =>{
            return this._checkResponse(res);
        })
    }

    deleteLike(id){
        return fetch(`${this._cardAddress}/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`
            },
        })
        .then(res =>{
            return this._checkResponse(res);
        })
    }

    _checkResponse(res){
        if(res.ok){
            return res.json()
        }
        else{
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
}