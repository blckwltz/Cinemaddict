import {GENERAL_FILMS_AMOUNT, CATEGORY_FILMS_AMOUNT, ListTitles, Sorting} from "../utils/constants";
import {renderElement, removeElement} from "../utils/util";
import MovieController from "./movie";
import Menu from "../components/menu";
import Sort from "../components/sort";
import Films from "../components/films";
import FilmsList from "../components/films-list";
import NoFilms from "../components/no-films";
import ShowMoreButton from "../components/show-more-button";

export default class PageController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this._generalAmount = GENERAL_FILMS_AMOUNT;
    this._categoryAmount = CATEGORY_FILMS_AMOUNT;
    this._menu = new Menu(cards);
    this._sort = new Sort();
    this._films = new Films();
    this._generalFilmsList = new FilmsList(false, ListTitles.GENERAL);
    this._topRatedFilmsList = new FilmsList(true, ListTitles.TOP_RATED);
    this._mostCommentedFilmsList = new FilmsList(true, ListTitles.MOST_COMMENTED);
    this._noFilms = new NoFilms();
    this._showMoreButton = new ShowMoreButton();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    renderElement(this._container, this._menu.getElement());
    renderElement(this._container, this._sort.getElement());

    if (this._cards.length) {
      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }

    renderElement(this._container, this._films.getElement());
    this._renderFilmLists(this._cards);
  }

  _renderFilmLists(cards, amount = this._generalAmount) {
    removeElement(this._generalFilmsList.getElement());
    this._generalFilmsList.removeElement();

    renderElement(this._films.getElement(), this._generalFilmsList.getElement());

    if (!cards.length) {
      renderElement(this._generalFilmsList.getElement(), this._noFilms.getElement());
    }

    cards.slice(0, amount).forEach((card) => this._renderFilmCard(this._generalFilmsList.getElement().querySelector(`.films-list__container`), card));

    if (cards.some((card) => parseInt(card.rating, 10))) {
      removeElement(this._topRatedFilmsList.getElement());
      this._topRatedFilmsList.removeElement();
      renderElement(this._films.getElement(), this._topRatedFilmsList.getElement());
      const cardsByRating = this._cards.slice().sort(Sorting.BY_RATING.FUNCTION);
      cardsByRating.slice(0, this._categoryAmount).forEach((card) => this._renderFilmCard(this._topRatedFilmsList.getElement().querySelector(`.films-list__container`), card));
    }

    if (cards.some((card) => parseInt(card.commentsAmount, 10))) {
      removeElement(this._mostCommentedFilmsList.getElement());
      this._mostCommentedFilmsList.removeElement();
      renderElement(this._films.getElement(), this._mostCommentedFilmsList.getElement());
      const cardsByCommentsAmount = this._cards.slice().sort(Sorting.BY_COMMENTS.FUNCTION);
      cardsByCommentsAmount.slice(0, this._categoryAmount).forEach((card) => this._renderFilmCard(this._mostCommentedFilmsList.getElement().querySelector(`.films-list__container`), card));
    }

    if (this._cards.length > this._generalAmount) {
      removeElement(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
      renderElement(this._generalFilmsList.getElement(), this._showMoreButton.getElement());
      this._showMoreButton.getElement().addEventListener(`click`, this._onShowMoreButtonClick.bind(this));
    }
  }

  _renderFilmCard(container, card) {
    const movieController = new MovieController(container, card, this._onDataChange, this._onChangeView);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData) {
    this._cards[this._cards.findIndex((card) => card === oldData)] = newData;
    this._renderFilmLists(this._cards, this._generalFilmsList.getElement().querySelector(`.films-list__container`).childElementCount);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }

    const filmsListContainer = this._generalFilmsList.getElement().querySelector(`.films-list__container`);
    const amountToRender = filmsListContainer.childElementCount;
    filmsListContainer.innerHTML = ``;
    const activeClass = `sort__button--active`;
    const activeSortElement = this._sort.getElement().querySelector(`.${activeClass}`);
    switch (evt.target.dataset.sortType) {
      case Sorting.BY_DATE.TYPE:
        activeSortElement.classList.remove(activeClass);
        evt.target.classList.add(activeClass);
        const cardsByDate = this._cards.sort(Sorting.BY_DATE.FUNCTION);
        cardsByDate.slice(0, amountToRender).forEach((card) => this._renderFilmCard(filmsListContainer, card));
        break;
      case Sorting.BY_RATING.TYPE:
        activeSortElement.classList.remove(activeClass);
        evt.target.classList.add(activeClass);
        const cardsByRating = this._cards.sort(Sorting.BY_RATING.FUNCTION);
        cardsByRating.slice(0, amountToRender).forEach((card) => this._renderFilmCard(filmsListContainer, card));
        break;
      case Sorting.BY_DEFAULT.TYPE:
        activeSortElement.classList.remove(activeClass);
        evt.target.classList.add(activeClass);
        this._cards.slice(0, amountToRender).forEach((card) => this._renderFilmCard(filmsListContainer, card));
    }
  }

  _onShowMoreButtonClick() {
    const filmsContainer = this._generalFilmsList.getElement().querySelector(`.films-list__container`);

    this._cards.slice(filmsContainer.childElementCount, (this._generalAmount + filmsContainer.childElementCount)).forEach((card) => this._renderFilmCard(filmsContainer, card));

    if (filmsContainer.childElementCount === this._cards.length) {
      removeElement(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
    }
  }
}
