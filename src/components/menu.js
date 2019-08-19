import {createElement} from "../util";
import {getFilmsAmount} from "../data";

export default class Menu {
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
    return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getFilmsAmount()}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getFilmsAmount()}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getFilmsAmount()}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
  }
}
