import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {TIME_FORMAT, EVENT_TYPES} from '../consts.js';
import {createOffersTemplate, createTypeTemplate, humanizeEventDate} from '../utils/event.js';


function createEventEditingTemplate(event, chosenDestination, chosenOffers, allDestinations, allOffers) {
  const { basePrice, dateFrom, dateTo, type } = event;
  const { name, description, pictures } = chosenDestination;

  const typeTemplate = createTypeTemplate(EVENT_TYPES, type);
  const offersTemplate = createOffersTemplate(allOffers.offers, chosenOffers, type);

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${typeTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${allDestinations.map((destination) => `<option value=${destination.name}></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">${humanizeEventDate(dateFrom, TIME_FORMAT.fullDateAndTime)}</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventDate(dateFrom, TIME_FORMAT.fullDateAndTime)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">${humanizeEventDate(dateTo, TIME_FORMAT.fullDateAndTime)}</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventDate(dateTo, TIME_FORMAT.fullDateAndTime)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">${basePrice}</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offersTemplate}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${pictures.map((picture) => `
                          <img class="event__photo" src = ${picture.src} alt=${picture.description}>
                        `).join('')}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`;
}

export default class EventEditView extends AbstractStatefulView {
  #chosenDestination = null;
  #chosenOffers = null;
  #allDestinations = null;
  #allOffers = null;
  #handleEditCloseButton = null;
  #handleFormSubmit;

  constructor({point, chosenDestination, chosenOffers, allDestinations, allOffers, onEditCloseButtonClick}) {
    super();
    this._setState(EventEditView.parsePointToState(point, chosenDestination, chosenOffers));
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleEditCloseButton = onEditCloseButtonClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editCloseButtonHandler);
  }

  get template() {
    return createEventEditingTemplate(this._state, this.#allDestinations, this.#allOffers);
  }

  #editCloseButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditCloseButton();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToTask(this._state));
  };

  static parsePointToState(point) {
    return {...point};
  };

  static parseStateToPoint(state) {
    return { ...state };
}
