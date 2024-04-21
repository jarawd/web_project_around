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
    const invertedArray = this._items.reverse();
    invertedArray.forEach((el) => {
      this._renderer(el);
    });
  }
}
