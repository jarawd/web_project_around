const showInputError = (form, input, errorInput, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(errorInput);
  errorElement.textContent = errorMessage;
};

const hideInputError = (form, input, errorInput) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(errorInput);
  errorElement.textContent = "";
};

const validityInput = (form, input, errorInput) => {
  if (!input.validity.valid) {
    showInputError(form, input, errorInput, input.validationMessage);
  } else {
    hideInputError(form, input, errorInput);
  }
};

const validityAllInputs = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButton = (inputList, btn, enableButton) => {
  if (!validityAllInputs(inputList)) {
    btn.disabled = false;
    btn.classList.remove(enableButton);
  } else {
    btn.disabled = true;
    btn.classList.add(enableButton);
  }
};

export const enableValidation = (obj) => {
  const form = obj.formSelector;
  const inputList = Array.from(form.querySelectorAll(".popup__form-item"));
  toggleButton(inputList, obj.submitButtonSelector, obj.inactiveButtonClass);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  inputList.forEach((el, i, arr) => {
    el.addEventListener("input", () => {
      validityInput(form, el, obj.inputErrorClass);
      toggleButton(
        inputList,
        obj.submitButtonSelector,
        obj.inactiveButtonClass
      );
    });
  });
};
