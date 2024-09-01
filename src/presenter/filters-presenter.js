import Filters from '../view/filtes-view.js';

import { render, RenderPosition } from '../render.js';

export default class FiltersPresenter {
  filtersComponent = new Filters();

  constructor({ filtersContainer }) {
    this.filtersContainer = filtersContainer;
  }

  init() {
    render(this.filtersComponent, this.filtersContainer, RenderPosition.BEFOREEND);
  }
}
