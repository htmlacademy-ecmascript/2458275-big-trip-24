import AbstractView from '../framework/view/abstract-view.js';
import {TIME_FORMAT} from '../consts.js';
import {humanizeEventDate, getEventDuration} from '../utils/event.js';

function createEventTemplate(event, destination, offers) {
  const { basePrice, dateFrom, dateTo, isFavorite, type } = event;

  return `<li class="trip-events__item">
  <div class="event">
      <time class="event__date" datetime="${humanizeEventDate(dateFrom, TIME_FORMAT.fullEventDate)}">${humanizeEventDate(dateFrom, TIME_FORMAT.eventDate)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${humanizeEventDate(dateFrom, TIME_FORMAT.eventTime)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${humanizeEventDate(event.dateTo, TIME_FORMAT.eventTime)}</time>
                  </p>
                  <p class="event__duration">${getEventDuration(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${offers.map((offer) => `
                  <li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>
                `).join('')}
                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class EventPointView extends AbstractView {
  #point = null;
  #destination = null;
  #offers = null;
  #handleEditOpenButton = null;

  constructor({point, destination, offers, onEditOpenButtonClick}) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#handleEditOpenButton = onEditOpenButtonClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editOpenButtonHandler);
  }

  get template() {
    return createEventTemplate(this.#point, this.#destination, this.#offers);
  }

  #editOpenButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditOpenButton();
  };
}
