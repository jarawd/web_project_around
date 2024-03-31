import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

/* Main container */
const page = document.querySelector(".page");

const addProfile = page.querySelector(".profile__edit");
const nameProfile = page.querySelector(".profile__title");
const hobbyProfile = page.querySelector(".profile__hobby");
const addImage = page.querySelector(".profile__add");

/* Templates */
const popupTemplate = document.querySelector("#popup-template").content;
const imgTemplate = document.querySelector("#image-template").content;

/* Clones */
const popupProfile = popupTemplate.querySelector(".popup").cloneNode(true);
const popupImage = popupTemplate.querySelector(".popup").cloneNode(true);
const imgPopup = imgTemplate.querySelector(".image-popup").cloneNode(true);

const cards = page.querySelector(".elements");

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

const renderCards = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", {
        handleCardClick: () => {
          const image = new PopupWithImage(imgPopup, card.getImage());
          image.open();
        },
      });
      const elementCard = card.generateCard();
      renderCards.addItem(elementCard);
    },
  },
  cards
);

renderCards.renderItems();

/* Event Listeners */

page.addEventListener("click", (e) => {
  if (e.target.matches(".elements__heart")) {
    e.target.classList.toggle("elements__like");
  }

  if (e.target.matches(".elements__trash")) {
    const cardToRemove = e.target.closest(".elements__card");
    cardToRemove.remove();
  }

  if (e.target === addProfile) {
    const profileForm = new PopupWithForm(
      {
        data: {
          title: "Edit profile",
          placeholder1: "Name",
          placeholder2: "Hobby",
          type: "text",
          buttonName: "Save",
          values: true,
          resetInputs: false,
        },
        setData: () => {
          const user = new UserInfo(
            { nameSelector: nameProfile, jobSelector: hobbyProfile },
            popupProfile
          );

          return user;
        },
      },
      popupProfile
    );

    profileForm.open();
    const validator = new FormValidator(
      {
        submitButtonSelector: popupProfile.querySelector(".popup__form-button"),
        inactiveButtonClass: "popup-btn-disabled",
        inputErrorClass: "popup__form-item_invalid",
      },
      popupProfile.querySelector(".popup__form")
    );
    validator.enableValidation();
  }

  if (e.target === addImage) {
    const imageForm = new PopupWithForm(
      {
        data: {
          title: "Nuevo Lugar",
          placeholder1: "Título",
          placeholder2: "Enlace de la imagen",
          type: "url",
          buttonName: "Crear",
          resetInputs: true,
        },
        setData: (obj) => {
          const addCard = new Section(
            {
              data: [obj],
              renderer: (obj) => {
                if (Object.values(obj).every((el) => el.length !== 0)) {
                  const card = new Card(obj, "#card-template", {
                    handleCardClick: () => {
                      const image = new PopupWithImage(
                        imgPopup,
                        card.getImage()
                      );
                      image.open();
                    },
                  });
                  const elementCard = card.generateCard();
                  addCard.addItem(elementCard);
                }
              },
            },
            cards
          );
          addCard.renderItems();
        },
      },
      popupImage
    );
    imageForm.open();

    const validator = new FormValidator(
      {
        submitButtonSelector: popupImage.querySelector(".popup__form-button"),
        inactiveButtonClass: "popup-btn-disabled",
        inputErrorClass: "popup__form-item_invalid",
      },
      popupImage.querySelector(".popup__form")
    );

    validator.enableValidation();
  }
});
