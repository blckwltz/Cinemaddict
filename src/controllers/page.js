import {renderElement, removeElement} from "../util";
import Menu from "../components/menu";
import Sort from "../components/sort";
import Films from "../components/films";
import FilmsList from "../components/films-list";
import NoFilms from "../components/no-films";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import ShowMoreButton from "../components/show-more-button";

export default class PageController {
  constructor(container, cards, generalAmount, categoryAmount) {
    this._container = container;
    this._cards = cards;
    this._generalAmount = generalAmount;
    this._copiedCards = cards.slice(this._generalAmount);
    this._categoryAmount = categoryAmount;
    this._menu = new Menu(cards);
    this._sort = new Sort();
    this._films = new Films();
    this._generalFilmsList = new FilmsList(false, `All movies. Upcoming`);
    this._topRatedFilmsList = new FilmsList(true, `Top rated`);
    this._mostCommentedFilmsList = new FilmsList(true, `Most commented`);
    this._noFilms = new NoFilms();
    this._showMoreButton = new ShowMoreButton();
  }

  init() {
    renderElement(this._container, this._menu.getElement());
    renderElement(this._container, this._sort.getElement());

    if (this._cards.length) {
      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }

    renderElement(this._container, this._films.getElement());
    renderElement(this._films.getElement(), this._generalFilmsList.getElement());

    if (!this._cards.length) {
      renderElement(this._generalFilmsList.getElement(), this._noFilms.getElement());
    }

    this._cards.slice(0, this._generalAmount).forEach((card) => this._renderFilmCard(this._generalFilmsList.getElement().querySelector(`.films-list__container`), card));

    if (this._cards.some((card) => parseInt(card.rating, 10))) {
      renderElement(this._films.getElement(), this._topRatedFilmsList.getElement());
      const cardsByRating = this._cards.slice().sort((a, b) => b.rating - a.rating);
      cardsByRating.slice(0, this._categoryAmount).forEach((card) => this._renderFilmCard(this._topRatedFilmsList.getElement().querySelector(`.films-list__container`), card));
    }

    if (this._cards.some((card) => parseInt(card.commentsAmount, 10))) {
      renderElement(this._films.getElement(), this._mostCommentedFilmsList.getElement());
      const cardsByCommentsAmount = this._cards.slice().sort((a, b) => b.commentsAmount - a.commentsAmount);
      cardsByCommentsAmount.slice(0, this._categoryAmount).forEach((card) => this._renderFilmCard(this._mostCommentedFilmsList.getElement().querySelector(`.films-list__container`), card));
    }

    if (this._cards.length > this._generalAmount) {
      renderElement(this._generalFilmsList.getElement(), this._showMoreButton.getElement());
      this._showMoreButton.getElement().addEventListener(`click`, this._onShowMoreButtonClick.bind(this));
    }
  }

  _renderFilmCard(container, card) {
    const filmCard = new FilmCard(card);
    const filmDetails = new FilmDetails(card);

    const hideFilmDetails = () => {
      removeElement(filmDetails.getElement());
      filmDetails.removeElement();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        hideFilmDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const renderFilmDetails = () => {
      if (document.body.querySelector(`.film-details`)) {
        return;
      }
      renderElement(document.body, filmDetails.getElement());
      filmDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
        hideFilmDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
      filmDetails.getElement().querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
      filmDetails.getElement().querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    filmCard.getElement().querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`).forEach((element) => element.addEventListener(`click`, renderFilmDetails));

    renderElement(container, filmCard.getElement());
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }

    const filmsListContainer = this._generalFilmsList.getElement().querySelector(`.films-list__container`);
    const amountToSort = filmsListContainer.childElementCount;
    filmsListContainer.innerHTML = ``;
    const activeClass = `sort__button--active`;
    const activeSortElement = this._sort.getElement().querySelector(`.${activeClass}`);
    switch (evt.target.dataset.sortType) {
      case `date`:
        activeSortElement.classList.remove(activeClass);
        evt.target.classList.add(activeClass);
        const cardsByDate = this._cards.slice(0, amountToSort).sort((a, b) => b.year - a.year);
        cardsByDate.forEach((card) => this._renderFilmCard(filmsListContainer, card));
        break;
      case `rating`:
        activeSortElement.classList.remove(activeClass);
        evt.target.classList.add(activeClass);
        const cardsByRating = this._cards.slice(0, amountToSort).sort((a, b) => b.rating - a.rating);
        cardsByRating.forEach((card) => this._renderFilmCard(filmsListContainer, card));
        break;
      case `default`:
        activeSortElement.classList.remove(activeClass);
        evt.target.classList.add(activeClass);
        this._cards.slice(0, amountToSort).forEach((card) => this._renderFilmCard(filmsListContainer, card));
    }
  }

  _onShowMoreButtonClick() {
    this._copiedCards.splice(0, this._generalAmount).forEach((card) => this._renderFilmCard(this._generalFilmsList.getElement().querySelector(`.films-list__container`), card));

    if (this._copiedCards.length === 0) {
      this._generalFilmsList.getElement().removeChild(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
    }
  }
}
