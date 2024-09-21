import FiltersPresenter from './presenter/filters-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';

import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const tripFiltersElement = document.querySelector(
  '.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const filtersPresenter = new FiltersPresenter({
  filtersContainer: tripFiltersElement,
  pointsModel,
});

const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsElement,
  pointsModel,
  destinationsModel,
  offersModel,
});

filtersPresenter.init();
eventsPresenter.init();
