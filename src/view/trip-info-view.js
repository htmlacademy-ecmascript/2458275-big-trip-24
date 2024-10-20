import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {sortPointsByDay, getCurrentTripDestinations, getTripTotalPrice} from '../utils/point.js';
const POINTS_COUNT = 2;
const POINTS_MIN_COUNT = 1;

function createTripInfoTemplate(points, allDestinations, allOffers, isPointslength) {
  const sortedPoints = [...points.sort(sortPointsByDay)];

  const currentTripDestinations = getCurrentTripDestinations(sortedPoints, allDestinations);

  const tripTotalPrice = getTripTotalPrice(sortedPoints, allOffers);

  const tripInfoTitle = currentTripDestinations.length > POINTS_COUNT ? `${currentTripDestinations[0].name}&mdash; ... &mdash;${currentTripDestinations[-1].name}` :
    currentTripDestinations.map((destination) => destination.name).join (' &mdash; ');

  const tripDates = currentTripDestinations.length > POINTS_MIN_COUNT ? `${currentTripDestinations[0].dateFrom}&nbsp;&mdash;&nbsp;${currentTripDestinations[-1].dateTo}` : `${currentTripDestinations[0].dateFrom}&nbsp;&mdash;&nbsp;{currentTripDestinations [0].dateTo}`;

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${isPointslength ? tripInfoTitle : ''}</h1>

              <p class="trip-info__dates">${isPointslength ? tripDates : ''}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${isPointslength ? tripTotalPrice : ''}</span>
            </p>
          </section>`;
}

export default class TripInfoView extends AbstractStatefulView {
  #points = [];
  #allDestinations = [];
  #allOffers = [];

  constructor({points, allDestinations, allOffers}) {
    super();
    this.#points = points;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
  }

  get template() {
    let isPointslength = false;

    if (this.#points.length > 0) {
      isPointslength = true;
    }

    return createTripInfoTemplate (this.#points, this.#allDestinations, this.#allOffers);
  }
}
