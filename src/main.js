import {createSearchTemplate} from './components/search';
import {createProfileRatingTemplate} from "./components/profile-rating";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sort";
import {createFilmsTemplate} from "./components/films";
import {createFilmsListTemplate} from "./components/films-list";
import {createFilmCardTemplate} from "./components/film-card";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {createFilmDetailsTemplate} from "./components/film-details";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const createElementFromTemplate = (template) => {
  let tempContainer = document.createElement(`div`);
  tempContainer.innerHTML = template;
  return tempContainer.firstChild;
};
const renderElement = (element, template, position = `beforeend`) => {
  element.insertAdjacentHTML(position, template);
};
const filmsElement = createElementFromTemplate(createFilmsTemplate());
const filmsListElement = createElementFromTemplate(createFilmsListTemplate(`All movies. Upcoming`));
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

renderElement(headerElement, createSearchTemplate());
renderElement(headerElement, createProfileRatingTemplate());
renderElement(mainElement, createMenuTemplate());
renderElement(mainElement, createSortTemplate());
filmsElement.appendChild(filmsListElement);
mainElement.appendChild(filmsElement);
renderElement(filmsContainerElement, createFilmCardTemplate());
renderElement(filmsListElement, createShowMoreButtonTemplate());
renderElement(document.body, createFilmDetailsTemplate());
