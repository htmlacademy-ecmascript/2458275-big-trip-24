import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {EVENT_TYPES} from '../consts.js';
import {getOffersByType, getDestinationById} from '../utils/point.js';
import {createTypeTemplate, createDestinationsTemplate, createTimeTemplate, createPriceTemplate, createOffersTemplate, createDescriptionTemplate} from './common-templates-for-views.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';


function createPointEditingTemplate({point, allDestinations, allOffers}) {
  const { basePrice, dateFrom, dateTo, type, destination, offers } = point;
  const chosenDestination = getDestinationById(allDestinations, destination);
  const allTypeOffers = getOffersByType(allOffers, type);

  const { name, description, pictures } = chosenDestination;

  const typeTemplate = createTypeTemplate(EVENT_TYPES, type);
  const destinationsTemplate = createDestinationsTemplate(allDestinations, type, name);
  const timeTemplate = createTimeTemplate(dateFrom, dateTo);
  const priceTemplate = createPriceTemplate(basePrice);
  const offersTemplate = createOffersTemplate(allTypeOffers, offers);
  const descriptionTemplate = createDescriptionTemplate(description, pictures);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                        ${typeTemplate}
                        ${destinationsTemplate}
                        ${timeTemplate}
                        ${priceTemplate}
                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                      ${offersTemplate}
                      ${descriptionTemplate}
                </section>
              </form>
              </li>`;
}

export default class PointEditView extends AbstractStatefulView {
  #allDestinations = [];
  #allOffers = [];
  #handleEditCloseButton = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;

  #datepicker = null;

  constructor({point, allDestinations, allOffers, onEditCloseButtonClick, onFormSubmit, onDeleteClick}) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleEditCloseButton = onEditCloseButtonClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditingTemplate({
      point: this._state,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editCloseButtonHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    if (this.element.querySelector('.event__section--offers')) {
      this.element.querySelector('.event__section--offers').addEventListener('change', this.#offersChangeHandler);
    }

    this.#setDatepickers();
  }

  #setDatepickers() {
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true
    };

    this.datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      });

    this.datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom,
      });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #editCloseButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditCloseButton();
  };

  #destinationChangeHandler = (evt) => {
    const targetDestination = evt.target.value;
    const newDestination = this.#allDestinations.find((item) => item.name === targetDestination);
    this.updateElement({
      destination: newDestination.id,
    });

  };

  #typeChangeHandler = (evt) => {
    const targetType = evt.target.value;
    this.updateElement ({ type: targetType, offers: [] });
  };

  #priceChangeHandler = (evt) => {
    const newPrice = evt.target.value;
    this._setState({
      basePrice: newPrice
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
    this.#setDatepickers();
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
  };

  #offersChangeHandler = () => {
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      offers: checkedOffers.map((item) => item.dataset.offerId)
    });
  };


  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
