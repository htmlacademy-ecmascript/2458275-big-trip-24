import { render } from './render.js';
import Filters from './view/filtes-view.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);

const filtersPresenter = new FiltersPresenter({
  filtersContainer: tripFiltersElement,
});

filtersPresenter.init();
