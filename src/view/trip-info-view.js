import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {sortPointsByDay, getCurrentTripDestinations, getTripTotalPrice, humanizeEventDate} from '../utils/point.js';
import {TimeFormatType, MAX_POINTS_COUNT, POINTS_MIN_COUNT} from '../utils/consts.js';

function createTripInfoTemplate(points, allDestinations, allOffers) {
  const sortedPoints = [...points.sort(sortPointsByDay)];

  const currentTripDestinations = getCurrentTripDestinations(sortedPoints, allDestinations);

  const tripTotalPrice = getTripTotalPrice(sortedPoints, allOffers);

  const tripInfoTitle = currentTripDestinations.length >= MAX_POINTS_COUNT ? `${currentTripDestinations[0].name}&mdash; ... &mdash;${currentTripDestinations[currentTripDestinations.length - 1].name}` :
    currentTripDestinations.map((destination) => destination.name).join (' &mdash; ');

  const tripDates = sortedPoints.length > POINTS_MIN_COUNT ? `${humanizeEventDate(sortedPoints[0].dateFrom, TimeFormatType.SHORT_DATE_REVERSED)}&nbsp;&mdash;&nbsp;${humanizeEventDate(sortedPoints[sortedPoints.length - 1].dateTo, TimeFormatType.SHORT_DATE_REVERSED)}` : `${humanizeEventDate(sortedPoints[0].dateFrom, TimeFormatType.SHORT_DATE_REVERSED)}&nbsp;&mdash;&nbsp;${humanizeEventDate(sortedPoints[0].dateTo, TimeFormatType.SHORT_DATE_REVERSED)}`;


  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripInfoTitle}</h1>
              <p class="trip-info__dates">${tripDates}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripTotalPrice}</span>
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
    return createTripInfoTemplate (this.#points, this.#allDestinations, this.#allOffers);
  }
}
