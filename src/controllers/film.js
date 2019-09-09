import {Actions} from "../utils/constants";
import {isButtonTag, removeElement, renderElement} from "../utils/util";
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
  }

  init() {
    const hideFilmDetails = () => {
      const chosenRating = this._filmDetails.getElement().querySelector(`.film-details__user-rating-input:checked`);

      if (chosenRating) {
        this._data.userRating = chosenRating.value;
        this._onDataChange(this._data, this._data);
      }

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
      if (isButtonTag(evt.target.tagName)) {
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

          if (this._data.userRating) {
            this._data.userRating = null;
          }

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
      const checkedInputElement = this._filmDetails.getElement().querySelector(`.film-details__emoji-item:checked`);
      const chosenEmoji = this._filmDetails.getElement().querySelector(`.film-details__add-emoji-label img`);

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
            source: chosenEmoji.src,
          },
        };
        this._data.comments.unshift(entry);
        this._onDataChange(this._data, this._data);
        commentFieldElement.value = ``;
        checkedInputElement.checked = false;
        removeElement(chosenEmoji);
      }
    };

    const renderFilmDetails = () => {
      this._onChangeView();
      renderElement(document.body, this._filmDetails.getElement());
      const commentsList = this._filmDetails.getElement().querySelector(`.film-details__comments-list`);
      this._data.comments.forEach((item) => {
        const comment = new Comment(item);
        renderElement(commentsList, comment.getElement());
        comment.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, (evt) => {
          evt.preventDefault();
          removeElement(comment.getElement());
          comment.removeElement();
          const index = this._data.comments.findIndex((currentComment) => currentComment === item);
          this._data.comments = [...this._data.comments.slice(0, index), ...this._data.comments.slice(index + 1)];
          this._onDataChange(this._data, this._data);
        });
      });
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
      this._filmDetails.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, (evt) => onEnterKeyDown(evt));
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
