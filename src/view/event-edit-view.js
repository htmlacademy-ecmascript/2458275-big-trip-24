import { createElement } from '../render.js';
import {TIME_FORMAT, EVENT_TYPES} from '../consts.js';
import {humanizeEventDate, capitalize} from '../utils.js';

function createEventEditingTemplate(event, chosenDestination, chosenOffers, allDestinations, allOffers) {
  const { basePrice, dateFrom, dateTo, type } = event;
  const { name, description } = chosenDestination;

  function createOffersTemplate(offers, currentOffers) {
    return offers.map((offer) => `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}"  ${currentOffers.includes(offer) ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-${type}-1">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`).join('');
  }

  function createTypeTemplate (allTypes, chosenType) {
    return allTypes.map ((currentType) =>`<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === chosenType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${capitalize(currentType)}</label>
    </div>`).join('');
  }

  const typeTemplate = createTypeTemplate(EVENT_TYPES, type);
  const offersTemplate = createOffersTemplate(allOffers.offers, chosenOffers);

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
                    ${allDestinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
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
                  </section>
                </section>
              </form>`;
}

export default class EventEditView {
  constructor({event, chosenDestination, chosenOffers, allDestinations, allOffers}) {
    this.event = event;
    this.chosenDestination = chosenDestination;
    this.chosenOffers = chosenOffers;
    this.allDestinations = allDestinations;
    this.allOffers = allOffers;
  }

  getTemplate() {
    return createEventEditingTemplate(this.event, this.chosenDestination, this.chosenOffers, this.allDestinations, this.allOffers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
