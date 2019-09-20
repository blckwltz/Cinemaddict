import {AUTHORIZATION, END_POINT, Actions} from "../utils/constants";
import {isButtonTag, removeElement, renderElement} from "../utils/utils";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import CommentsForm from "../components/comments-form";
import API from "../api";
import ModelComment from "../model-comment";
import moment from "moment";

export default class FilmController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this._filmCard = new FilmCard(this._data);
    this._filmDetails = new FilmDetails(this._data);
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
  }

  init() {
    const hideFilmDetails = () => {
      const chosenRating = this._filmDetails.getElement().querySelector(`.film-details__user-rating-input:checked`);

      if (chosenRating) {
        this._data.userRating = chosenRating.value;
        this._onDataChange(this._data.id);
      }

      removeElement(this._filmDetails.getElement());
      this._filmDetails.removeElement();
    };

    const renderCommentsForm = () => {
      const commentsContainer = this._filmDetails.getElement().querySelector(`.form-details__bottom-container`);
      this._api.getComments({id: this._data.id}).then((comments) => {
        const commentsForm = new CommentsForm(comments);
        commentsContainer.innerHTML = ``;
        renderElement(commentsContainer, commentsForm.getElement());
        const inputField = commentsForm.getElement().querySelector(`.film-details__comment-input`);
        inputField.addEventListener(`keydown`, (evt) => {
          if ((evt.key === `Enter` && evt.metaKey) || (evt.key === `Enter` && evt.ctrlKey)) {
            const checkedInputElement = commentsForm.getElement().querySelector(`.film-details__emoji-item:checked`);
            const chosenEmoji = commentsForm.getElement().querySelector(`.film-details__add-emoji-label img`);

            if (!evt.target.value || !checkedInputElement) {
              return;
            }

            const entry = {
              text: evt.target.value,
              date: moment(),
              emoji: {
                id: checkedInputElement.id.replace(`emoji-`, ``),
              },
            };

            this._api.postComment({id: this._data.id, data: ModelComment.toRAW(entry)}).then(() => {
              evt.target.value = ``;
              evt.target.blur();
              checkedInputElement.checked = false;
              removeElement(chosenEmoji);
              this._onDataChange(this._data.id);
              renderCommentsForm();
            });
          }
        });
        inputField.addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });
        inputField.addEventListener(`blur`, () => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });
        commentsForm.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((item, index) => item.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          this._api.deleteComment({id: comments[index].id}).then(() => {
            this._data.comments = [...this._data.comments.slice(0, index), ...this._data.comments.slice(index + 1)];
            this._onDataChange(this._data.id);
            renderCommentsForm();
          });
        }));
      });
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
          this._onDataChange(this._data.id);
          break;
        case Actions.MARK_AS_WATCHED.TYPE:
          this._data.isWatched = !this._data.isWatched;

          if (this._data.userRating) {
            this._data.userRating = null;
          }

          this._onDataChange(this._data.id);
          break;
        case Actions.ADD_TO_FAVORITES.TYPE:
          this._data.isFavorite = !this._data.isFavorite;
          this._onDataChange(this._data.id);
          break;
      }
    };

    const renderFilmDetails = () => {
      this._onChangeView();
      renderElement(document.body, this._filmDetails.getElement());
      renderCommentsForm();
      this._filmDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
        hideFilmDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
      document.addEventListener(`keydown`, onEscKeyDown);
      this._filmDetails.getElement().querySelector(`.film-details__controls`).addEventListener(`click`, (evt) => onControlButtonClick(evt));
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
