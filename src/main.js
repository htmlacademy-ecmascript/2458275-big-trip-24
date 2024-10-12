import FiltersPresenter from './presenter/filters-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';

import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';

const filtersElement = document.querySelector(
  '.trip-controls__filters');
const pointsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();


const filtersPresenter = new FiltersPresenter({
  filtersContainer: filtersElement,
  filtersModel,
  pointsModel,
});

const boardPresenter = new BoardPresenter({
  pointsContainer: pointsElement,
  pointsModel,
  filtersModel,
});

filtersPresenter.init();
boardPresenter.init();
