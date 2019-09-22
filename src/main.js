import {MIN_SEARCH_STRING_LENGTH, AUTHORIZATION, END_POINT, CARDS_STORE_KEY} from "./utils/constants";
import {debounce, removeElement, renderElement, isOnline} from "./utils/utils";
import MenuController from "./controllers/menu";
import PageController from "./controllers/page";
import SearchController from "./controllers/search";
import StatisticsController from "./controllers/statistics";
import Search from "./components/search";
import ProfileRating from "./components/profile-rating";
import ModelCard from "./models/model-card";
import API from "./api";
import Provider from "./provider";
import Store from "./store";

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: CARDS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, isOnline});
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics p`);
const search = new Search();

const onDataChange = (update) => {
  provider.updateCard({
    id: update.id,
    data: ModelCard.toRAW(update),
  })
    .then(() => {
      provider.getCards()
        .then((updatedCards) => {
          renderPage(updatedCards);
        });
    });
};

const searchController = new SearchController(mainElement, search, onDataChange);
const pageController = new PageController(mainElement, onDataChange);
const statisticsController = new StatisticsController(mainElement, onDataChange);
const menuController = new MenuController(mainElement, searchController, pageController, statisticsController, onDataChange);

searchController.init();
statisticsController.init();
pageController.init();
menuController.init();

renderElement(headerElement, search.getElement());

const renderPage = ((cards) => {
  removeElement(document.querySelector(`.loading-text`));

  const profileRating = new ProfileRating(cards);
  removeElement(headerElement.querySelector(`.profile`));
  renderElement(headerElement, profileRating.getElement());
  searchController.show(cards);
  menuController.show(cards);
  pageController.show(cards);
  statisticsElement.classList.remove(`visually-hidden`);
  statisticsElement.textContent = `${cards.length} movies inside`;

  const showSearchResults = (evt) => {
    if (evt.target.value.length >= MIN_SEARCH_STRING_LENGTH) {
      searchController.show(cards);
      menuController.hide();
      pageController.hide();
      statisticsController.hide();
    } else {
      hideSearchResults();
    }
  };

  const hideSearchResults = () => {
    menuController.show(cards);
    searchController.hide();
    if (document.querySelector(`[data-screen="stats"].main-navigation__item--active`)) {
      statisticsController.show(cards);
    } else {
      pageController.show(cards);
    }
  };

  search.getElement().querySelector(`input`).addEventListener(`keyup`, (evt) => {
    debounce(showSearchResults(evt), 1000);
  });

  search.getElement().querySelector(`.search__reset`).addEventListener(`click`, () => {
    debounce(hideSearchResults(), 1000);
  });
});

window.addEventListener(`offline`, () => {
  document.title = `${document.title} [OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(` [OFFLINE]`)[0];
  provider.syncCards();
});

provider.getCards().then((cards) => renderPage(cards));

// TODO
//  1. add states for main page +-
//  2. offline mode (almost done)
//  3. add loader +-
//  4.debounce
