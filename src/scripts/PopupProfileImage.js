import Popup from "./Popup";

export default class PopupProfileImage extends Popup {
  constructor(popupSelector, { modifyAvatar }) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._modifyAvatar = modifyAvatar;
    this.buttonName = this._popupSelector.querySelector(
      ".popup-profile__button"
    );
  }

  open() {
    this._popupSelector.classList.add("popup__opened");
    this._setEventListeners();
    super.open(this._popupSelector);
  }

  close() {
    this._resetForm();
    super.close();
  }

  _resetForm() {
    const span = this._popupSelector.querySelector(
      ".popup-profile__span-error"
    );
    span.textContent = "";
    const input = this._popupSelector.querySelector(
      ".popup-profile__form-item"
    );
    input.classList.remove("popup__form-item_invalid");
    input.value = "";
    this.buttonName.textContent = "Guardar";
  }

  _setEventListeners() {
    this._popupSelector
      .querySelector(".popup-profile__close")
      .addEventListener("click", () => {
        this.close();
      });

    this._popupSelector
      .querySelector(".popup-profile__button")
      .addEventListener("click", (e) => {
        this._modifyAvatar();
      });

    super.setEventListeners();
  }
}
