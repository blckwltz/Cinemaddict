import {getRandomItem} from "../util";
import AbstractComponent from "./abstract-component";

export default class FilmDetails extends AbstractComponent {
  constructor({title, rating, duration, poster, details: {age, director, writers, actors, releaseDate, country, genres, description, comments: {amount, comment: {text, author, date, emojis}}}}) {
    super();
    this._title = title;
    this._rating = rating;
    this._duration = duration;
    this._poster = poster;
    this._details = {
      _age: age,
      _director: director,
      _writers: writers,
      _actors: actors,
      _releaseDate: releaseDate,
      _country: country,
      _genres: genres,
      _description: description,
      _comments: {
        _amount: amount,
        _comment: {
          _text: text,
          _author: author,
          _date: date,
          _emojis: emojis,
        }
      }
    };
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
                <span class="film-details__genre">${this._details._genres[0]}</span>
                <span class="film-details__genre">${this._details._genres[1]}</span>
                <span class="film-details__genre">${this._details._genres[2]}</span>
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${this._details._description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._details._comments._amount}</span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${getRandomItem(this._details._comments._comment._emojis).source}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${this._details._comments._comment._text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${this._details._comments._comment._author}</span>
                <span class="film-details__comment-day">${this._details._comments._comment._date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${getRandomItem(this._details._comments._comment._emojis).source}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${this._details._comments._comment._text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${this._details._comments._comment._author}</span>
                <span class="film-details__comment-day">${this._details._comments._comment._date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${getRandomItem(this._details._comments._comment._emojis).source}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${this._details._comments._comment._text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${this._details._comments._comment._author}</span>
                <span class="film-details__comment-day">${this._details._comments._comment._date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${getRandomItem(this._details._comments._comment._emojis).source}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${this._details._comments._comment._text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${this._details._comments._comment._author}</span>
                <span class="film-details__comment-day">${this._details._comments._comment._date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          
          <div class="film-details__emoji-list">
          ${this._details._comments._comment._emojis.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji.id}" value="${emoji.value}">
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
}
