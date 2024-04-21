import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { card, element, removeCard }) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._card = card;
    this._element = element._card;
    this._removeCard = removeCard;
  }

  open() {
    this._popupSelector.classList.add("popup__opened");
    this._setEventListeners();
    super.open(this._popupSelector);
  }

  _deleteCard() {
    this._removeCard(this._card)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(() => {
        this._element.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners() {
    this._popupSelector
      .querySelector(".popup-confirm__button")
      .addEventListener("click", () => {
        this._deleteCard();
        super.close();
      });

    this._popupSelector
      .querySelector(".popup-confirm__close")
      .addEventListener("click", () => {
        super.close();
      });

    super.setEventListeners();
  }
}
