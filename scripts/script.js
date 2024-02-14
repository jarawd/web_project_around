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
const card = cardTemplate.querySelector(".elements__card").cloneNode(true);

/* Inputs */
const inputNameProfile = popupProfile.querySelector(".popup__form-item_name");
const inputHobbyProfile = popupProfile.querySelector(".popup__form-item_info");
const inputNameImage = popupImage.querySelector(".popup__form-item_name");
const inputHobbyImage = popupImage.querySelector(".popup__form-item_info");

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
  popupImage.querySelector(".popup__form-item_info").placeholder = input2;
  popupImage.querySelector(".popup__form-button").textContent = buttonName;
  popupImage.classList.add("popup__opened");
  page.prepend(popupImage);
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

  if (e.target === imgPopupClose) {
    const img = e.target.closest(".image-popup");
    img.remove();
  }

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
    nameProfile.textContent = inputNameProfile.value;
    hobbyProfile.textContent = inputHobbyProfile.value;
    closePopup(e);
  }

  if (e.target === addImage) {
    showPopupImage("Nuevo lugar", "Título", "Enlace de la imagen", "Crear");
  }

  if (e.target === saveImage) {
    e.preventDefault();
    if (inputNameImage.value && inputHobbyImage.value) {
      let imageName = popupImage.querySelector(".popup__form-item_name").value;
      let pathImage = popupImage.querySelector(".popup__form-item_info").value;
      card.querySelector(".elements__img").src = pathImage;
      card.querySelector(".elements__img").alt = imageName;
      card.querySelector(".elements__title").textContent = imageName;
      cards.prepend(card);
      closePopup(e);
    }
  }
});

/* Forms Validations */

// Mostrar span de invalido
const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`${input.id}-error`);
  input.classList.add("popup__form-item_invalid");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input_error_active");
};

// Esconder span de invalido
const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`${input.id}-error`);
  input.classList.remove("popup__form-item_invalid");
  errorElement.classList.remove("popup__input_error_active");
  errorElement.textContent = "";
};

// Validar un input - llamar dentro de esta funcion a showInputError() y hideInputError()
const validityInput = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

// Validar todos los input - metodo some con la propiedad: validity.valid
const validityAllInputs = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Enable/Disable button
const toggleButton = (form, inputList) => {
  const button = form.querySelector(".popup__form-button");
  if (!validityAllInputs(inputList)) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
};

// setEventListeners para agregar el evento input a todos los campos
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__form-item"));
  toggleButton(form, inputList);
  inputList.forEach((el, i, arr) => {
    el.addEventListener("input", (evt) => {
      validityInput(form, el);
      toggleButton(form, arr);
    });
  });
};

// Obtener todos los forms de la pagina y asignarles el setEventListeners()
// const formValidation = () => {
//   const formList = document.querySelector;
// };

// mandar llamar la funcion formValidation()
