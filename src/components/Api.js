export class Api{
    constructor(token){
        this._token = token;
    }

    getCard(address){
        return fetch(`${address}`, {
        headers: {
            authorization: `${this._token}`
        }})
        .then(res => {
            if(res.ok){
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }) 
        .then(res =>{
            return res;
        })  
        .catch((err) => {
            console.log(err);
        })
    }

    getInfo(address){
        return fetch(`${address}`, {
            headers: {
                authorization: `${this._token}`
            }})
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(res =>{
                return res;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    editingInfo(address, name, about){
        fetch(`${address}`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
              })
        });
    }

    editingAvatar(address, link){
        fetch(`${address}/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `${link}`
              })
        });
    }

    postCard(address, name, link){
        fetch(`${address}`, {
            method: 'POST',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
              })
        });
    }

    deleteCard(address, id){
        fetch(`${address}/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`
            },
        });
    }


}