import {getFilmCard} from "../data";

export const createFilmCardTemplate = () => `<article class="film-card">
          <h3 class="film-card__title">${getFilmCard().titles}</h3>
          <p class="film-card__rating">${getFilmCard().rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${getFilmCard().year}</span>
            <span class="film-card__duration">${getFilmCard().duration}</span>
            <span class="film-card__genre">${Array.from(getFilmCard().genres)[Math.floor(Math.random() * Array.from(getFilmCard().genres).length)]}</span>
          </p>
          <img src=${getFilmCard().posters} alt="" class="film-card__poster">
          <p class="film-card__description">${getFilmCard().description}</p>
          <a class="film-card__comments">${getFilmCard().commentsAmount}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`;
