import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ data, setData }, popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._data = data;
    this._setData = setData;
  }

  open() {
    this._setForm();
    this.setEventListeners();
    super.open(this._popupSelector);
  }

  close() {
    this._resetForm();
    super.close();
  }

  _setForm() {
    if (this._data.values) {
      this._popupSelector.querySelector(".popup__form-item_name").value =
        this._setData().getUserInfo().name;

      this._popupSelector.querySelector(".popup__form-item_info").value =
        this._setData().getUserInfo().job;
    }

    if (this._data.inputInfo) {
      this._popupSelector
        .querySelector(".popup__form-item_info")
        .setAttribute("minlength", "2");
      this._popupSelector
        .querySelector(".popup__form-item_info")
        .setAttribute("maxlength", "200");
    }

    this._popupSelector.querySelector(".popup__title").textContent =
      this._data.title;
    this._popupSelector.querySelector(".popup__form-item_name").placeholder =
      this._data.placeholder1;
    this._popupSelector.querySelector(".popup__form-item_info").placeholder =
      this._data.placeholder2;
    this._popupSelector.querySelector(".popup__form-item_info").type =
      this._data.type;
    this._popupSelector.querySelector(".popup__form-button").textContent =
      this._data.buttonName;

    this._popupSelector
      .querySelector(".popup__form-item_name")
      .setAttribute("minlength", "2");
    this._popupSelector
      .querySelector(".popup__form-item_name")
      .setAttribute("maxlength", "40");
    this._popupSelector.classList.add("popup__opened");
  }

  _getInputValues() {
    return {
      name: this._popupSelector.querySelector(".popup__form-item_name").value,
      link: this._popupSelector.querySelector(".popup__form-item_info").value,
    };
  }

  _resetForm() {
    const spanList = this._popupSelector.querySelectorAll(".popup__span-error");
    spanList.forEach((el) => {
      el.textContent = "";
    });
    const inputList = this._popupSelector.querySelectorAll(".popup__form-item");
    inputList.forEach((el) => {
      el.classList.remove("popup__form-item_invalid");
      if (this._data.resetInputs) {
        el.value = "";
      }
    });
  }

  setEventListeners() {
    this._popupSelector
      .querySelector(".popup__form")
      .addEventListener("submit", () => {
        if (this._data.values) {
          this._setData().setUserInfo();
        } else {
          this._setData(this._getInputValues());
        }
        this.close();
      });

    this._popupSelector
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });

    document.addEventListener("click", (e) => {
      if (e.target === this._popupSelector) {
        this.close();
      }
    });

    super.setEventListeners();
  }
}
