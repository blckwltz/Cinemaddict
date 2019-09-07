import {Actions} from "../utils/constants";
import {removeElement, renderElement} from "../utils/util";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import Comment from "../components/comment";
import moment from "moment";

export default class FilmController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this._filmCard = new FilmCard(this._data);
    this._filmDetails = new FilmDetails(this._data);
    this._comment = new Comment({});

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

    const onDeleteButtonClick = (evt) => {
      evt.preventDefault();
      this._data.comments[this._data.comments.findIndex((item) => new Comment(item).getElement().contains(evt.target))] = null;
      this._onDataChange(this._data, this._data);
    };

    const onEnterKeyDown = (evt) => {
      const commentFieldElement = this._filmDetails.getElement().querySelector(`.film-details__comment-input`);
      const checkedInputElement = this._filmDetails.getElement().querySelector(`.film-details__emoji-item:checked`);

      if ((evt.key === `Enter` && evt.metaKey) || (evt.key === `Enter` && evt.ctrlKey)) {
        if (!commentFieldElement.value || !checkedInputElement) {
          return;
        }

        const entry = {
          text: commentFieldElement.value,
          author: ``,
          date: moment().fromNow(),
          emoji: {
            id: checkedInputElement.id,
            value: checkedInputElement.value,
            source: this._filmDetails.getElement().querySelector(`.film-details__add-emoji-label img`).src,
          },
        };
        this._data.comments.unshift(entry);
        this._onDataChange(this._data, this._data);
      }
    };

    const renderFilmDetails = () => {
      this._onChangeView();
      renderElement(document.body, this._filmDetails.getElement());
      this._data.comments.forEach((item) => {
        this._comment = new Comment(item);
        renderElement(this._filmDetails.getElement().querySelector(`.film-details__comments-list`), this._comment.getElement());
        this._comment.getElement().addEventListener(`click`, (evt) => {
          if (evt.target.tagName === `BUTTON`) {
            removeElement(this._comment.getElement());
            this._comment.removeElement();
          }
        });
      });
      this._filmDetails.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((element) => element.addEventListener(`click`, (evt) => {
        onDeleteButtonClick(evt);
      }));
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
