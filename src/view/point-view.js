import AbstractView from '../framework/view/abstract-view.js';
import {TimeFormatType} from '../utils/consts.js';
import {humanizePointDate, getFormattedPointDuration, getDestinationById, getOffersById} from '../utils/point.js';

function createPointTemplate({point, allDestinations, allOffers}) {
  const { basePrice, dateFrom, dateTo, isFavorite, type, destination, offers } = point;

  const chosenDestination = getDestinationById(allDestinations, destination);
  const chosenOffers = getOffersById(allOffers, type, offers);

  return `<li class="trip-events__item">
  <div class="event">
      <time class="event__date" datetime="${humanizePointDate(dateFrom, TimeFormatType.FULL_DATE)}">${humanizePointDate(dateFrom, TimeFormatType.SHORT_DATE)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${chosenDestination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${humanizePointDate(dateFrom, TimeFormatType.TIME)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${humanizePointDate(point.dateTo, TimeFormatType.TIME)}</time>
                  </p>
                  <p class="event__duration">${getFormattedPointDuration(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${chosenOffers.map((offer) => `
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
export default class pointView extends AbstractView {
  #point = null;
  #allDestinations = [];
  #allOffers = [];
  #handleEditOpenButton = null;
  #handleFavoriteClick = null;

  constructor({point, allDestinations, allOffers, onEditOpenButtonClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleEditOpenButton = onEditOpenButtonClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editOpenButtonHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
    });
  }

  #editOpenButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditOpenButton();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
