import {render, replace, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {UpdateType} from '../consts.js';
import { filter } from '../utils/filter';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersModel = null;
  #pointsModel = null;
  #filtersComponent = null;

  constructor({ filtersContainer, filtersModel, pointsModel }) {
    this.#filtersContainer = filtersContainer;
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);

  }

  get filters() {
    const points = this.#pointsModel.points;
    return Object.entries(filter).map(([filterType, filterAction]) => ({
      type: filterType,
      count: filterAction(points).length
    }),
    );
  }

  init() {
    const filters = this.filters;
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView({
      filters,
      currentFilterType: this.#filtersModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFiltersComponent === null) {
      render(this.#filtersComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }
    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };
}


