import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import DestinationsModel from '../model/destinations-model.js';
import OffersModel from '../model/offers-model.js';
import {SortType} from '../consts.js';
import {sortPointsByDay, sortPointsByDuration, sortPointsByPrice} from '../utils/event.js';
import {render} from '../framework/render.js';
import {updateItem} from '../utils/utils.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #eventsListComponent = new EventsListView();

  #eventsPoints = [];
  #pointPresenters = new Map ();
  #currentSortType = SortType.DAY;
  #sourcedEventsPoints = [];

  constructor({ eventsContainer, pointsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventsPoints = [...this.#pointsModel.getPoints()];
    this.#sourcedEventsPoints = [...this.#pointsModel.getPoints()];

    this.#renderSort();

    this.#renderPointsList();
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#eventsPoints.sort(sortPointsByDay);
        break;
      case SortType.TIME:
        this.#eventsPoints.sort(sortPointsByDuration);
        break;
      case SortType.PRICE:
        this.#eventsPoints.sort(sortPointsByPrice);
        break;
      default:
        this.#eventsPoints = [...this.#sourcedEventsPoints];
    }

    this.#currentSortType = sortType;
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderPointsList() {
    this.#eventsPoints.sort(sortPointsByDay);
    render(this.#eventsListComponent, this.#eventsContainer);

    if (this.#eventsPoints.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#eventsPoints.forEach((point) => {
      this.#renderEventPoint(point);
    });

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

  #handlePointChange = (updatedPoint) => {
    this.#eventsPoints = updateItem(this.#eventsPoints, updatedPoint);
    this.#sourcedEventsPoints = updateItem(this.#sourcedEventsPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };
}
