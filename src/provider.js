import {objectToArray} from "./utils/utils";
import ModelCard from "./models/model-card";

export default class Provider {
  constructor({api, store, isOnline}) {
    this._api = api;
    this._store = store;
    this._isOnline = isOnline;
  }

  getCards() {
    if (this._isOnline) {
      return this._api.getCards()
        .then((cards) => {
          cards.map((card) => this._store.setItem({key: card.id, item: ModelCard.toRAW(card)}));
          return cards;
        });
    } else {
      const rawCardsMap = this._store.getAll();
      const rawCards = objectToArray(rawCardsMap);
      const cards = ModelCard.parseCards(rawCards);
      return Promise.resolve(cards);
    }
  }

  syncCards() {
    return this._api.syncCards({cards: objectToArray(this._store.getAll())});
  }

  updateCard({id, data}) {
    if (this._isOnline) {
      return this._api.updateCard({id, data})
        .then((card) => {
          this._store.setItem({key: card.id, item: ModelCard.toRAW(card)});
          return card;
        });
    } else {
      const card = data;
      this._store.setItem({key: card.id, item: card});
      return Promise.resolve(ModelCard.parseCard(card));
    }
  }
}
