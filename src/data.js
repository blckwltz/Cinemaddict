import {getRandomNumber, getRandomItem, shuffleList} from "./util";

const MONTHS = new Set([`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`]);

const filmsAmount = getRandomNumber(50);
const titles = [`The Big Lebowski`, `Django the Unchained`, `Dead Man`, `Deathproof`, `Lord of the Rings: Fellowship of the Ring`, `Hangover`, `Back to the Future`, `Pirates of the Carribean`, `The Matrix`, `American Pie`, `Interstellar`, `Forrest Gump`, `Fight Club`, `Pulp Fiction`, `The Godfather`];
const posters = [`./images/posters/made-for-each-other.png`, `./images/posters/popeye-meets-sinbad.png`, `./images/posters/sagebrush-trail.jpg`, `./images/posters/santa-claus-conquers-the-martians.jpg`, `./images/posters/the-dance-of-life.jpg`, `./images/posters/the-great-flamarion.jpg`, `./images/posters/the-man-with-the-golden-arm.jpg`];
const strings = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);
const names = new Set([`Anthony Mann`, `Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`]);
const genres = new Set([`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Mystery`]);
const countries = new Set([`USA`, `Russia`, `France`, `Germany`, `Italy`]);
const emojis = [`./images/emoji/smile.png`, `./images/emoji/sleeping.png`, `./images/emoji/puke.png`, `./images/emoji/angry.png`];

const getDescription = (short = true) => {
  const description = shuffleList(strings).slice(0, getRandomNumber(3, 1)).join(`. `);
  if (short) {
    return description.length < 140 ? `${description}.` : `${description.slice(0, 139).trim()}…`;
  }
  return `${description}.`;
};
const getRating = () => {
  const firstDigit = getRandomNumber(10);
  return firstDigit < 10 ? `${firstDigit}.${getRandomNumber(9)}` : `${firstDigit}.0`;
};
const getDuration = () => `${getRandomNumber(2)}h ${getRandomNumber(59, 1)}m`;

const getFilmCard = () => (
  {
    title: getRandomItem(titles),
    rating: getRating(),
    year: `${getRandomNumber(2019, 1929)}`,
    duration: getDuration(),
    genre: getRandomItem(genres),
    poster: getRandomItem(posters),
    description: getDescription(),
    commentsAmount: `${getRandomNumber(500)} comments`,
  }
);
const getFilmDetails = () => (
  {
    age: `${getRandomNumber(21)}+`,
    poster: getRandomItem(posters),
    title: getRandomItem(titles),
    rating: getRating(),
    director: getRandomItem(names),
    writers: new Array(3).fill(``).map(() => getRandomItem(names)),
    actors: new Array(3).fill(``).map(() => getRandomItem(names)),
    releaseDate: `${getRandomNumber(31)} ${getRandomItem(MONTHS)} ${getRandomNumber(2019, 1929)}`,
    duration: getDuration(),
    country: getRandomItem(countries),
    genres: new Array(getRandomNumber(3, 1)).fill(``).map(() => getRandomItem(genres)),
    description: getDescription(false),
  }
);
const getComments = () => (
  {
    amount: getRandomNumber(50),
    comment: {
      text: getDescription(false),
      author: getRandomItem(names),
      date: `${getRandomNumber(10, 2)} days ago`,
      emoji: getRandomItem(emojis),
    },
  }
);

const filmCards = new Array(filmsAmount).fill(``).map(getFilmCard);

const getFilmsAmount = () => filmCards.length;

export {filmCards, getFilmDetails, getComments, getFilmsAmount};
