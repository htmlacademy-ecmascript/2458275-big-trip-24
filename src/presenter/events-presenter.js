import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';


import { render, RenderPosition } from '../render.js';

export default class EventsPresenter {

  eventsListComponent = new EventsListView();
  constructor({ eventsContainer, pointsModel }) {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.eventsPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.eventsContainer, RenderPosition.BEFOREEND);
    render(this.eventsListComponent, this.eventsContainer, RenderPosition.BEFOREEND);

    render(new EventEditView(), this.eventsListComponent.getElement());

    for (let i = 0; i < this.eventsPoints.length; i++) {
      const point = new EventView({
        point: this.eventsPoints[i],
        offers: [...this.pointsModel.getOffersById(this.eventsPoints[i].type, this.eventsPoints[i].offers)],
        destination: this.pointsModel.getDestinationById(this.eventsPoints[i].destination)
      });
      render(point, this.eventsListComponent.getElement());
    }
  }
}
