export default class Api {
  constructor() {
    this._baseUrl = "https://around.nomoreparties.co/v1/web_es_12";
  }

  setProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: "e42f8e22-9ca0-486e-b216-ea9a771afa3a",
      },
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: "e42f8e22-9ca0-486e-b216-ea9a771afa3a",
      },
    });
  }

  getCard(obj) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: "e42f8e22-9ca0-486e-b216-ea9a771afa3a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        link: obj.link,
      }),
    });
  }

  getAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "e42f8e22-9ca0-486e-b216-ea9a771afa3a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: url,
      }),
    });
  }

  getLikes(obj) {
    return fetch(
      `https://around.nomoreparties.co/v1/web_es_12/cards/likes/${obj._id}`,
      {
        method: "PUT",
        headers: {
          authorization: "e42f8e22-9ca0-486e-b216-ea9a771afa3a",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes:
            obj.likes > 0
              ? obj.likes.push({
                  about: obj.owner.about,
                  avatar: obj.owner.avatar,
                  cohort: obj.owner.cohort,
                  name: obj.owner.name,
                  _id: obj.owner._id,
                })
              : {
                  about: obj.owner.about,
                  avatar: obj.owner.avatar,
                  cohort: obj.owner.cohort,
                  name: obj.owner.name,
                  _id: obj.owner._id,
                },
        }),
      }
    );
  }

  getDislikes(obj) {
    return fetch(
      `https://around.nomoreparties.co/v1/web_es_12/cards/likes/${obj._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: "e42f8e22-9ca0-486e-b216-ea9a771afa3a",
          "Content-Type": "application/json",
        },
      }
    );
  }

  deleteCard(obj) {
    return fetch(
      `https://around.nomoreparties.co/v1/web_es_12/cards/${obj._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: "e42f8e22-9ca0-486e-b216-ea9a771afa3a",
          "Content-Type": "application/json",
        },
      }
    );
  }

  setUser(selector) {
    return fetch(`https://around.nomoreparties.co/v1/web_es_12/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "e42f8e22-9ca0-486e-b216-ea9a771afa3a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: selector.querySelector(".popup__form-item_name").value,
        about: selector.querySelector(".popup__form-item_info").value,
      }),
    });
  }
}
