/* Sprint 5 Variables */

const container = document.querySelector(".page");
const addProfile = container.querySelector(".profile__edit");
const nameProfile = container.querySelector(".profile__title");
const hobbyProfile = container.querySelector(".profile__hobby");
const addImage = container.querySelector(".profile__add");

/* Sprint 6 Variables */

/* Popup Profile template */
const popupTemplate = document.querySelector("#popup-template").content;
const popupProfile = popupTemplate.querySelector(".popup").cloneNode(true);
const inputNameProfile = popupProfile.querySelector(".popup__form-item_name");
const inputHobbyProfile = popupProfile.querySelector(".popup__form-item_info");
const saveProfile = popupProfile.querySelector(".popup__form-button");
const popupProfileClose = popupProfile.querySelector(".popup__close");

/* Popup Add Image template */
const popupImage = popupTemplate.querySelector(".popup").cloneNode(true);
const inputNameImage = popupImage.querySelector(".popup__form-item_name");
const inputHobbyImage = popupImage.querySelector(".popup__form-item_info");
const saveImage = popupImage.querySelector(".popup__form-button");
const popupImageClose = popupImage.querySelector(".popup__close");

const cards = document.querySelector(".elements");
const cardContainer = document.querySelector("#card-template").content;
const page = document.querySelector(".page");
const addCardButton = container.querySelector(".profile__add");

/* Like Button */
const card = cardContainer.querySelector(".elements__card").cloneNode(true);

function showPopupProfile(title, input1, input2, buttonName) {
  popupProfile.querySelector(".popup__title").textContent = title;
  popupProfile.querySelector(".popup__form-item_name").placeholder = input1;
  popupProfile.querySelector(".popup__form-item_info").placeholder = input2;
  popupProfile.querySelector(".popup__form-button").textContent = buttonName;
  popupProfile.classList.add("popup__opened");
  container.prepend(popupProfile);
}

function showPopupImage(title, input1, input2, buttonName) {
  popupImage.querySelector(".popup__title").textContent = title;
  popupImage.querySelector(".popup__form-item_name").placeholder = input1;
  popupImage.querySelector(".popup__form-item_info").placeholder = input2;
  popupImage.querySelector(".popup__form-button").textContent = buttonName;
  popupImage.classList.add("popup__opened");
  container.prepend(popupImage);
}

function closePopup(e) {
  if (e.target === popupProfileClose || e.target === saveProfile) {
    popupProfile.classList.remove("popup__opened");
  }

  if (e.target === popupImageClose || e.target === saveImage) {
    popupImage.classList.remove("popup__opened");
    popupImage.querySelector(".popup__form-item_name").value = "";
    popupImage.querySelector(".popup__form-item_info").value = "";
  }
}

/* Event Listeners */
container.addEventListener("click", (e) => {
  if (e.target === popupProfileClose || e.target === popupImageClose) {
    closePopup(e);
  }

  if (e.target === addProfile) {
    inputNameProfile.value = nameProfile.textContent;
    inputHobbyProfile.value = hobbyProfile.textContent;
    showPopupProfile("Edit profile", "Name", "Hobby", "Save");
  }

  if (e.target === saveProfile) {
    e.preventDefault();
    if (inputNameProfile.value && inputHobbyProfile.value) {
      nameProfile.textContent = inputNameProfile.value;
      hobbyProfile.textContent = inputHobbyProfile.value;
      closePopup(e);
    }
  }

  if (e.target === addImage) {
    showPopupImage("Nuevo lugar", "Título", "Enlace de la imagen", "Crear");
  }

  if (e.target === saveImage) {
    e.preventDefault();
    if (inputNameImage.value && inputHobbyImage.value) {
      let imageName = popupImage.querySelector(".popup__form-item_name").value;
      let pathImage = popupImage.querySelector(".popup__form-item_info").value;
      const card = cardContainer
        .querySelector(".elements__card")
        .cloneNode(true);
      card.querySelector(".elements__img").src = pathImage;
      card.querySelector(".elements__img").alt = imageName;
      card.querySelector(".elements__title").textContent = imageName;
      cards.prepend(card);
      closePopup(e);
    }
  }
});

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

initialCards.forEach((el) => {
  const card = cardContainer.querySelector(".elements__card").cloneNode(true);
  card.querySelector(".elements__img").src = el.link;
  card.querySelector(".elements__img").alt = el.name;
  card.querySelector(".elements__title").textContent = el.name;
  cards.append(card);
});
