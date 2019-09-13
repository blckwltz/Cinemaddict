// import {removeElement, renderElement} from "../utils/util";
// import Statistics from "../components/statistics";
// import Chart from "chart.js";
//
// export default class StatisticsController {
//   constructor(container, cards, onDataChange) {
//     this._container = container;
//     this._cards = cards;
//     this._onDataChangeMain = onDataChange;
//
//     this._statistics = new Statistics(this._cards);
//   }
//
//   show() {
//     this._statistics.getElement().classList.remove(`visually-hidden`);
//   }
//
//   hide() {
//     this._statistics.getElement().classList.add(`visually-hidden`);
//   }
//
//   init() {
//     this.hide();
//     removeElement(this._statistics.getElement());
//     this._statistics.removeElement();
//     renderElement(this._container, this._statistics.getElement());
//
//     const chart = new Chart();
//   }
//
//   _onDataChange(cards) {
//     this._cards = cards;
//     this._onDataChangeMain(this._cards);
//   }
// }
