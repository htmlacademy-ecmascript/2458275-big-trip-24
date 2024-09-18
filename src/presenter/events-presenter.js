import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventPointView from '../view/event-point-view.js';


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

    render(new EventEditView(), this.eventsListComponent.getElement());

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
