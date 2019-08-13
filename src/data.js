import {getRandom, getRating} from "./util";

const FILMS_AMOUNT = 15;

const strings = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);

const getDescription = () => {
  const description = strings.sort(() => 0.5 - Math.random()).slice(0, getRandom(3, 1)).join(`. `);
  return description.length < 140 ? description : `${description.slice(0, 139).trim()}…`;
};

const getFilmCard = () => (
  {
    titles: [`The Big Lebowski`, `Django the Unchained`, `Dead Man`, `Deathproof`, `Lord of the Rings: Fellowship of the Ring`, `Hangover`, `Back to the Future`, `Pirates of the Carribean`, `The Matrix`, `American Pie`, `Interstellar`, `Forrest Gump`, `Fight Club`, `Pulp Fiction`, `The Godfather`][getRandom(14)],
    rating: getRating(),
    year: `${getRandom(2019, 1929)}`,
    duration: `${getRandom(2)}h ${getRandom(59, 1)}m`,
    genres: new Set([`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Mystery`]),
    posters: [`./images/posters/made-for-each-other.png`, `./images/posters/popeye-meets-sinbad.png`, `./images/posters/sagebrush-trail.jpg`, `./images/posters/santa-claus-conquers-the-martians.jpg`, `./images/posters/the-dance-of-life.jpg`, `./images/posters/the-great-flamarion.jpg`, `./images/posters/the-man-with-the-golden-arm.jpg`][getRandom(6)],
    description: getDescription(),
    commentsAmount: `${getRandom(500)} comments`,
  }
);

const filmCards = new Array(FILMS_AMOUNT).fill(``).map(getFilmCard);

export {getFilmCard, filmCards};
