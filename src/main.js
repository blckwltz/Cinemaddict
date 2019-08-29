import {renderElement} from "./utils/util";
import {filmCards, getFilmsAmount} from "./data";
import Search from './components/search';
import ProfileRating from "./components/profile-rating";
import PageController from "./controllers/page";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics p`);

renderElement(headerElement, new Search().getElement());
renderElement(headerElement, new ProfileRating().getElement());
statisticsElement.textContent = `${getFilmsAmount()} movies inside`;

const pageController = new PageController(mainElement, filmCards);
pageController.init();
