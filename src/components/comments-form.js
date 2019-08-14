export const createCommentsFormTemplate = (item) => `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${item.amount}</span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${item.comment.emoji}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${item.comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${item.comment.author}</span>
                <span class="film-details__comment-day">${item.comment.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${item.comment.emoji}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${item.comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${item.comment.author}</span>
                <span class="film-details__comment-day">${item.comment.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${item.comment.emoji}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${item.comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${item.comment.author}</span>
                <span class="film-details__comment-day">${item.comment.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${item.comment.emoji}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${item.comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${item.comment.author}</span>
                <span class="film-details__comment-day">${item.comment.date}</span>
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
              <img src="${item.comment.emoji}" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="${item.comment.emoji}" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="${item.comment.emoji}" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="${item.comment.emoji}" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>`;
