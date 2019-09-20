import {trimString} from "./utils/utils";
import moment from "moment";

export default class ModelCard {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.rating = data[`film_info`][`total_rating`];
    this.year = moment(data[`film_info`][`release`][`date`]).format(`YYYY`);
    this.duration = data[`film_info`][`runtime`];
    this.genre = data[`film_info`][`genre`][0];
    this.poster = data[`film_info`][`poster`];
    this.description = trimString(data[`film_info`][`description`]);
    this.commentsAmount = data[`comments`].length;
    this.inWatchlist = data[`user_details`][`watchlist`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.comments = data[`comments`];
    this.userRating = data[`user_details`][`personal_rating`];
    this.watchingDate = data[`user_details`][`watching_date`];
    this.details = {
      originalTitle: data[`film_info`][`alternative_title`],
      age: data[`film_info`][`age_rating`],
      director: data[`film_info`][`director`],
      writers: data[`film_info`][`writers`],
      actors: data[`film_info`][`actors`],
      releaseDate: moment(data[`film_info`][`release`][`date`]).format(`DD MMMM YYYY`),
      country: data[`film_info`][`release`][`release_country`],
      genres: data[`film_info`][`genre`],
      description: data[`film_info`][`description`],
    };
  }

  static parseCard(data) {
    return new ModelCard(data);
  }

  static parseCards(data) {
    return data.map(ModelCard.parseCard);
  }

  static toRAW(card) {
    return {
      'id': card.id,
      'comments': card.comments,
      'film_info': {
        'title': card.title,
        'alternative_title': card.details.originalTitle,
        'total_rating': card.rating,
        'poster': card.poster,
        'age_rating': card.details.age,
        'director': card.details.director,
        'writers': [...card.details.writers],
        'actors': [...card.details.actors],
        'release': {
          'date': card.details.releaseDate,
          'release_country': card.details.country,
        },
        'runtime': card.duration,
        'genre': [...card.details.genres],
        'description': card.details.description,
      },
      'user_details': {
        'personal_rating': card.userRating || 0,
        'watchlist': card.inWatchlist,
        'already_watched': card.isWatched,
        'watching_date': moment(card.watchingDate).toISOString(),
        'favorite': card.isFavorite,
      },
    };
  }
}
