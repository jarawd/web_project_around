export function showPopup(obj) {
  obj.popup.querySelector(".popup__title").textContent = obj.title;
  obj.popup.querySelector(".popup__form-item_name").placeholder =
    obj.placeholder1;
  obj.popup.querySelector(".popup__form-item_info").type = obj.type;
  obj.popup.querySelector(".popup__form-item_info").placeholder =
    obj.placeholder2;
  obj.popup.querySelector(".popup__form-button").textContent = obj.button;
  obj.inputName.setAttribute("minlength", "2");
  obj.inputName.setAttribute("maxlength", "40");
  if (obj.inputInfo) {
    obj.inputInfo.setAttribute("minlength", "2");
    obj.inputInfo.setAttribute("maxlength", "200");
  }
  obj.popup.classList.add("popup__opened");
  obj.page.prepend(obj.popup);
  document.addEventListener("keydown", obj.closeWithEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup__opened");
  popup.querySelector(".popup__form-item_name").value = "";
  popup.querySelector(".popup__form-item_info").value = "";
}
