import {MAX_FILMS_AMOUNT, MIN_SEARCH_STRING_LENGTH, Screens} from "./utils/constants";
import {getRandomNumber, removeElement, renderElement} from "./utils/util";
import {getFilmCard} from "./data";
import PageController from "./controllers/page";
import SearchController from "./controllers/search";
import Search from "./components/search";
import ProfileRating from "./components/profile-rating";
import Menu from "./components/menu";
import Statistics from "./components/statistics";

const filmsAmount = getRandomNumber(MAX_FILMS_AMOUNT);
let filmCards = [...new Array(filmsAmount)].map(getFilmCard);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics p`);
const search = new Search();
const profileRating = new ProfileRating(filmCards);
const menu = new Menu(filmCards);
const statistics = new Statistics();

const onDataChange = (cards) => {
  filmCards = cards;
};

renderElement(headerElement, search.getElement());
renderElement(headerElement, profileRating.getElement());
renderElement(mainElement, menu.getElement());
statisticsElement.textContent = `${filmCards.length} movies inside`;

const searchController = new SearchController(mainElement, search);
const pageController = new PageController(mainElement, onDataChange);

pageController.show(filmCards);

menu.getElement().addEventListener(`click`, (evt) => {
  if (evt.target.tagName !== `A`) {
    return;
  }

  evt.preventDefault();
  const activeClass = `main-navigation__item--active`;
  const activeLinkElement = menu.getElement().querySelector(`.${activeClass}`);
  activeLinkElement.classList.remove(activeClass);
  evt.target.classList.add(activeClass);

  switch (evt.target.dataset.screen) {
    case Screens.ALL.TYPE:
      pageController.show(filmCards);
      removeElement(statistics.getElement());
      statistics.removeElement();
      break;
    case Screens.STATS.TYPE:
      pageController.hide();
      renderElement(mainElement, statistics.getElement());
      break;
  }
});

search.getElement().addEventListener(`keyup`, (evt) => {
  if (evt.target.value.length >= MIN_SEARCH_STRING_LENGTH) {
    pageController.hide();
  } else {
    searchController.hide();
    pageController.show(filmCards);
  }
});
