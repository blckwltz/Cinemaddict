import {MIN_SEARCH_STRING_LENGTH, AUTHORIZATION, END_POINT} from "./utils/constants";
import {renderElement} from "./utils/utils";
import PageController from "./controllers/page";
import SearchController from "./controllers/search";
import StatisticsController from "./controllers/statistics";
import Search from "./components/search";
import ProfileRating from "./components/profile-rating";
import API from "./api";
import ModelCard from "./model-card";
import MenuController from "./controllers/menu";

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics p`);
const search = new Search();

const onDataChange = (update) => {
  api.updateCard({
    id: update.id,
    data: ModelCard.toRAW(update),
  })
    .then(() => {
      api.getCards().then((updatedCards) => {
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
  const profileRating = new ProfileRating(cards);
  renderElement(headerElement, profileRating.getElement());
  searchController.show(cards);
  menuController.show(cards);
  pageController.show(cards);
  statisticsElement.textContent = `${cards.length} movies inside`;

  search.getElement().querySelector(`input`).addEventListener(`keyup`, (evt) => {
    if (evt.target.value.length >= MIN_SEARCH_STRING_LENGTH) {
      searchController.show();
      pageController.hide();
      statisticsController.hide();
    } else {
      searchController.hide();
      pageController.show(cards);
    }
  });

  search.getElement().querySelector(`.search__reset`).addEventListener(`click`, () => {
    searchController.hide();
    pageController.show(cards);
  });
});

api.getCards().then((cards) => renderPage(cards));

// TODO
//  1. add states for main page +-
//  2. do something with user rating
//  3. separate comments controller?
//  4. finish statistics controller
//  5. refactor controllers +-
//  6. offline mode
//  7. do something with profile rating update +-
//  8. debounce for search +-
