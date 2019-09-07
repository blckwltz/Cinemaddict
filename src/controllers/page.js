import {GENERAL_FILMS_AMOUNT, CATEGORY_FILMS_AMOUNT, ListTitles, Sorting} from "../utils/constants";
import {renderElement, removeElement} from "../utils/util";
import FilmCardsController from "./film-cards";
import Sort from "../components/sort";
import Films from "../components/films";
import FilmsList from "../components/films-list";
import NoFilms from "../components/no-films";
import ShowMoreButton from "../components/show-more-button";

export default class PageController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChangeMain = onDataChange;

    this._cards = [];
    this._generalAmount = GENERAL_FILMS_AMOUNT;
    this._categoryAmount = CATEGORY_FILMS_AMOUNT;
    this._sort = new Sort();
    this._films = new Films();
    this._generalFilmsList = new FilmsList(false, ListTitles.GENERAL);
    this._topRatedFilmsList = new FilmsList(true, ListTitles.TOP_RATED);
    this._mostCommentedFilmsList = new FilmsList(true, ListTitles.MOST_COMMENTED);
    this._noFilms = new NoFilms();
    this._showMoreButton = new ShowMoreButton();
    this._filmCardsController = new FilmCardsController(null, this._onDataChange.bind(this));

    this._init();
  }

  show(cards) {
    if (cards !== this._cards) {
      this._setFilmCards(cards);
    }

    this._sort.getElement().classList.remove(`visually-hidden`);
    this._films.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._sort.getElement().classList.add(`visually-hidden`);
    this._films.getElement().classList.add(`visually-hidden`);
  }

  _init() {
    renderElement(this._container, this._sort.getElement());
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    renderElement(this._container, this._films.getElement());
    this._renderFilmLists();
  }

  _renderFilmLists() {
    removeElement(this._generalFilmsList.getElement());
    this._generalFilmsList.removeElement();

    renderElement(this._films.getElement(), this._generalFilmsList.getElement());

    if (!this._cards.length) {
      renderElement(this._generalFilmsList.getElement(), this._noFilms.getElement());
    }

    this._filmCardsController = new FilmCardsController(this._generalFilmsList.getElement().querySelector(`.films-list__container`), this._onDataChange.bind(this));
    this._filmCardsController.setFilmCards(this._cards.slice(0, this._generalAmount));

    if (this._cards.some((card) => parseInt(card.rating, 10))) {
      removeElement(this._topRatedFilmsList.getElement());
      this._topRatedFilmsList.removeElement();
      renderElement(this._films.getElement(), this._topRatedFilmsList.getElement());
      const cardsByRating = this._cards.slice().sort(Sorting.BY_RATING.FUNCTION);
      this._filmCardsController = new FilmCardsController(this._topRatedFilmsList.getElement().querySelector(`.films-list__container`), this._onDataChange.bind(this));
      this._filmCardsController.setFilmCards(cardsByRating.slice(0, this._categoryAmount));
    }

    if (this._cards.some((card) => parseInt(card.commentsAmount, 10))) {
      removeElement(this._mostCommentedFilmsList.getElement());
      this._mostCommentedFilmsList.removeElement();
      renderElement(this._films.getElement(), this._mostCommentedFilmsList.getElement());
      const cardsByCommentsAmount = this._cards.slice().sort(Sorting.BY_COMMENTS.FUNCTION);
      this._filmCardsController = new FilmCardsController(this._mostCommentedFilmsList.getElement().querySelector(`.films-list__container`), this._onDataChange.bind(this));
      this._filmCardsController.setFilmCards(cardsByCommentsAmount.slice(0, this._categoryAmount));
    }

    if (this._cards.length > this._generalAmount) {
      removeElement(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
      renderElement(this._generalFilmsList.getElement(), this._showMoreButton.getElement());
      this._showMoreButton.getElement().addEventListener(`click`, () => this._onShowMoreButtonClick());
    }
  }

  _setFilmCards(cards) {
    this._cards = cards;
    this._generalAmount = GENERAL_FILMS_AMOUNT;
    this._renderFilmLists();
  }

  _onDataChange(cards) {
    this._cards = cards;
    this._onDataChangeMain(this._cards);

    this._renderFilmLists();
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }

    const filmsListContainer = this._generalFilmsList.getElement().querySelector(`.films-list__container`);
    this._filmCardsController = new FilmCardsController(filmsListContainer, this._onDataChange.bind(this));
    const amountToRender = filmsListContainer.childElementCount;
    filmsListContainer.innerHTML = ``;
    const activeClass = `sort__button--active`;
    const activeSortElement = this._sort.getElement().querySelector(`.${activeClass}`);

    switch (evt.target.dataset.sortType) {
      case Sorting.BY_DATE.TYPE:
        activeSortElement.classList.remove(activeClass);
        evt.target.classList.add(activeClass);
        const cardsByDate = this._cards.sort(Sorting.BY_DATE.FUNCTION);
        this._filmCardsController.setFilmCards(cardsByDate.slice(0, amountToRender));
        break;
      case Sorting.BY_RATING.TYPE:
        activeSortElement.classList.remove(activeClass);
        evt.target.classList.add(activeClass);
        const cardsByRating = this._cards.sort(Sorting.BY_RATING.FUNCTION);
        this._filmCardsController.setFilmCards(cardsByRating.slice(0, amountToRender));
        break;
      case Sorting.BY_DEFAULT.TYPE:
        activeSortElement.classList.remove(activeClass);
        evt.target.classList.add(activeClass);
        this._filmCardsController.setFilmCards(this._cards.slice(0, amountToRender));
    }
  }

  _onShowMoreButtonClick() {
    const filmsListContainer = this._generalFilmsList.getElement().querySelector(`.films-list__container`);
    this._filmCardsController = new FilmCardsController(filmsListContainer, this._onDataChange.bind(this));

    this._filmCardsController.addFilmCards(this._cards.slice(this._generalAmount, (this._generalAmount + GENERAL_FILMS_AMOUNT)));
    this._generalAmount += GENERAL_FILMS_AMOUNT;

    if (this._generalAmount >= this._cards.length) {
      removeElement(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
    }
  }
}
