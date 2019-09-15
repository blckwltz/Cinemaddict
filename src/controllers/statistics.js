import {countDuplicateElements, removeElement, renderElement} from "../utils/utils";
import Statistics from "../components/statistics";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class StatisticsController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;

    this._statistics = new Statistics(this._cards);
  }

  show(cards) {
    this._statistics.getElement().classList.remove(`visually-hidden`);
    if (cards !== this._cards) {
      this._renderStatistics(cards);
      this._renderCharts(cards);
    }
  }

  hide() {
    this._statistics.getElement().classList.add(`visually-hidden`);
  }

  init() {
    this._renderStatistics(this._cards);
    this._renderCharts(this._cards);
    this.hide();
  }

  _renderStatistics(cards) {
    removeElement(this._statistics.getElement());
    this._statistics.removeElement();
    this._statistics = new Statistics(cards);
    renderElement(this._container, this._statistics.getElement());
  }

  _renderCharts(cards) {
    const chartCtx = this._statistics.getElement().querySelector(`.statistic__chart`);
    const watchedGenres = cards.reduce((acc, card) => {
      if (card.isWatched) {
        acc.push(card.genre);
      }

      return acc;
    }, []);
    const dataForChart = countDuplicateElements(watchedGenres);
    const chart = new Chart(chartCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(dataForChart),
        datasets: [{
          data: Object.values(dataForChart).sort((a, b) => b - a),
          backgroundColor: `#ffe800`,
          datalabels: {
            anchor: `start`,
            align: `start`,
            offset: 50,
            color: `#ffffff`,
            font: {
              size: 16,
            },
            formatter: (value, context) => `${context.chart.data.labels[context.dataIndex]}           ${value}`,
          },
        }],
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        layout: {
          padding: {
            left: 200,
          },
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },
          }],
          yAxes: [{
            display: false,
            barThickness: 25,
          }],
        },
      },
    });
  }
}
