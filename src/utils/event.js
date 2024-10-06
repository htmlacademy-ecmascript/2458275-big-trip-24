import dayjs from 'dayjs';
import {HOURS, MINUTES} from '../consts.js';
import {capitalize, padToTwoDigits} from '../utils/utils.js';

function createOffersTemplate(offers, chosenOffers, type) {
  return offers.map((offer) => `<div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}"  ${chosenOffers.includes(offer) ? 'checked' : ''}>
                      <label class="event__offer-label" for="event-offer-${type}-1">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                      </label>
                    </div>`).join('');
}

function createTypeTemplate (allTypes, chosenType) {
  return allTypes.map ((type) =>`<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === chosenType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalize(type)}</label>
  </div>`).join('');
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

export {createOffersTemplate, createTypeTemplate, humanizeEventDate, getFormattedEventDuration, isFuturePoint, isPresentPoint, isPastPoint, sortPointsByDay, sortPointsByDuration, sortPointsByPrice};
