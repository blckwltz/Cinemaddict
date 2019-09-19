import {Filters, Position, Screens} from "../utils/constants";
import {isATag, removeElement, renderElement} from "../utils/utils";
import Menu from "../components/menu";

export default class MenuController {
  constructor(container, searchController, pageController, statisticsController, onDataChange) {
    this._container = container;
    this._cards = [];
    this._searchController = searchController;
    this._pageController = pageController;
    this._statisticsController = statisticsController;
    this._onDataChangeMain = onDataChange;

    this._menu = new Menu([]);
    this._activeFilter = Filters.ALL;
  }

  show(cards) {
    if (cards !== this._cards) {
      this._setFilmCards(cards);
    }

    this._menu.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._menu.getElement().classList.add(`visually-hidden`);
  }

  init() {
    this._renderMenu();
  }

  _renderMenu() {
    removeElement(this._menu.getElement());
    this._menu.removeElement();
    this._menu = new Menu(this._cards);
    renderElement(this._container, this._menu.getElement(), Position.AFTERBEGIN);
    const activeFilterElement = this._menu.getElement().querySelector(`[data-filter="${this._activeFilter.TYPE}"]`);
    activeFilterElement.classList.add(`main-navigation__item--active`);
    this._menu.getElement().addEventListener(`click`, (evt) => this._onFilterLinkClick(evt));
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
        this._pageController.show(this._cards.slice().filter(Filters.ALL.METHOD));
        break;
      case Filters.IN_WATCHLIST.TYPE:
        this._activeFilter = Filters.IN_WATCHLIST;
        this._pageController.show(this._cards.slice().filter(Filters.IN_WATCHLIST.METHOD));
        break;
      case Filters.IS_WATCHED.TYPE:
        this._activeFilter = Filters.IS_WATCHED;
        this._pageController.show(this._cards.slice().filter(Filters.IS_WATCHED.METHOD));
        break;
      case Filters.IS_FAVORITE.TYPE:
        this._activeFilter = Filters.IS_FAVORITE;
        this._pageController.show(this._cards.slice().filter(Filters.IS_FAVORITE.METHOD));
        break;
    }

    switch (evt.target.dataset.screen) {
      case Screens.FILMS.TYPE:
        this._searchController.hide();
        this._statisticsController.hide();
        break;
      case Screens.STATS.TYPE:
        this._pageController.hide();
        this._searchController.hide();
        this._statisticsController.show(this._cards);
        break;
    }
  }

  _setFilmCards(cards) {
    this._cards = cards;
    this._renderMenu();
  }

  _onDataChange(card) {
    this._onDataChangeMain(card);
    this._setFilmCards(this._cards);
  }
}
