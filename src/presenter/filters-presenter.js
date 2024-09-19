import FiltersView from '../view/filtes-view.js';

import { render } from '../framework/render.js';

export default class FiltersPresenter {
  filtersComponent = new FiltersView();

  constructor({ filtersContainer }) {
    this.filtersContainer = filtersContainer;
  }

  init() {
    render(this.filtersComponent, this.filtersContainer);
  }
}
