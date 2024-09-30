import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import DestinationsModel from '../model/destinations-model.js';
import OffersModel from '../model/offers-model.js';

import {render} from '../framework/render.js';
import {updateItem} from '../utils/utils.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;

  #eventsListComponent = new EventsListView();

  #eventsPoints = [];
  #pointPresenters = new Map ();

  constructor({ eventsContainer, pointsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventsPoints = [...this.#pointsModel.getPoints()];

    if (this.#eventsPoints.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();

    this.#renderPointsList();

    this.#eventsPoints.forEach((point) => {
      this.#renderEventPoint(point);
    });
  }

  #handlePointChange = (updatedPoint) => {
    this.#eventsPoints = updateItem(this.#eventsPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    render(new SortView(), this.#eventsContainer);
  }

  #renderPointsList() {
    render(this.#eventsListComponent, this.#eventsContainer);
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderEmptyList() {
    render(new NoEventView(), this.#eventsContainer);
  }

  #renderEventPoint(point) {
    const destinationsModel = new DestinationsModel();
    const offersModel = new OffersModel();

    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      destinationsModel,
      offersModel,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
