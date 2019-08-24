import AbstractComponent from "./abstract-component";

export default class NoFilms extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="no-result">There are no movies in our database</div>`;
  }
}
