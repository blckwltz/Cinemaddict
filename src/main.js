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
const TOP_AMOUNT = 2;

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

const renderFilmCard = (card, container) => {
  const filmCard = new FilmCard(card);
  const filmDetails = new FilmDetails(card);

  const hideFilmDetails = () => {
    removeElement(filmDetails.getElement());
    filmDetails.removeElement();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      hideFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const renderFilmDetails = () => {
    renderElement(document.body, filmDetails.getElement());
    filmDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      hideFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmCard.getElement().querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`).forEach((element) => element.addEventListener(`click`, renderFilmDetails));

  renderElement(container, filmCard.getElement());
};

const firstBatch = (getFilmsAmount() > BATCH_SIZE) ? filmCards.slice(0, BATCH_SIZE) : filmCards;

firstBatch.forEach((card) => renderFilmCard(card, mainFilmsListContainerElement));

const extraFilmsListContainerElements = document.querySelectorAll(`.films-list--extra .films-list__container`);

const filmsByRating = filmCards.sort((a, b) => b.rating - a.rating);
const topRatedFilms = (getFilmsAmount() > TOP_AMOUNT) ? filmsByRating.slice(0, TOP_AMOUNT) : filmsByRating;

topRatedFilms.forEach((card) => renderFilmCard(card, extraFilmsListContainerElements[0]));

const filmsByCommentsAmount = filmCards.sort((a, b) => b.commentsAmount - a.commentsAmount);
const mostCommentedFilms = (getFilmsAmount() > TOP_AMOUNT) ? filmsByCommentsAmount.slice(0, TOP_AMOUNT) : filmsByCommentsAmount;

mostCommentedFilms.slice(0, 2).forEach((card) => renderFilmCard(card, extraFilmsListContainerElements[1]));

const buttonElement = mainFilmsListElement.querySelector(`.films-list__show-more`);
let counter = 0;

if (buttonElement) {
  buttonElement.addEventListener(`click`, () => {
    const batches = generateBatches(filmCards.slice(BATCH_SIZE));
    batches[counter].forEach((item) => renderFilmCard(item, mainFilmsListContainerElement));
    counter++;
    if (counter === batches.length) {
      mainFilmsListElement.removeChild(buttonElement);
    }
  });
}
