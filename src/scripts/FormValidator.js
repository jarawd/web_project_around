export default class FormValidator {
  constructor(data, formSelector) {
    this._inputErrorClass = data.inputErrorClass;
    this._submitButton = data.submitButtonSelector;
    this._inactiveButton = data.inactiveButtonClass;
    this._form = formSelector;
  }

  _showInputError(input, errorMessage) {
    input.classList.add(this._inputErrorClass);
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.textContent = "";
  }

  _validityInput(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _validityAllInputs(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButton(inputList) {
    if (!this._validityAllInputs(inputList)) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButton);
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButton);
    }
  }

  enableValidation = () => {
    const inputList = Array.from(
      this._form.querySelectorAll(".popup__form-item")
    );
    this._toggleButton(inputList);
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    inputList.forEach((el) => {
      el.addEventListener("input", () => {
        this._validityInput(el);
        this._toggleButton(inputList);
      });
    });
  };
}
