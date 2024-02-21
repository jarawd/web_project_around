/* Main container */
const page = document.querySelector(".page");

const addProfile = page.querySelector(".profile__edit");
const nameProfile = page.querySelector(".profile__title");
const hobbyProfile = page.querySelector(".profile__hobby");
const addImage = page.querySelector(".profile__add");

/* Templates */
const popupTemplate = document.querySelector("#popup-template").content;
const cardTemplate = document.querySelector("#card-template").content;
const imgTemplate = document.querySelector("#image-template").content;

/* Clones */
const popupProfile = popupTemplate.querySelector(".popup").cloneNode(true);
const popupImage = popupTemplate.querySelector(".popup").cloneNode(true);
const imgPopup = imgTemplate.querySelector(".image-popup").cloneNode(true);

/* Inputs */
const inputNameProfile = popupProfile.querySelector(".popup__form-item_name");
const inputHobbyProfile = popupProfile.querySelector(".popup__form-item_info");
const inputNameImage = popupImage.querySelector(".popup__form-item_name");
const inputPathImage = popupImage.querySelector(".popup__form-item_info");

/* Save buttons */
const saveProfile = popupProfile.querySelector(".popup__form-button");
const saveImage = popupImage.querySelector(".popup__form-button");

/* Close button */
const popupProfileClose = popupProfile.querySelector(".popup__close");
const popupImageClose = popupImage.querySelector(".popup__close");
const imgPopupClose = imgPopup.querySelector(".image-container__close");

const cards = page.querySelector(".elements");
const addCardButton = page.querySelector(".profile__add");

/* Render images */
const initialCards = [
  {
    name: "Langar, UK",
    link: "https://images.unsplash.com/photo-1533652475678-12f52b4fdd53?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tonsai, Thailand",
    link: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "La Rosière, France",
    link: "https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pismo Beach, US",
    link: "https://images.unsplash.com/photo-1519021228607-ef6e4c22d821?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ceppo, TE, Italia",
    link: "https://images.unsplash.com/photo-1612734748753-eec35ee8ad57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Taft Point, US",
    link: "https://images.unsplash.com/photo-1511934149220-29340005ad32?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

initialCards.forEach((el) => {
  const card = cardTemplate.querySelector(".elements__card").cloneNode(true);
  card.querySelector(".elements__img").src = el.link;
  card.querySelector(".elements__img").alt = el.name;
  card.querySelector(".elements__title").textContent = el.name;
  cards.append(card);
});

function showPopupProfile(title, input1, input2, buttonName) {
  popupProfile.querySelector(".popup__title").textContent = title;
  popupProfile.querySelector(".popup__form-item_name").placeholder = input1;
  popupProfile.querySelector(".popup__form-item_info").type = "text";
  popupProfile.querySelector(".popup__form-item_info").placeholder = input2;
  popupProfile.querySelector(".popup__form-button").textContent = buttonName;
  popupProfile.classList.add("popup__opened");
  inputNameProfile.setAttribute("minlength", "2");
  inputNameProfile.setAttribute("maxlength", "40");
  inputHobbyProfile.setAttribute("minlength", "2");
  inputHobbyProfile.setAttribute("maxlength", "200");
  page.prepend(popupProfile);
}

function showPopupImage(title, input1, input2, buttonName) {
  popupImage.querySelector(".popup__title").textContent = title;
  popupImage.querySelector(".popup__form-item_name").placeholder = input1;
  popupImage.querySelector(".popup__form-item_info").type = "url";
  popupImage.querySelector(".popup__form-item_info").placeholder = input2;
  popupImage.querySelector(".popup__form-button").textContent = buttonName;
  popupImage.classList.add("popup__opened");
  inputNameImage.setAttribute("minlength", "2");
  inputNameImage.setAttribute("maxlength", "30");
  page.prepend(popupImage);
}

function closePopup() {
  popupProfile.classList.remove("popup__opened");
  popupProfile.querySelector(".popup__form-item_name").value = "";
  popupProfile.querySelector(".popup__form-item_info").value = "";
  popupImage.classList.remove("popup__opened");
}

/* Event Listeners */

page.addEventListener("click", (e) => {
  if (e.target.matches(".elements__heart")) {
    e.target.classList.toggle("elements__like");
  }

  if (e.target.matches(".elements__trash")) {
    const cardToRemove = e.target.closest(".elements__card");
    cardToRemove.remove();
  }

  if (e.target.matches(".elements__img")) {
    imgPopup.querySelector(".image-container__img").src = e.target.src;
    imgPopup.querySelector(".image-container__img").alt = e.target.alt;
    imgPopup.querySelector(".image-container__title").textContent =
      e.target.alt;
    page.prepend(imgPopup);
  }

  if (e.target === imgPopupClose || e.target === imgPopup) {
    const img = e.target.closest(".image-popup");
    img.remove();
  }

  if (
    e.target === popupProfileClose ||
    e.target === popupImageClose ||
    e.target === popupProfile ||
    e.target === popupImage
  ) {
    closePopup();
  }

  if (e.target === addProfile) {
    inputNameProfile.value = nameProfile.textContent;
    inputHobbyProfile.value = hobbyProfile.textContent;
    enableValidation({
      formSelector: popupProfile.querySelector(".popup__form"),
      submitButtonSelector: popupProfile.querySelector(".popup__form-button"),
      inactiveButtonClass: "popup-btn-disabled",
      inputErrorClass: "popup__form-item_invalid",
    });
    showPopupProfile("Edit profile", "Name", "Hobby", "Save");
  }

  if (e.target === saveProfile) {
    nameProfile.textContent = inputNameProfile.value;
    hobbyProfile.textContent = inputHobbyProfile.value;
    closePopup();
  }

  if (e.target === addImage) {
    inputNameImage.value = "";
    inputPathImage.value = "";
    enableValidation({
      formSelector: popupImage.querySelector(".popup__form"),
      submitButtonSelector: popupImage.querySelector(".popup__form-button"),
      inactiveButtonClass: "popup-btn-disabled",
    });
    showPopupImage("Nuevo lugar", "Título", "Enlace de la imagen", "Crear");
  }

  if (e.target === saveImage) {
    if (inputNameImage.value && inputPathImage.value) {
      let imageName = popupImage.querySelector(".popup__form-item_name").value;
      let pathImage = popupImage.querySelector(".popup__form-item_info").value;
      const card = cardTemplate
        .querySelector(".elements__card")
        .cloneNode(true);
      card.querySelector(".elements__img").src = pathImage;
      card.querySelector(".elements__img").alt = imageName;
      card.querySelector(".elements__title").textContent = imageName;
      cards.prepend(card);
      closePopup();
    }
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    popupProfile.classList.remove("popup__opened");
    popupProfile.querySelector(".popup__form-item_name").value = "";
    popupProfile.querySelector(".popup__form-item_info").value = "";
    popupImage.classList.remove("popup__opened");
    imgPopup.remove();
  }
});
