import {getRandomNumber, createElement} from "../util";
import {getFilmsAmount} from "../data";

export default class ProfileRating {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    return this._element && (this._element = null);
  }

  getTemplate() {
    return `<section class="header__profile profile">
      <p class="profile__rating">${getRandomNumber(getFilmsAmount())}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`;
  }
}
