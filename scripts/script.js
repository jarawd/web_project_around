const container = document.querySelector(".page");
const addProfile = container.querySelector(".profile__edit");
const nameProfile = container.querySelector(".profile__title");
const hobbyProfile = container.querySelector(".profile__hobby");
const addImage = container.querySelector(".profile__add");

/* Popup template */
const popupTemplate = document.querySelector("#popup-template").content;
const popup = popupTemplate.querySelector(".popup").cloneNode(true);
const inputName = popup.querySelector(".popup__form-item_name");
const inputHobby = popup.querySelector(".popup__form-item_hobby");
const popupSaveInfo = popup.querySelector(".popup__form-button");
const popupClose = popup.querySelector(".popup__close");

function showPopup(title, input1, input2, buttonName) {
  popup.querySelector(".popup__title").textContent = title;
  popup.querySelector(".popup__form-item_name").placeholder = input1;
  popup.querySelector(".popup__form-item_hobby").placeholder = input2;
  popup.querySelector(".popup__form-button").textContent = buttonName;
  popup.classList.add("popup__opened");
  container.prepend(popup);
}

function closePopup() {
  popup.classList.remove("popup__opened");
}

function editInfo(e) {
  e.preventDefault();
  closePopup();
}

function addCard(e) {
  e.preventDefault();
}

container.addEventListener("click", (e) => {
  if (e.target === popupClose) {
    closePopup();
  }
  if (e.target === addProfile) {
    inputName.value = nameProfile.textContent;
    inputHobby.value = hobbyProfile.textContent;
    showPopup("Edit profile", "Name", "Hobby", "Save");
  }

  if (e.target === popupSaveInfo) {
    e.preventDefault();
    nameProfile.textContent = inputName.value;
    hobbyProfile.textContent = inputHobby.value;
    closePopup();
  }

  if (e.target === addImage) {
    inputName.value = "";
    inputHobby.value = "";
    showPopup("Nuevo lugar", "Título", "Enlace de la imagen", "Crear");
    if (e.target === popupSaveInfo) {
      e.preventDefault();
    }
  }
});

/* Sprint 6 Code */
const cards = document.querySelector(".elements");
const cardContainer = document.querySelector("#card-template").content;
const page = document.querySelector(".page");
const addCardButton = container.querySelector(".profile__add");

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

addCardButton.addEventListener("click", () => {
  showPopup("Nuevo lugar", "Título", "Enlace a la Imagen", "Crear");
});
