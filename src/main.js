import FiltersPresenter from './presenter/filters-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const tripFiltersElement = document.querySelector(
  '.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();


const filtersPresenter = new FiltersPresenter({
  filtersContainer: tripFiltersElement,
  pointsModel,
});

const boardPresenter = new BoardPresenter({
  eventsContainer: tripEventsElement,
  pointsModel,
});

filtersPresenter.init();
boardPresenter.init();
