import {MAX_RATING, MAX_COMMENTS_AMOUNT, MAX_AGE, EARLIEST_RELEASE_DATE, Description, UserRating, Duration} from "./utils/constants";
import {getRandomNumber, getRandomItem, getRandomDate, shuffleList, trimString} from "./utils/utils";
import moment from "moment";

const strings = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);
const titles = [`The Big Lebowski`, `Django the Unchained`, `Dead Man`, `Deathproof`, `Lord of the Rings: Fellowship of the Ring`, `Hangover`, `Back to the Future`, `Pirates of the Carribean`, `The Matrix`, `American Pie`, `Interstellar`, `Forrest Gump`, `Fight Club`, `Pulp Fiction`, `The Godfather`];
const genres = new Set([`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Mystery`]);
const posters = [`./images/posters/made-for-each-other.png`, `./images/posters/popeye-meets-sinbad.png`, `./images/posters/sagebrush-trail.jpg`, `./images/posters/santa-claus-conquers-the-martians.jpg`, `./images/posters/the-dance-of-life.jpg`, `./images/posters/the-great-flamarion.jpg`, `./images/posters/the-man-with-the-golden-arm.jpg`];
const names = new Set([`Anthony Mann`, `Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`]);
const countries = new Set([`USA`, `Russia`, `France`, `Germany`, `Italy`]);
const emojis = [
  {
    id: `smile`,
    value: `sleeping`,
    source: `./images/emoji/smile.png`,
  },
  {
    id: `sleeping`,
    value: `neutral-face`,
    source: `./images/emoji/sleeping.png`,
  },
  {
    id: `puke`,
    value: `grinning`,
    source: `./images/emoji/puke.png`,
  },
  {
    id: `angry`,
    value: `grinning`,
    source: `./images/emoji/angry.png`
  }
];

const getDescription = () => {
  return `${shuffleList(strings).slice(0, getRandomNumber(Description.SENTENCES.MAX, Description.SENTENCES.MIN)).join(`. `)}.`;
};
const getRating = () => {
  const firstDigit = getRandomNumber(MAX_RATING);
  return firstDigit < MAX_RATING ? `${firstDigit}.${getRandomNumber(MAX_RATING)}` : `${firstDigit}.0`;
};
const getCommentsAmount = () => getRandomNumber(MAX_COMMENTS_AMOUNT);
const getComment = () => ({
  text: trimString(getDescription()),
  author: getRandomItem(names),
  date: `${moment(getRandomDate(new Date(EARLIEST_RELEASE_DATE), new Date()))
    .fromNow()}`,
  emoji: getRandomItem(emojis),
});

const getFilmCard = () => ({
  title: getRandomItem(titles),
  rating: getRating(),
  year: `${moment(getRandomDate(new Date(EARLIEST_RELEASE_DATE), new Date()))
    .format(`YYYY`)}`,
  duration: getRandomNumber(Duration.MAX, Duration.MIN),
  genre: getRandomItem(genres),
  poster: getRandomItem(posters),
  description: trimString(getDescription()),
  get commentsAmount() {
    return this.comments.length;
  },
  inWatchlist: Boolean(getRandomNumber(1)),
  isWatched: Boolean(getRandomNumber(1)),
  isFavorite: Boolean(getRandomNumber(1)),
  comments: [...new Array(getCommentsAmount())].map(getComment),
  userRating: null,
  watchingDate: Date.now(),
  details: {
    originalTitle: getRandomItem(titles),
    age: `${getRandomNumber(MAX_AGE)}+`,
    director: getRandomItem(names),
    writers: [...new Array(3)].map(() => getRandomItem(names)),
    actors: [...new Array(3)].map(() => getRandomItem(names)),
    releaseDate: `${moment(getRandomDate(new Date(EARLIEST_RELEASE_DATE), new Date()))
      .format(`DD MMMM YYYY`)}`,
    country: getRandomItem(countries),
    genres: [...new Array(getRandomNumber(3))].map(() => getRandomItem(genres)),
    description: getDescription(),
  },
});

const getUserTitle = (amount) => {
  let title = ``;
  if (amount >= UserRating.MILESTONES.FIRST && amount <= UserRating.MILESTONES.SECOND) {
    title = UserRating.TITLES.FIRST;
  } else if (amount >= UserRating.MILESTONES.THIRD && amount <= UserRating.MILESTONES.FOURTH) {
    title = UserRating.TITLES.SECOND;
  } else if (amount > UserRating.MILESTONES.FIFTH) {
    title = UserRating.TITLES.THIRD;
  }
  return title;
};

export {emojis, getFilmCard, getUserTitle};
