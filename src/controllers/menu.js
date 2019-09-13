import {Filters, ListTitles, Position, Screens} from "../utils/constants";
import {isATag, removeElement, renderElement} from "../utils/util";
import FilmCardsController from "./film-cards";
import Menu from "../components/menu";
import FilmsList from "../components/films-list";

export default class MenuController {
  constructor(container, cards, pageController, statisticsController, searchController, onDataChange) {
    this._container = container;
    this._cards = cards;
    this._pageController = pageController;
    this._searchController = searchController;
    this._statisticsController = statisticsController;
    this._onDataChangeMain = onDataChange;

    this._menu = new Menu(this._cards);
    this._filmsList = new FilmsList(false, ListTitles.GENERAL);
    this._filmCardsController = new FilmCardsController(null, this._onDataChange.bind(this));
    this._activeFilter = ``;
  }

  show() {
    this._filmsList.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._filmsList.getElement().classList.add(`visually-hidden`);
  }

  init() {
    this._renderMenu();
  }

  _renderMenu() {
    removeElement(this._menu.getElement());
    this._menu.removeElement();
    renderElement(this._container, this._menu.getElement(), Position.AFTERBEGIN);
    this._menu.getElement().addEventListener(`click`, (evt) => {
      if (!isATag(evt.target.tagName)) {
        return;
      }

      evt.preventDefault();
      const activeClass = `main-navigation__item--active`;
      const activeLinkElement = this._menu.getElement().querySelector(`.${activeClass}`);
      activeLinkElement.classList.remove(activeClass);
      evt.target.classList.add(activeClass);

      switch (evt.target.dataset.filter) {
        case Filters.IN_WATCHLIST.TYPE:
          this._activeFilter = Filters.IN_WATCHLIST.FUNCTION;
          this._showFilterResults(this._cards, this._activeFilter);
          break;
        case Filters.IS_WATCHED.TYPE:
          this._activeFilter = Filters.IS_WATCHED.FUNCTION;
          this._showFilterResults(this._cards, this._activeFilter);
          break;
        case Filters.IS_FAVORITE.TYPE:
          this._activeFilter = Filters.IS_FAVORITE.FUNCTION;
          this._showFilterResults(this._cards, this._activeFilter);
          break;
      }

      switch (evt.target.dataset.screen) {
        case Screens.ALL.TYPE:
          this.hide();
          this._pageController.show(this._cards);
          this._searchController.hide();
          this._statisticsController.hide();
          break;
        case Screens.STATS.TYPE:
          this.hide();
          this._pageController.hide();
          this._searchController.hide();
          this._statisticsController.show();
          break;
      }
    });
  }

  _showFilterResults(cards, filterFunction) {
    removeElement(this._filmsList.getElement());
    this._filmsList.removeElement();
    const filteredCards = cards.filter(filterFunction);

    if (filteredCards.length) {
      renderElement(this._container, this._filmsList.getElement());
      this._filmCardsController = new FilmCardsController(this._filmsList.getElement().querySelector(`.films-list__container`), this._onDataChange.bind(this));
      this._filmCardsController.setFilmCards(filteredCards);
      this.show();
      this._pageController.hide();
      this._searchController.hide();
      this._statisticsController.hide();
    }
  }

  _onDataChange() {
    this._onDataChangeMain(this._cards);
    this._renderMenu();
    this._showFilterResults(this._cards, this._activeFilter);
  }
}
