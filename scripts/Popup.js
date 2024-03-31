export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open(element) {
    const page = document.querySelector(".page");
    page.prepend(element);
  }

  close() {
    this._popupSelector.remove();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }
}
