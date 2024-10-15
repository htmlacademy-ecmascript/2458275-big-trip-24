import dayjs from 'dayjs';
import {HOURS, MINUTES, MIN_WORD_LENGTH, MAIN_WORDS_COUNT} from '../consts.js';
import {padToTwoDigits} from './utils.js';


const getOffersByType = (allOffers, type) => allOffers.find((offer) => offer.type === type).offers;


const getOffersById = (allOffers, type, itemsIds) => {
  const offersType = getOffersByType(allOffers, type);
  return offersType.filter((item) => itemsIds.includes(item.id));
};

const getDestinationById = (allDestinations, destination) => destination ? allDestinations.find((item) => item.id === destination) : '';

function getOfferInputUniqueDetails (title) {
  const offerTitleMainWords = title.split(/[,' ]+/).filter((word) => word.length >= MIN_WORD_LENGTH);

  let offerInputUniqueDetails = offerTitleMainWords.length >= MAIN_WORDS_COUNT ? offerTitleMainWords.slice(1, 5).join('-').toLowerCase() : offerTitleMainWords.join('-').toLowerCase();
  if (offerInputUniqueDetails.includes('the-')) {
    offerInputUniqueDetails = offerInputUniqueDetails.replace(/the-/g, '');
  }

  return offerInputUniqueDetails;
}

function humanizeEventDate(eventDate, format) {
  return dayjs(eventDate).format(format);
}

function getEventDuration (eventStart, eventEnd) {
  return dayjs(eventEnd).diff(eventStart, 'minute');
}

function getFormattedEventDuration (eventStart, eventEnd) {
  const eventDurationMinutes = getEventDuration(eventStart, eventEnd);

  const days = eventDurationMinutes > (MINUTES * HOURS) ? Math.floor(eventDurationMinutes / (MINUTES * HOURS)) : '';
  const hoursTotal = Math.floor(eventDurationMinutes / MINUTES);
  const hours = eventDurationMinutes > MINUTES ? hoursTotal % HOURS : '';
  const minutes = eventDurationMinutes - (hoursTotal * MINUTES);

  let formattedEventDuration;

  if (eventDurationMinutes < MINUTES) {
    formattedEventDuration = `${padToTwoDigits(eventDurationMinutes)}M`;
  } else
  if (eventDurationMinutes > (MINUTES * HOURS)) {
    formattedEventDuration = `${padToTwoDigits(days)}D ${padToTwoDigits(hours)}H ${padToTwoDigits(minutes)}M`;
  } else
  if (eventDurationMinutes > MINUTES && eventDurationMinutes < (MINUTES * HOURS)) {
    formattedEventDuration = `${padToTwoDigits(hours)}H ${padToTwoDigits(minutes)}M`;
  }
  return formattedEventDuration;
}

function isFuturePoint (dateFrom) {
  return dayjs().isBefore(dateFrom, 'D');
}

function isPresentPoint (dateFrom, dateTo) {
  return dayjs().isSame(dateFrom, 'D') || dayjs().isSame(dateTo, 'D') || (dayjs().isAfter(dateFrom, 'D') && dayjs().isBefore(dateTo, 'D'));
}

function isPastPoint (dateTo) {
  return dayjs().isAfter(dateTo, 'D');
}

function sortPointsByDay (pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointsByDuration (pointA, pointB) {
  const pointADuration = getEventDuration(pointA.dateFrom, pointA.dateTo);
  const pointBDuration = getEventDuration(pointB.dateFrom, pointB.dateTo);
  return pointBDuration - pointADuration;
}

function sortPointsByPrice (pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}


export {humanizeEventDate, getFormattedEventDuration, isFuturePoint, isPresentPoint, isPastPoint, sortPointsByDay, sortPointsByDuration, sortPointsByPrice, getOffersByType, getOffersById, getOfferInputUniqueDetails, getDestinationById, isDatesEqual};
