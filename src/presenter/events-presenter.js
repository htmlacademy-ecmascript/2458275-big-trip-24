import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import DestinationsModel from '../model/destinations-model.js';
import OffersModel from '../model/offers-model.js';

import {render} from '../framework/render.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;

  #eventsListComponent = new EventsListView();

  #eventsPoints = [];

  constructor({ eventsContainer, pointsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventsPoints = [...this.#pointsModel.getPoints()];

    if (this.#eventsPoints.length === 0) {
      render(new NoEventView(), this.#eventsContainer);
      return;
    }
    render(new SortView(), this.#eventsContainer);
    render(this.#eventsListComponent, this.#eventsContainer);

    this.#eventsPoints.forEach((point) => {
      this.#renderEventPoint(point);
    });
  }

  #renderEventPoint(point) {
    const destinationsModel = new DestinationsModel();
    const offersModel = new OffersModel();
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsListComponent.element,
      destinationsModel,
      offersModel,
    });
    pointPresenter.init(point);
  }
}
