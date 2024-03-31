export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._card.querySelector(".elements__img").src = this._link;
    this._card.querySelector(".elements__img").alt = this._name;
    this._card.querySelector(".elements__title").textContent = this._name;
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
  }
}
