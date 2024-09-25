import EventEditView from '../view/event-edit-view.js';
import EventPointView from '../view/event-point-view.js';
import {isEscapeKey} from '../utils/utils.js';
import {replace, render} from '../framework/render.js';


export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #destinationsModel = null;
  #offersModel = null;
  #point = null;

  constructor({pointListContainer, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new EventPointView ({
      point: this.#point,
      destination: this.#destinationsModel.getDestinationsById(point.destination),
      offers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      onEditOpenButtonClick: this.#handleEditOpenClick,
    });

    this.#pointEditComponent = new EventEditView ({
      point: this.#point,
      chosenDestination: this.#destinationsModel.getDestinationsById(point.destination),
      chosenOffers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      allDestinations: this.#destinationsModel.getDestinations(),
      allOffers: this.#offersModel.getOffersByType(point.type),
      onEditCloseButtonClick: this.#handleEditCloseClick,
    });

    render(this.#pointComponent, this.#pointListContainer);
  }


  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }

  #replacePointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditOpenClick = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleEditCloseClick = () => {
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
