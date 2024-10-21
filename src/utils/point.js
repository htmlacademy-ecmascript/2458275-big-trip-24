import dayjs from 'dayjs';
import {HOURS, MINUTES} from './consts.js';
import {padToTwoDigits} from './common.js';


const getOffersByType = (allOffers, type) => allOffers.find((offer) => offer.type === type).offers;

const getOffersById = (allOffers, type, itemsIds) => {
  const offersType = getOffersByType(allOffers, type);
  return offersType.filter((item) => itemsIds.includes(item.id));
};

const getDestinationById = (allDestinations, destination) => destination ? allDestinations.find((item) => item.id === destination) : '';

const getCurrentTripDestinations = (points, destinations) => {
  const destinationsIds = points.map((point) => point.destination);
  const currentTripDestinations = destinationsIds.map((destination) => getDestinationById(destinations, destination));

  return currentTripDestinations;
};

const getTripTotalPrice = (points, offers) => {
  const currentTripOffers = points.map((point) => getOffersById(offers, point.type, point.offers)).flat();

  const currentTripOffersPricesSum = currentTripOffers.reduce((totalCost, offer) => totalCost + offer.price, 0);
  const currentTripBacePricesSum = points.reduce((totalCost, point) => totalCost + point.basePrice, 0);

  const tripTotalPrice = currentTripOffersPricesSum + currentTripBacePricesSum;

  return tripTotalPrice;
};

const humanizePointDate = (eventDate, format) => dayjs(eventDate).format(format);

const getPointDuration = (eventStart, eventEnd) => dayjs(eventEnd).diff(eventStart, 'minute');

const getFormattedPointDuration = (eventStart, eventEnd) => {
  const eventDurationMinutes = getPointDuration(eventStart, eventEnd);

  const days = eventDurationMinutes > (MINUTES * HOURS) ? Math.floor(eventDurationMinutes / (MINUTES * HOURS)) : '';
  const hoursTotal = Math.floor(eventDurationMinutes / MINUTES);
  const hours = eventDurationMinutes > MINUTES ? hoursTotal % HOURS : '';
  const minutes = eventDurationMinutes - (hoursTotal * MINUTES);

  let formattedPointDuration;

  if (eventDurationMinutes < MINUTES) {
    formattedPointDuration = `${padToTwoDigits(eventDurationMinutes)}M`;
  } else
  if (eventDurationMinutes > (MINUTES * HOURS)) {
    formattedPointDuration = `${padToTwoDigits(days)}D ${padToTwoDigits(hours)}H ${padToTwoDigits(minutes)}M`;
  } else
  if (eventDurationMinutes > MINUTES && eventDurationMinutes < (MINUTES * HOURS)) {
    formattedPointDuration = `${padToTwoDigits(hours)}H ${padToTwoDigits(minutes)}M`;
  }
  return formattedPointDuration;
};

const isFuturePoint = (dateFrom) => dayjs().isBefore(dateFrom, 'D');

const isPresentPoint = (dateFrom, dateTo) => dayjs().isSame(dateFrom, 'D') || dayjs().isSame(dateTo, 'D') || (dayjs().isAfter(dateFrom, 'D') && dayjs().isBefore(dateTo, 'D'));

const isPastPoint = (dateTo) => dayjs().isAfter(dateTo, 'D');

const sortPointsByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointsByDuration = (pointA, pointB) => {
  const pointADuration = getPointDuration(pointA.dateFrom, pointA.dateTo);
  const pointBDuration = getPointDuration(pointB.dateFrom, pointB.dateTo);
  return pointBDuration - pointADuration;
};

const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export {humanizePointDate, getFormattedPointDuration, isFuturePoint, isPresentPoint, isPastPoint, sortPointsByDay, sortPointsByDuration, sortPointsByPrice, getOffersByType, getOffersById, getDestinationById, isDatesEqual, getCurrentTripDestinations, getTripTotalPrice};
