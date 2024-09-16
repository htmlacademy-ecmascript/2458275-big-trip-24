import FiltersPresenter from './presenter/filters-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const tripFiltersElement = document.querySelector(
  '.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter({
  filtersContainer: tripFiltersElement,
});

const pointsModel = new PointsModel();
const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsElement,
  pointsModel,
  DestinationsModel,
  OffersModel,

});

filtersPresenter.init();
eventsPresenter.init();
