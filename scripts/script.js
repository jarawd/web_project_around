const content = document.querySelector(".page");
const popupOpen = content.querySelector(".popup");
const addProfile = content.querySelector(".profile__edit");
const popupClose = content.querySelector(".popup__close");
const nameContent = content.querySelector(".profile__title");
const hobbyContent = content.querySelector(".profile__hobby");
const inputName = content.querySelector(".popup__form-item_name");
const inputHobby = content.querySelector(".popup__form-item_hobby");
const saveInfo = content.querySelector(".popup__form-button");

function showPopup() {
  inputName.value = nameContent.textContent;
  inputHobby.value = hobbyContent.textContent;
  popupOpen.classList.add("popup__opened");
}

function closePopup() {
  popupOpen.classList.remove("popup__opened");
}

function editInfo(e) {
  e.preventDefault();
  nameContent.textContent = inputName.value;
  hobbyContent.textContent = inputHobby.value;
  closePopup();
}

addProfile.addEventListener("click", showPopup);
popupClose.addEventListener("click", closePopup);
saveInfo.addEventListener("click", editInfo);
