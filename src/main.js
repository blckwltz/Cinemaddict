import {getFilmCard, filmCards, getFilmsAmount} from "./data";
import {createSearchTemplate} from './components/search';
import {createProfileRatingTemplate} from "./components/profile-rating";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/sort";
import {createFilmsListTemplate} from "./components/films-list";
import {createFilmCardTemplate} from "./components/film-card";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {getRandomNumber} from "./util";
import {createFilmDetailsTemplate} from "./components/film-details";

const BATCH_SIZE = 5;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics p`);

const renderElement = (element, template, position = `beforeend`) => element.insertAdjacentHTML(position, template);
const generateBatches = (array, batchSize = BATCH_SIZE) => {
  const batchesAmount = Math.ceil(array.length / batchSize);
  return new Array(batchesAmount).fill(``).map((item, index) => array.slice(index * batchSize, (index + 1) * batchSize));
};

renderElement(headerElement, createSearchTemplate());
renderElement(headerElement, createProfileRatingTemplate(getRandomNumber(getFilmsAmount())));
renderElement(mainElement, createMenuTemplate(getFilmsAmount()));
renderElement(mainElement, createSortTemplate());
renderElement(mainElement, createFilmsListTemplate());
statisticsElement.textContent = `${getFilmsAmount()} movies inside`;

const mainFilmsListElement = document.querySelector(`.films-list`);
const mainFilmsListContainerElement = mainFilmsListElement.querySelector(`.films-list__container`);

renderElement(mainFilmsListElement, createShowMoreButtonTemplate());

const firstBatch = (getFilmsAmount() > BATCH_SIZE) ? filmCards.slice(0, BATCH_SIZE) : filmCards;

firstBatch.forEach((card) => renderElement(mainFilmsListContainerElement, createFilmCardTemplate(card)));

const extraFilmsListElements = Array.from(document.querySelectorAll(`.films-list--extra`));

extraFilmsListElements.forEach(function (filmsList) {
  const container = filmsList.querySelector(`.films-list__container`);
  filmCards.slice(0, 2).forEach((card) => renderElement(container, createFilmCardTemplate(card)));
});

renderElement(document.body, createFilmDetailsTemplate(getFilmCard()));

const buttonElement = mainFilmsListElement.querySelector(`.films-list__show-more`);
let counter = 0;

buttonElement.addEventListener(`click`, () => {
  const batches = generateBatches(filmCards.slice(BATCH_SIZE));
  batches[counter].forEach((item) => renderElement(mainFilmsListContainerElement, createFilmCardTemplate(item)));
  counter++;
  if (counter === batches.length) {
    mainFilmsListElement.removeChild(buttonElement);
  }
});
