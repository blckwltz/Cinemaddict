import {Actions} from "../utils/constants";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {createElement, removeElement, renderElement} from "../utils/util";
import moment from "moment";

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._filmCard = new FilmCard(data);
    this._filmDetails = new FilmDetails(data);

    this.init();
  }

  init() {
    const hideFilmDetails = () => {
      removeElement(this._filmDetails.getElement());
      this._filmDetails.removeElement();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        hideFilmDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onControlButtonClick = (evt) => {
      if (evt.target.tagName === `BUTTON`) {
        evt.preventDefault();
        evt.target.classList.toggle(`film-card__controls-item--active`);
      }

      switch (evt.target.dataset.action) {
        case Actions.ADD_TO_WATCHLIST.TYPE:
          this._data.inWatchlist = !this._data.inWatchlist;
          this._onDataChange(this._data, this._data);
          break;
        case Actions.MARK_AS_WATCHED.TYPE:
          this._data.isWatched = !this._data.isWatched;
          this._onDataChange(this._data, this._data);
          break;
        case Actions.ADD_TO_FAVORITES.TYPE:
          this._data.isFavorite = !this._data.isFavorite;
          this._onDataChange(this._data, this._data);
          break;
      }
    };

    const onEnterKeyDown = (evt) => {
      const commentFieldElement = this._filmDetails.getElement().querySelector(`.film-details__comment-input`);
      const commentsListElement = this._filmDetails.getElement().querySelector(`.film-details__comments-list`);

      if ((evt.key === `Enter` && evt.metaKey) || (evt.key === `Enter` && evt.ctrlKey)) {
        const commentElement = createElement(`<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${this._filmDetails.getElement().querySelector(`.film-details__add-emoji-label img`).src}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${commentFieldElement.value}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-day">${moment().fromNow()}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`);
        commentsListElement.appendChild(commentElement);
        removeElement(this._filmDetails.getElement().querySelector(`.film-details__add-emoji-label img`));
        commentFieldElement.value = ``;
      }
    };

    const renderFilmDetails = () => {
      this._onChangeView();
      renderElement(document.body, this._filmDetails.getElement());
      this._filmDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
        hideFilmDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
      this._filmDetails.getElement().querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
      this._filmDetails.getElement().querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
      document.addEventListener(`keydown`, onEscKeyDown);
      this._filmDetails.getElement().querySelector(`.film-details__controls`).addEventListener(`click`, (evt) => onControlButtonClick(evt));
      this._filmDetails.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, onEnterKeyDown);
    };

    this._filmCard.getElement().querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`).forEach((element) => element.addEventListener(`click`, renderFilmDetails));
    this._filmCard.getElement().querySelector(`.film-card__controls`).addEventListener(`click`, (evt) => onControlButtonClick(evt));
    renderElement(this._container, this._filmCard.getElement());
  }

  setDefaultView() {
    if (document.body.contains(this._filmDetails.getElement())) {
      removeElement(this._filmDetails.getElement());
      this._filmDetails.removeElement();
    }
  }
}
