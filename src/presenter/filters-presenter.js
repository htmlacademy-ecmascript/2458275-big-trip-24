import FiltersView from '../view/filtes-view.js';
import {generateFilter} from '../mock/filter.js';
import { render } from '../framework/render.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #pointsModel = null;
  #eventsPoints = [];

  constructor({ filtersContainer, pointsModel }) {
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventsPoints = [...this.#pointsModel.getPoints()];
    const filters = generateFilter(this.#eventsPoints);
    render(new FiltersView({filters}), this.#filtersContainer);
  }
}
