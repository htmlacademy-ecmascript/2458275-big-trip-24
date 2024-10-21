import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {sortPointsByDay, getCurrentTripDestinations, getTripTotalPrice, humanizePointDate} from '../utils/point.js';
import {TimeFormatType, MAX_POINTS_COUNT, MIN_POINTS_COUNT} from '../utils/consts.js';

function createTripInfoTemplate(points, allDestinations, allOffers) {
  const sortedPoints = [...points.sort(sortPointsByDay)];

  const currentTripDestinations = getCurrentTripDestinations(sortedPoints, allDestinations);

  const tripTotalPrice = getTripTotalPrice(sortedPoints, allOffers);

  const tripInfoTitle = currentTripDestinations.length >= MAX_POINTS_COUNT ? `${currentTripDestinations[0].name}&mdash; ... &mdash;${currentTripDestinations[currentTripDestinations.length - 1].name}` :
    currentTripDestinations.map((destination) => destination.name).join (' &mdash; ');

  const tripDates = sortedPoints.length > MIN_POINTS_COUNT ? `${humanizePointDate(sortedPoints[0].dateFrom, TimeFormatType.SHORT_DATE_REVERSED)}&nbsp;&mdash;&nbsp;${humanizePointDate(sortedPoints[sortedPoints.length - 1].dateTo, TimeFormatType.SHORT_DATE_REVERSED)}` :
    `${humanizePointDate(sortedPoints[0].dateFrom, TimeFormatType.SHORT_DATE_REVERSED)}&nbsp;&mdash;&nbsp;${humanizePointDate(sortedPoints[0].dateTo, TimeFormatType.SHORT_DATE_REVERSED)}`;


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
