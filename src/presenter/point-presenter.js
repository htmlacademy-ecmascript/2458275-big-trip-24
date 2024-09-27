import EventEditView from '../view/event-edit-view.js';
import EventPointView from '../view/event-point-view.js';
import {isEscapeKey} from '../utils/utils.js';
import {replace, render, remove} from '../framework/render.js';


export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #destinationsModel = null;
  #offersModel = null;
  #point = null;

  constructor({pointListContainer, onDataChange, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventPointView ({
      point: this.#point,
      destination: this.#destinationsModel.getDestinationsById(point.destination),
      offers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      onEditOpenButtonClick: this.#handleEditOpenClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EventEditView ({
      point: this.#point,
      chosenDestination: this.#destinationsModel.getDestinationsById(point.destination),
      chosenOffers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      allDestinations: this.#destinationsModel.getDestinations(),
      allOffers: this.#offersModel.getOffersByType(point.type),
      onEditCloseButtonClick: this.#handleEditCloseClick,
    });

    if (!prevPointComponent || !prevPointEditComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
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

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
