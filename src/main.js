import {filmCards} from "./data";
import {createSearchTemplate} from './components/search';
import {createProfileRatingTemplate} from "./components/profile-rating";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sort";
import {createFilmsListTemplate} from "./components/films-list";
import {createFilmCardTemplate} from "./components/film-card";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
// import {createFilmDetailsTemplate} from "./components/film-details";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const renderElement = (element, template, position = `beforeend`, count = 0) => {
  return count ? element.insertAdjacentHTML(position, new Array(count).fill(template).join(``)) : element.insertAdjacentHTML(position, template);
};

renderElement(headerElement, createSearchTemplate());
renderElement(headerElement, createProfileRatingTemplate());
renderElement(mainElement, createMenuTemplate());
renderElement(mainElement, createSortTemplate());
renderElement(mainElement, createFilmsListTemplate());

const mainFilmsListElement = document.querySelector(`.films-list`);
const mainFilmsListContainerElement = mainFilmsListElement.querySelector(`.films-list__container`);

renderElement(mainFilmsListElement, createShowMoreButtonTemplate());
renderElement(mainFilmsListContainerElement, createFilmCardTemplate(), `beforeend`, filmCards.length);

const extraFilmsListElements = Array.from(document.querySelectorAll(`.films-list--extra`));

extraFilmsListElements.forEach(function (filmsList) {
  const container = filmsList.querySelector(`.films-list__container`);
  renderElement(container, createFilmCardTemplate(), `beforeend`, 2);
});

// renderElement(document.body, createFilmDetailsTemplate());
