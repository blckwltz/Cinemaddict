import {Actions} from "../utils/constants";
import {removeElement, renderElement} from "../utils/utils";
import AbstractComponent from "./abstract-component";
import UserRating from "./user-rating";

export default class FilmDetails extends AbstractComponent {
  constructor({title, rating, duration, poster, commentsAmount, inWatchlist, isWatched, isFavorite, userRating, details: {originalTitle, age, director, writers, actors, releaseDate, country, genres, description, emojis}}) {
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
      _originalTitle: originalTitle,
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
              <p class="film-details__title-original">Original: ${this._details._originalTitle}</p>
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
              <td class="film-details__cell">${Math.floor(this._duration / 60)}h ${this._duration % 60}m</td>
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
    
    <div class="form-details__bottom-container"></div>
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
  }
}
