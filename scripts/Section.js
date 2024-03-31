export default class Section {
  constructor({ data, renderer }, cardsContainer) {
    this._items = data;
    this._renderer = renderer;
    this._cardsContainer = cardsContainer;
  }

  addItem(element) {
    this._cardsContainer.prepend(element);
  }

  renderItems() {
    this._items.forEach((el) => {
      this._renderer(el);
    });
  }
}
