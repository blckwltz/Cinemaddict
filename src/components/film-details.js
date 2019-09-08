import {Actions, Position} from "../utils/constants";
import {createElement, removeElement, renderElement} from "../utils/util";
import AbstractComponent from "./abstract-component";
import UserRating from "./user-rating";
import Comment from "./comment";
import moment from "moment";

export default class FilmDetails extends AbstractComponent {
  constructor({title, rating, duration, poster, commentsAmount, inWatchlist, isWatched, isFavorite, userRating, details: {age, director, writers, actors, releaseDate, country, genres, description, emojis}}) {
    super();
    this._title = title;
    this._rating = rating;
    this._duration = duration;
    this._poster = poster;
    this._commentsAmount = commentsAmount;
    this._inWatchlist = inWatchlist;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
    this._userRating = userRating;
    this._details = {
      _age: age,
      _director: director,
      _writers: writers,
      _actors: actors,
      _releaseDate: releaseDate,
      _country: country,
      _genres: genres,
      _description: description,
      _emojis: emojis,
    };

    this._subscribeOnEvents();
  }

  getTemplate() {
    return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${this._poster}" alt="">

          <p class="film-details__age">${this._details._age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">Original: ${this._title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._rating}</p>
              <p class="film-details__user-rating">${this._userRating ? `Your rate ${this._userRating}` : ``}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._details._director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${this._details._writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${this._details._actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${this._details._releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${this._duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${this._details._country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${this._details._genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${this._details._description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._inWatchlist ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist" data-action="${Actions.ADD_TO_WATCHLIST.TYPE}">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched" data-action="${Actions.MARK_AS_WATCHED.TYPE}">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite" data-action="${Actions.ADD_TO_FAVORITES.TYPE}">Add to favorites</label>
      </section>
    </div>
    
    <div class="form-details__middle-container"></div>
    
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentsAmount}</span></h3>

        <ul class="film-details__comments-list">
        
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          
          <div class="film-details__emoji-list">
          ${this._details._emojis.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji.id}" value="${emoji.value}">
        <label class="film-details__emoji-label" for="emoji-${emoji.id}">
        <img src="${emoji.source}" width="30" height="30" alt="emoji">
        </label>`).join(``)}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
  }

  _subscribeOnEvents() {
    const userRating = new UserRating(this._title, this._poster);
    const userRatingElement = this.getElement().querySelector(`.film-details__user-rating`);

    const onRatingInputChange = (evt) => {
      userRatingElement.textContent = `Your rate ${evt.target.value}`;
    };
    const onUndoButtonClick = () => {
      userRatingElement.textContent = ``;
      const chosenRating = this.getElement().querySelector(`.film-details__user-rating-input:checked`);

      if (chosenRating) {
        chosenRating.checked = false;
      }
    };
    const renderUserRatingElement = () => {
      renderElement(this.getElement().querySelector(`.form-details__middle-container`), userRating.getElement());
      userRating.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((element) => {
        element.addEventListener(`change`, (evt) => onRatingInputChange(evt));

        if (element.value === this._userRating) {
          element.checked = true;
        }
      });
      userRating.getElement().querySelector(`.film-details__watched-reset`).addEventListener(`click`, () => onUndoButtonClick());
    };
    const renderCommentElement = (evt) => {
      const commentFieldElement = this.getElement().querySelector(`.film-details__comment-input`);
      const checkedInputElement = this.getElement().querySelector(`.film-details__emoji-item:checked`);
      const chosenEmoji = this.getElement().querySelector(`.film-details__add-emoji-label img`);

      if ((evt.key === `Enter` && evt.metaKey) || (evt.key === `Enter` && evt.ctrlKey)) {
        if (!commentFieldElement.value || !checkedInputElement) {
          return;
        }

        const commentElement = new Comment({
          text: commentFieldElement.value,
          author: ``,
          date: moment().fromNow(),
          emoji: chosenEmoji.src,
        });
        renderElement(this.getElement().querySelector(`.film-details__comments-list`), commentElement.getElement(), Position.AFTERBEGIN);
        commentFieldElement.blur();
      }
    };

    if (this.getElement().querySelector(`#watched`).checked) {
      renderUserRatingElement();
    }

    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, () => {
      if (this.getElement().contains(userRating.getElement())) {
        const chosenRating = this.getElement().querySelector(`.film-details__user-rating-input:checked`);

        if (chosenRating) {
          chosenRating.checked = false;
        }

        userRatingElement.textContent = ``;
        removeElement(userRating.getElement());
        userRating.removeElement();
      } else {
        renderUserRatingElement();
      }
    });

    this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach((element) => {
      element.addEventListener(`click`, () => {
        const imageElement = element.querySelector(`img`);
        this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
        this.getElement().querySelector(`.film-details__add-emoji-label`).appendChild(createElement(`<img src="${imageElement.src}" width="55" height="55" alt="emoji">`));
      });
    });

    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, (evt) => renderCommentElement(evt));
  }
}
