import {getTitle} from "../util";
import {filmCards} from "../data";
import AbstractComponent from "./abstract-component";

export default class ProfileRating extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="header__profile profile">
      <p class="profile__rating">${getTitle(filmCards.filter((card) => card.isWatched).length)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`;
  }
}
