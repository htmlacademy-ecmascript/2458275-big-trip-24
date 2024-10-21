import { render, replace, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoComponent = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #mainContainer = null;

  constructor({ destinationsModel, offersModel, pointsModel, mainContainer }) {
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#mainContainer = mainContainer;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {

    if (!this.#pointsModel.points.length) {
      remove(this.#tripInfoComponent);
      return;
    }

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      points: this.#pointsModel.points,
      allDestinations: this.#destinationsModel.destinations,
      allOffers: this.#offersModel.offers,
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
