import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventPointView from '../view/event-point-view.js';
import {isEscapeKey} from '../utils.js';


import {render, replace,} from '../framework/render.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #eventsListComponent = new EventsListView();

  #eventsPoints = [];

  constructor({ eventsContainer, pointsModel, destinationsModel, offersModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#eventsPoints = [...this.#pointsModel.getPoints()];

    render(new SortView(), this.#eventsContainer);
    render(this.#eventsListComponent, this.#eventsContainer);

    this.#eventsPoints.forEach((point) => {
      this.#renderEventPoint(point);
    });
  }

  #renderEventPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (isEscapeKey) {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const onEditOpenButtonClick = () => {
      replacePointToEditForm();
      document.addEventListener('keydown', escKeyDownHandler);
    };
    const onEditCloseButtonClick = () => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const eventPointComponent = new EventPointView ({
      point,
      destination: this.#destinationsModel.getDestinationsById(point.destination),
      offers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      onEditOpenButtonClick,
    });

    const eventPointEditingComponent = new EventEditView ({
      point,
      chosenDestination: this.#destinationsModel.getDestinationsById(point.destination),
      chosenOffers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      allDestinations: this.#destinationsModel.getDestinations(),
      allOffers: this.#offersModel.getOffersByType(point.type),
      onEditCloseButtonClick,
    });

    function replaceEditFormToPoint() {
      replace(eventPointComponent, eventPointEditingComponent);
    }
    function replacePointToEditForm() {
      replace(eventPointEditingComponent, eventPointComponent);
    }

    render(eventPointComponent, this.#eventsListComponent.element);
  }
}
