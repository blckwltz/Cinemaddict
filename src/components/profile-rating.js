import {getUserTitle} from "../utils/utils";
import AbstractComponent from "./abstract-component";

export default class ProfileRating extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return `<section class="header__profile profile">
      <p class="profile__rating">${getUserTitle(this._cards.filter((card) => card.isWatched).length)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`;
  }
}
