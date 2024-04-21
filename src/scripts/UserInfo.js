export default class UserInfo {
  constructor({ nameSelector, jobSelector, setUser }, popupSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._popupSelector = popupSelector;
    this._setUser = setUser;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
  }

  setUserInfo() {
    this._nameSelector.textContent = this._popupSelector.querySelector(
      ".popup__form-item_name"
    ).value;
    this._jobSelector.textContent = this._popupSelector.querySelector(
      ".popup__form-item_info"
    ).value;
    this._setUser(this._popupSelector);
  }
}
