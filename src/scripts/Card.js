export default class Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick, handleCardClose, likes, dislikes, obj }
  ) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardClose = handleCardClose;
    this._likes = likes;
    this._dislikes = dislikes;
    this._obj = obj;
  }

  _getTemplate() {
    this._cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return this._cardTemplate;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector(".elements__img").src = this._data.link;
    this._card.querySelector(".elements__img").alt = this._data.name;
    this._card.querySelector(".elements__title").textContent = this._data.name;
    this._card.querySelector(".elements__likes-counter").textContent =
      this._data.likes.length;
    if (this._data.owner._id === "38cc323bf81d67435752af78") {
      const trashIcon = document.createElement("div");
      trashIcon.classList.add("elements__trash");
      this._card.insertAdjacentElement("afterbegin", trashIcon);
    }
    this.setEventListeners();
    return this._card;
  }

  getImage() {
    return this._card.querySelector(".elements__img");
  }

  setEventListeners() {
    this._card.querySelector(".elements__img").addEventListener("click", () => {
      this._handleCardClick();
    });

    this._card
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._card
          .querySelector(".elements__like")
          .classList.toggle("elements__like-fill");
        const likeStatus = this._card
          .querySelector(".elements__like")
          .classList.contains("elements__like-fill");
        if (likeStatus) {
          this._likes(this._obj)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Error: ${res.status}`);
            })
            .then((data) => {
              this._card.querySelector(".elements__likes-counter").textContent =
                data.likes.length;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this._dislikes(this._obj)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Error: ${res.status}`);
            })
            .then((data) => {
              this._card.querySelector(".elements__likes-counter").textContent =
                data.likes.length;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

    if (this._data.owner._id === "38cc323bf81d67435752af78") {
      this._card
        .querySelector(".elements__trash")
        .addEventListener("click", () => {
          this._handleCardClose();
        });
    }
  }
}
