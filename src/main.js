import {renderElement} from "./util";
import {filmCards, getFilmsAmount} from "./data";
import Search from './components/search';
import ProfileRating from "./components/profile-rating";
import PageController from "./controllers/page";

const GENERAL_FILMS_AMOUNT = 5;
const CATEGORY_FILMS_AMOUNT = 2;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics p`);

renderElement(headerElement, new Search().getElement());
renderElement(headerElement, new ProfileRating().getElement());
statisticsElement.textContent = `${getFilmsAmount()} movies inside`;

const pageController = new PageController(mainElement, filmCards, GENERAL_FILMS_AMOUNT, CATEGORY_FILMS_AMOUNT);
pageController.init();
