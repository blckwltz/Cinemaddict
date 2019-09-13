import {GENERAL_FILMS_AMOUNT, CATEGORY_FILMS_AMOUNT, ListTitles, Sorting, Filters, Position} from "../utils/constants";
import {renderElement, removeElement, isATag} from "../utils/util";
import FilmCardsController from "./film-cards";
import Menu from "../components/menu";
import Sort from "../components/sort";
import Films from "../components/films";
import FilmsList from "../components/films-list";
import NoFilms from "../components/no-films";
import ShowMoreButton from "../components/show-more-button";

export default class PageController {
  constructor(container, cards, onDataChange) {
    this._container = container;
    this._cards = cards;
    this._onDataChangeMain = onDataChange;

    this._generalAmount = GENERAL_FILMS_AMOUNT;
    this._categoryAmount = CATEGORY_FILMS_AMOUNT;
    this._activeFilter = Filters.ALL;
    this._activeSort = Sorting.BY_DEFAULT;
    this._processedCards = this._cards;
    this._menu = new Menu(this._cards);
    this._sort = new Sort();
    this._films = new Films();
    this._generalFilmsList = new FilmsList(false, ListTitles.GENERAL);
    this._topRatedFilmsList = new FilmsList(true, ListTitles.TOP_RATED);
    this._mostCommentedFilmsList = new FilmsList(true, ListTitles.MOST_COMMENTED);
    this._noFilms = new NoFilms();
    this._showMoreButton = new ShowMoreButton();
    this._filmCardsController = new FilmCardsController(null, this._onDataChange.bind(this));
  }

  show() {
    this._sort.getElement().classList.remove(`visually-hidden`);
    this._films.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._sort.getElement().classList.add(`visually-hidden`);
    this._films.getElement().classList.add(`visually-hidden`);
  }

  init() {
    renderElement(this._container, this._sort.getElement());
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    renderElement(this._container, this._films.getElement());
    this._renderMenu();
    this._renderGeneralFilmsList();
    this._renderCategoryFilmsLists();
    this._renderShowMoreButton();
  }

  _renderMenu() {
    removeElement(this._menu.getElement());
    this._menu.removeElement();
    renderElement(this._container, this._menu.getElement(), Position.AFTERBEGIN);
    this._menu.getElement().addEventListener(`click`, (evt) => this._onFilterLinkClick(evt));
    const activeFilterElement = this._menu.getElement().querySelector(`[data-filter="${this._activeFilter.TYPE}"]`);
    activeFilterElement.classList.add(`main-navigation__item--active`);
  }

  _renderGeneralFilmsList() {
    removeElement(this._generalFilmsList.getElement());
    this._generalFilmsList.removeElement();
    renderElement(this._films.getElement(), this._generalFilmsList.getElement(), Position.AFTERBEGIN);

    if (!this._cards.length) {
      renderElement(this._generalFilmsList.getElement(), this._noFilms.getElement());
    }

    this._setFilmCards();
  }

  _renderCategoryFilmsLists() {
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
  }

  _renderShowMoreButton() {
    if (this._processedCards.length > this._generalAmount) {
      removeElement(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
      renderElement(this._generalFilmsList.getElement(), this._showMoreButton.getElement());
      this._showMoreButton.getElement().addEventListener(`click`, () => this._onShowMoreButtonClick());
    }

    if (this._generalAmount >= this._processedCards.length) {
      removeElement(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
    }
  }

  _onFilterLinkClick(evt) {
    evt.preventDefault();
    if (!isATag(evt.target.tagName)) {
      return;
    }

    const activeClass = `main-navigation__item--active`;
    const activeFilterElement = this._menu.getElement().querySelector(`.${activeClass}`);
    activeFilterElement.classList.remove(activeClass);
    evt.target.classList.add(activeClass);

    switch (evt.target.dataset.filter) {
      case Filters.ALL.TYPE:
        this._activeFilter = Filters.ALL;
        this._setFilmCards();
        break;
      case Filters.IN_WATCHLIST.TYPE:
        this._activeFilter = Filters.IN_WATCHLIST;
        this._setFilmCards();
        break;
      case Filters.IS_WATCHED.TYPE:
        this._activeFilter = Filters.IS_WATCHED;
        this._setFilmCards();
        break;
      case Filters.IS_FAVORITE.TYPE:
        this._activeFilter = Filters.IS_FAVORITE;
        this._setFilmCards();
        this._filmCardsController.setFilmCards(this._processedCards.slice(0, this._generalAmount));
        break;
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (!isATag(evt.target.tagName)) {
      return;
    }

    const activeClass = `sort__button--active`;
    const activeSortElement = this._sort.getElement().querySelector(`.${activeClass}`);
    activeSortElement.classList.remove(activeClass);
    evt.target.classList.add(activeClass);

    switch (evt.target.dataset.sortType) {
      case Sorting.BY_DATE.TYPE:
        this._activeSort = Sorting.BY_DATE;
        this._setFilmCards();
        break;
      case Sorting.BY_RATING.TYPE:
        this._activeSort = Sorting.BY_RATING;
        this._setFilmCards();
        break;
      case Sorting.BY_DEFAULT.TYPE:
        this._activeSort = Sorting.BY_DEFAULT;
        this._setFilmCards();
    }
  }

  _onShowMoreButtonClick() {
    const filmsListContainer = this._generalFilmsList.getElement().querySelector(`.films-list__container`);
    this._filmCardsController = new FilmCardsController(filmsListContainer, this._onDataChange.bind(this));

    this._filmCardsController.addFilmCards(this._processedCards.slice(this._generalAmount, (this._generalAmount + GENERAL_FILMS_AMOUNT)));
    this._generalAmount += GENERAL_FILMS_AMOUNT;
    this._setFilmCards();

    if (this._generalAmount >= this._processedCards.length) {
      removeElement(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
    }
  }

  _setFilmCards() {
    const filmsListContainer = this._generalFilmsList.getElement().querySelector(`.films-list__container`);
    this._filmCardsController = new FilmCardsController(filmsListContainer, this._onDataChange.bind(this));
    this._processedCards = this._cards.slice().filter(this._activeFilter.FUNCTION).sort(this._activeSort.FUNCTION);
    this._generalAmount = filmsListContainer.childElementCount >= GENERAL_FILMS_AMOUNT ? filmsListContainer.childElementCount : GENERAL_FILMS_AMOUNT;
    this._filmCardsController.setFilmCards(this._processedCards.slice(0, this._generalAmount));
    this._renderShowMoreButton();
  }

  _onDataChange() {
    this._onDataChangeMain(this._processedCards);
    this._setFilmCards();
    this._renderMenu();
    this._renderCategoryFilmsLists();
  }
}
