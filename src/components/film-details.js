import {getRandomItem} from "../util";

export const createFilmDetailsTemplate = (item) => `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">

          <p class="film-details__age">${item.details.age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${getRandomItem(item.titles)}</h3>
              <p class="film-details__title-original">Original: ${getRandomItem(item.titles)}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${item.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${item.details.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${item.details.writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${item.details.actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${item.details.releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${item.duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${getRandomItem(item.details.countries)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${getRandomItem(item.genres)}</span>
                <span class="film-details__genre">${getRandomItem(item.genres)}</span>
                <span class="film-details__genre">${getRandomItem(item.genres)}</span>
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${item.details.description}
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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${item.details.comments.amount}</span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${getRandomItem(item.details.comments.comment.emojis)}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${item.details.comments.comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${item.details.comments.comment.author}</span>
                <span class="film-details__comment-day">${item.details.comments.comment.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${getRandomItem(item.details.comments.comment.emojis)}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${item.details.comments.comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${item.details.comments.comment.author}</span>
                <span class="film-details__comment-day">${item.details.comments.comment.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${getRandomItem(item.details.comments.comment.emojis)}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${item.details.comments.comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${item.details.comments.comment.author}</span>
                <span class="film-details__comment-day">${item.details.comments.comment.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${getRandomItem(item.details.comments.comment.emojis)}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${item.details.comments.comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${item.details.comments.comment.author}</span>
                <span class="film-details__comment-day">${item.details.comments.comment.date}</span>
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
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="${getRandomItem(item.details.comments.comment.emojis)}" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="${getRandomItem(item.details.comments.comment.emojis)}" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="${getRandomItem(item.details.comments.comment.emojis)}" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="${getRandomItem(item.details.comments.comment.emojis)}" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
