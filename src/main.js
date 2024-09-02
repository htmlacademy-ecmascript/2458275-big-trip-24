import FiltersPresenter from './presenter/filters-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';

const tripFiltersElement = document.querySelector(
  '.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');


const filtersPresenter = new FiltersPresenter({
  filtersContainer: tripFiltersElement,
});

const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsElement,
});

filtersPresenter.init();
eventsPresenter.init();
