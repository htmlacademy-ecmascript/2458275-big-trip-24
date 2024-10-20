import {render} from './framework/render.js';
import {AUTHORIZATION, END_POINT} from './utils/consts.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import EventApiService from './event-api-service.js';

const filtersElement = document.querySelector(
  '.trip-controls__filters');
const pointsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');

const service = new EventApiService(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel(service);
const destinationsModel = new DestinationsModel(service);
const pointsModel = new PointsModel(service, offersModel, destinationsModel);
const filtersModel = new FiltersModel();

const tripInfoPresenter = new TripInfoPresenter ({
  mainContainer: tripMainElement,
  destinationsModel,
  offersModel,
  pointsModel,
});

const filtersPresenter = new FiltersPresenter({
  filtersContainer: filtersElement,
  filtersModel,
  pointsModel,
});

const boardPresenter = new BoardPresenter({
  pointsContainer: pointsElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filtersModel,
  onNewPointDestroy: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

tripInfoPresenter.init();
filtersPresenter.init();
boardPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripMainElement);
  });


