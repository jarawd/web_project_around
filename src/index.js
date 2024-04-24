import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import "./styles/index.css";
import PopupWithConfirmation from "./scripts/PopupWithConfirmation.js";
import PopupProfileImage from "./scripts/PopupProfileImage.js";
import Api from "./scripts/Api.js";

/*
My token: e42f8e22-9ca0-486e-b216-ea9a771afa3a
Gropu ID: web_es_12
*/

/* Main container */
const page = document.querySelector(".page");

const imageProfile = document.getElementById("profile-image");
const addProfile = page.querySelector(".profile__edit");
const nameProfile = page.querySelector(".profile__title");
const hobbyProfile = page.querySelector(".profile__hobby");
const addImage = page.querySelector(".profile__add");

/* Templates */
const popupTemplate = document.querySelector("#popup-template").content;
const imgTemplate = document.querySelector("#image-template").content;
const popupConfirmTemplate = document.querySelector(
  "#popup-confirm-template"
).content;
const avatarTemplate = document.querySelector(
  "#popup-profile-template"
).content;

/* Clones */
const popupProfile = popupTemplate.querySelector(".popup").cloneNode(true);
const popupImage = popupTemplate.querySelector(".popup").cloneNode(true);
const imgPopup = imgTemplate.querySelector(".image-popup").cloneNode(true);
const popupConfirm = popupConfirmTemplate
  .querySelector(".popup-confirm")
  .cloneNode(true);
const popupAvatar = avatarTemplate
  .querySelector(".popup-profile")
  .cloneNode(true);

/* Profile Image */
const profileAvatar = document.querySelector(".profile__image");
const cards = page.querySelector(".elements");

const api = new Api();

api
  .setProfileInfo()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((data) => {
    nameProfile.textContent = data.name;
    hobbyProfile.textContent = data.about;
    imageProfile.src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

/* Render Cards */

api
  .getInitialCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((data) => {
    const renderCards = new Section(
      {
        data,
        renderer: (item) => {
          const card = new Card(item, "#card-template", {
            handleCardClick: () => {
              const image = new PopupWithImage(imgPopup, card.getImage());
              image.open();
            },
            handleCardClose: () => {
              const removeCardPopup = new PopupWithConfirmation(popupConfirm, {
                card: item,
                element: card,
                removeCard: api.deleteCard,
              });
              removeCardPopup.open();
            },
            likes: api.getLikes,
            dislikes: api.getDislikes,
            obj: item,
          });

          const elementCard = card.generateCard();
          renderCards.addItem(elementCard);
        },
      },
      cards
    );

    renderCards.renderItems();
  })
  .catch((err) => console.log(err));

/* Event Listeners */

page.addEventListener("click", (e) => {
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
            {
              nameSelector: nameProfile,
              jobSelector: hobbyProfile,
              setUser: api.setUser,
            },
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
        input: ".popup__form-item",
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
                  imageForm.buttonName = "Guardando...";
                  imageForm.open();
                  api
                    .getCard(obj)
                    .then((res) => {
                      if (res.ok) {
                        return res.json();
                      }
                      return Promise.reject(`Error: ${res.status}`);
                    })
                    .then((data) => {
                      const card = new Card(data, "#card-template", {
                        handleCardClick: () => {
                          const image = new PopupWithImage(
                            imgPopup,
                            card.getImage()
                          );
                          image.open();
                        },
                        handleCardClose: () => {
                          const removeCard = new PopupWithConfirmation(
                            popupConfirm,
                            {
                              card: data,
                              element: card,
                              removeCard: api.deleteCard,
                            }
                          );
                          removeCard.open();
                        },
                        likes: api.getLikes,
                        dislikes: api.getDislikes,
                        obj: data,
                      });
                      const elementCard = card.generateCard();
                      addCard.addItem(elementCard);
                      imageForm.close();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
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
        input: ".popup__form-item",
      },
      popupImage.querySelector(".popup__form")
    );

    validator.enableValidation();
  }

  if (e.target === profileAvatar) {
    const changeAvatar = new PopupProfileImage(popupAvatar, {
      modifyAvatar: () => {
        const url = popupAvatar.querySelector(
          ".popup-profile__form-item"
        ).value;
        changeAvatar.buttonName.textContent = "Guardando...";
        changeAvatar.open();
        api
          .getAvatar(url)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
          })
          .then((data) => {
            imageProfile.src = data.avatar;
            changeAvatar.close();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
    changeAvatar.open();
    const validator = new FormValidator(
      {
        submitButtonSelector: popupAvatar.querySelector(
          ".popup-profile__button"
        ),
        inactiveButtonClass: "popup-btn-disabled",
        inputErrorClass: "popup__form-item_invalid",
        input: ".popup-profile__form-item",
      },
      popupAvatar.querySelector(".popup-profile__form")
    );

    validator.enableValidation();
  }
});
