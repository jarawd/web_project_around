let content = document.querySelector(".page");
let popupOpen = content.querySelector(".popup");
let addProfile = content.querySelector(".profile__edit");
let popupClose = content.querySelector(".popup__close");
let nameContent = content.querySelector(".profile__title");
let hobbyContent = content.querySelector(".profile__hobby");
let inputName = content.querySelector(".popup__form-item_name");
let inputHobby = content.querySelector(".popup__form-item_hobby");
let saveInfo = content.querySelector(".popup__form-button");

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
