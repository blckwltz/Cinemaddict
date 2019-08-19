import {createElement} from "../util";

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getElement() {
    return !this._element && (createElement(this.getTemplate()));
  }

  removeElement() {
    return this._element && (this._element = null);
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
