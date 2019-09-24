import {AUTHORIZATION, END_POINT, CARDS_STORE_KEY} from "./utils/constants";
import {removeElement, renderElement, isOnline} from "./utils/utils";
import MenuController from "./controllers/menu";
import PageController from "./controllers/page";
import SearchController from "./controllers/search";
import StatisticsController from "./controllers/statistics";
import Search from "./components/search";
import ProfileRating from "./components/profile-rating";
import Loader from "./components/loader";
import StatisticsText from "./components/statistics-text";
import ModelCard from "./models/model-card";
import API from "./api";
import Provider from "./provider";
import Store from "./store";

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: CARDS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, isOnline});
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const search = new Search();
const loader = new Loader();

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
const menuController = new MenuController(mainElement, search, searchController, pageController, statisticsController, onDataChange);

searchController.init();
statisticsController.init();
pageController.init();
menuController.init();

renderElement(headerElement, search.getElement());
renderElement(mainElement, loader.getElement());

const renderPage = ((cards) => {
  removeElement(loader.getElement());
  loader.removeElement();

  const profileRating = new ProfileRating(cards);
  removeElement(headerElement.querySelector(`.profile`));
  renderElement(headerElement, profileRating.getElement());

  const statisticsText = new StatisticsText(cards);
  removeElement(footerElement.querySelector(`.footer__statistics`));
  renderElement(footerElement, statisticsText.getElement());
  searchController.show(cards);
  menuController.show(cards);
  pageController.show(cards);
});

window.addEventListener(`offline`, () => {
  document.title = `${document.title} [OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(` [OFFLINE]`)[0];
  provider.syncCards()
    .then((cards) => {
      renderPage(cards);
    });
});

provider.getCards().then((cards) => renderPage(cards));

// TODO
//  1. offline mode (almost done)
