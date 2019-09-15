import {MAX_FILMS_AMOUNT, MIN_SEARCH_STRING_LENGTH, Screens} from "./utils/constants";
import {getRandomNumber, isATag, renderElement} from "./utils/utils";
import {getFilmCard} from "./data";
import PageController from "./controllers/page";
import SearchController from "./controllers/search";
import StatisticsController from "./controllers/statistics";
import Search from "./components/search";
import ProfileRating from "./components/profile-rating";

const filmsAmount = getRandomNumber(MAX_FILMS_AMOUNT);
let filmCards = [...new Array(filmsAmount)].map(getFilmCard);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics p`);
const search = new Search();
const profileRating = new ProfileRating(filmCards);

const onDataChange = (cards) => {
  filmCards = cards;
};

renderElement(headerElement, search.getElement());
renderElement(headerElement, profileRating.getElement());
statisticsElement.textContent = `${filmCards.length} movies inside`;

const searchController = new SearchController(mainElement, search, filmCards, onDataChange);
const statisticsController = new StatisticsController(mainElement, filmCards, onDataChange);
const pageController = new PageController(mainElement, filmCards, searchController, statisticsController, onDataChange);

searchController.init();
pageController.init();
statisticsController.init();

// TODO add states for main page

search.getElement().querySelector(`input`).addEventListener(`keyup`, (evt) => {
  if (evt.target.value.length >= MIN_SEARCH_STRING_LENGTH) {
    searchController.show();
    pageController.hide();
    statisticsController.hide();
  } else {
    searchController.hide();
    pageController.show();
  }
});

search.getElement().querySelector(`.search__reset`).addEventListener(`click`, () => {
  searchController.hide();
  pageController.show();
});
