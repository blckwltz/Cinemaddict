const MAX_FILMS_AMOUNT = 50;
const MAX_RATING = 9;
const MAX_COMMENTS_AMOUNT = 10;
const MAX_AGE = 21;
const EARLIEST_RELEASE_DATE = `1929-01-01`;
const GENERAL_FILMS_AMOUNT = 5;
const CATEGORY_FILMS_AMOUNT = 2;
const MIN_SEARCH_STRING_LENGTH = 3;

const Description = {
  SENTENCES: {
    MIN: 1,
    MAX: 3,
  },
  LENGTH: {
    MAX: 140,
    TO_DISPLAY: 139,
  },
};
const UserRating = {
  MILESTONES: {
    FIRST: 1,
    SECOND: 10,
    THIRD: 11,
    FOURTH: 20,
    FIFTH: 21,
  },
  TITLES: {
    FIRST: `Novice`,
    SECOND: `Fan`,
    THIRD: `Movie Buff`,
  },
};
const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};
const ListTitles = {
  GENERAL: `All movies. Upcoming`,
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};
const Sorting = {
  BY_DEFAULT: {
    TYPE: `default`,
  },
  BY_DATE: {
    TYPE: `date`,
    FUNCTION: (a, b) => b.year - a.year,
  },
  BY_RATING: {
    TYPE: `rating`,
    FUNCTION: (a, b) => b.rating - a.rating,
  },
  BY_COMMENTS: {
    TYPE: `comments`,
    FUNCTION: (a, b) => b.commentsAmount - a.commentsAmount,
  },
};
const Actions = {
  ADD_TO_WATCHLIST: {
    TYPE: `add to watchlist`,
  },
  MARK_AS_WATCHED: {
    TYPE: `mark as watched`,
  },
  ADD_TO_FAVORITES: {
    TYPE: `add to favorites`,
  },
};
const Screens = {
  ALL: {
    TYPE: `all`,
  },
  STATS: {
    TYPE: `stats`,
  },
};
const Modes = {
  VIEW: `view`,
  SEARCH: `search`,
};

export {MAX_FILMS_AMOUNT, MAX_RATING, MAX_COMMENTS_AMOUNT, MAX_AGE, EARLIEST_RELEASE_DATE, GENERAL_FILMS_AMOUNT, CATEGORY_FILMS_AMOUNT, MIN_SEARCH_STRING_LENGTH, Description, UserRating, Position, ListTitles, Sorting, Actions, Screens, Modes};
