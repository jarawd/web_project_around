import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, target) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._target = target;
  }

  open() {
    this._popupSelector.querySelector(".image-container__img").src =
      this._target.src;
    this._popupSelector.querySelector(".image-container__img").alt =
      this._target.alt;
    this._popupSelector.querySelector(".image-container__title").textContent =
      this._target.alt;
    this.setEventListeners();
    super.open(this._popupSelector);
  }

  setEventListeners() {
    this._popupSelector
      .querySelector(".image-container__close")
      .addEventListener("click", () => {
        super.close();
      });

    document.addEventListener("click", (e) => {
      if (e.target === this._popupSelector) {
        super.close();
      }
    });
    super.setEventListeners();
  }
}
