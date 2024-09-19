import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventPointView from '../view/event-point-view.js';
import EventAddView from '../view/event-add-view.js';


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

    /*const eventEditing = new EventEditView({
      event: this.#eventsPoints[0],
      chosenDestination: this.#destinationsModel.getDestinationsById(this.#eventsPoints[0].destination),
      chosenOffers: [...this.#offersModel.getOffersById(this.#eventsPoints[0].type, this.#eventsPoints[0].offers)],
      allDestinations: this.#destinationsModel.getDestinations(),
      allOffers: this.#offersModel.getOffersByType(this.#eventsPoints[0].type),
    });
    render(eventEditing, this.#eventsListComponent.element);

    const eventAdding = new EventAddView({
      event: this.#eventsPoints[this.#eventsPoints.length - 1],
      chosenDestination: this.#destinationsModel.getDestinationsById(this.#eventsPoints[0].destination),
      chosenOffers: [...this.#offersModel.getOffersById(this.#eventsPoints[this.#eventsPoints.length - 1].type, this.#eventsPoints[this.#eventsPoints.length - 1].offers)],
      allDestinations: this.#destinationsModel.getDestinations(),
      allOffers: this.#offersModel.getOffersByType(this.#eventsPoints[this.#eventsPoints.length - 1].type),
    });
    render(eventAdding, this.#eventsListComponent.element); */

    for (let i = 0; i < this.#eventsPoints.length; i++) {
      const eventPointComponent = new EventPointView({
        event: this.#eventsPoints[i],
        destination: this.#destinationsModel.getDestinationsById(this.#eventsPoints[i].destination),
        offers: [...this.#offersModel.getOffersById(this.#eventsPoints[i].type, this.#eventsPoints[i].offers)],
      });
      this.#renderEventPoint(eventPointComponent);
    }
  }

  #renderEventPoint(point) {
    render(point, this.#eventsListComponent.element);
  }
}
