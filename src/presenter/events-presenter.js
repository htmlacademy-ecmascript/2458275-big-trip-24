import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventPointView from '../view/event-point-view.js';
import EventAddView from '../view/event-add-view.js';


import { render, RenderPosition } from '../render.js';

export default class EventsPresenter {

  eventsListComponent = new EventsListView();
  constructor({ eventsContainer, pointsModel, destinationsModel, offersModel }) {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.eventsPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.eventsContainer, RenderPosition.BEFOREEND);
    render(this.eventsListComponent, this.eventsContainer, RenderPosition.BEFOREEND);


    const eventEditing = new EventEditView({
      event: this.eventsPoints[0],
      chosenDestination: this.destinationsModel.getDestinationsById(this.eventsPoints[0].destination),
      chosenOffers: [...this.offersModel.getOffersById(this.eventsPoints[0].type, this.eventsPoints[0].offers)],
      allDestinations: this.destinationsModel.getDestinations(),
      allOffers: this.offersModel.getOffersByType(this.eventsPoints[0].type),
    });
    render(eventEditing, this.eventsListComponent.getElement());


    render(new EventAddView(), this.eventsListComponent.getElement());

    for (let i = 0; i < this.eventsPoints.length; i++) {
      const point = new EventPointView({
        event: this.eventsPoints[i],
        destination: this.destinationsModel.getDestinationsById(this.eventsPoints[i].destination),
        offers: [...this.offersModel.getOffersById(this.eventsPoints[i].type, this.eventsPoints[i].offers)]
      });
      render(point, this.eventsListComponent.getElement());
    }
  }
}
