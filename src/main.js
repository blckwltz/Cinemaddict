import {renderElement, removeElement} from "./util";
import {filmCards, getFilmsAmount} from "./data";
import Search from './components/search';
import ProfileRating from "./components/profile-rating";
import Menu from "./components/menu";
import Sort from "./components/sort";
import FilmsList from "./components/films-list";
import FilmCard from "./components/film-card";
import ShowMoreButton from "./components/show-more-button";
import FilmDetails from "./components/film-details";

const BATCH_SIZE = 5;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics p`);

renderElement(headerElement, new Search().getElement());
renderElement(headerElement, new ProfileRating().getElement());
renderElement(mainElement, new Menu().getElement());
renderElement(mainElement, new Sort().getElement());
renderElement(mainElement, new FilmsList().getElement());
statisticsElement.textContent = `${getFilmsAmount()} movies inside`;

const generateBatches = (array, batchSize = BATCH_SIZE) => {
  const batchesAmount = Math.ceil(array.length / batchSize);
  return new Array(batchesAmount).fill(``).map((item, index) => array.slice(index * batchSize, (index + 1) * batchSize));
};

const mainFilmsListElement = document.querySelector(`.films-list`);

if (getFilmsAmount() > BATCH_SIZE) {
  renderElement(mainFilmsListElement, new ShowMoreButton().getElement());
}

const mainFilmsListContainerElement = mainFilmsListElement.querySelector(`.films-list__container`);

const renderFilmCard = (card) => {
  const filmCard = new FilmCard(card);
  const filmDetails = new FilmDetails(card);

  renderElement(mainFilmsListContainerElement, filmCard.getElement());
};

const firstBatch = (getFilmsAmount() > BATCH_SIZE) ? filmCards.slice(0, BATCH_SIZE) : filmCards;

firstBatch.forEach((card) => renderFilmCard(card));

const extraFilmsListElements = Array.from(mainFilmsListElement.querySelectorAll(`.films-list--extra`));

extraFilmsListElements.forEach(function (filmsList) {
  const container = filmsList.querySelector(`.films-list__container`);
  filmCards.slice(0, 2).forEach((card) => renderElement(container, new FilmCard(card).getElement()));
});

const buttonElement = mainFilmsListElement.querySelector(`.films-list__show-more`);
let counter = 0;

if (buttonElement) {
  buttonElement.addEventListener(`click`, () => {
    const batches = generateBatches(filmCards.slice(BATCH_SIZE));
    batches[counter].forEach((item) => renderElement(mainFilmsListContainerElement, new FilmCard(item).getElement()));
    counter++;
    if (counter === batches.length) {
      mainFilmsListElement.removeChild(buttonElement);
    }
  });
}
