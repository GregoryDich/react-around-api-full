class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  addLike(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: "PUT",
      headers: this._createHeaders(),
    }).then((res) => this._checkResponse(res));
  }
  removeLike(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: "DELETE",
      headers: this._createHeaders(),
    }).then((res) => this._checkResponse(res));
  }
  editAvatar(values) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._createHeaders(),
      body: JSON.stringify({
        avatar: values.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }
  editProfile(values) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._createHeaders(),
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    }).then((res) => this._checkResponse(res));
  }
  changeLikeCardStatus(isLiked, card) {
    return isLiked ? this.removeLike(card) : this.addLike(card);
  }
  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._createHeaders(),
    }).then((res) => this._checkResponse(res));
  }
  addCard(values) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._createHeaders(),
      body: JSON.stringify({
        name: values.place,
        link: values.url,
      }),
    }).then((res) => this._checkResponse(res));
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._createHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._createHeaders(),
    }).then((res) => this._checkResponse(res));
  }
  _createHeaders() {
    const jwt = localStorage.getItem("jwt");
    return {
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    };
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "https://api.grisha-around.students.nomoredomainssbs.ru",
});

export default api;
