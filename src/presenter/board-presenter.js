import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import PointPresenter from './point-presenter.js';
import DestinationsModel from '../model/destinations-model.js';
import OffersModel from '../model/offers-model.js';
import {SortType, UpdateType, UserAction} from '../consts.js';
import {sortPointsByDay, sortPointsByDuration, sortPointsByPrice} from '../utils/event.js';
import {render, remove} from '../framework/render.js';

export default class BoardPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #eventsListComponent = new EventsListView();
  #emptyListComponent = new NoEventView();

  #pointPresenters = new Map ();
  #currentSortType = SortType.DAY;

  constructor({ eventsContainer, pointsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = [...this.#pointsModel.getPoints()];
    switch (this.#currentSortType) {
      case SortType.DAY:
        return points.sort(sortPointsByDay);
      case SortType.TIME:
        return points.sort(sortPointsByDuration);
      case SortType.PRICE:
        return points.sort(sortPointsByPrice);
    }
    return this.#pointsModel.points;
  }

  init() {
    this.#renderBoard();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#eventsContainer);
  }

  #renderEventPoint(point) {
    const destinationsModel = new DestinationsModel();
    const offersModel = new OffersModel();

    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinationsModel,
      offersModel,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderEventPoint(point);
    }
    );
  }

  #renderBoard() {
    this.#renderSort();
    render(this.#eventsListComponent, this.#eventsContainer);

    if (!this.points.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderPoints(this.points);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
