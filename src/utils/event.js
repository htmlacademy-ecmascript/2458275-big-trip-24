import dayjs from 'dayjs';
import {HOURS, MINUTES} from '../consts.js';
import {capitalize, padToTwoDigits} from '../utils/utils.js';

function createOffersTemplate(offers, currentOffers, type) {
  return offers.map((offer) => `<div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}"  ${currentOffers.includes(offer) ? 'checked' : ''}>
                      <label class="event__offer-label" for="event-offer-${type}-1">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                      </label>
                    </div>`).join('');
}

function createTypeTemplate (allTypes, chosenType, type) {
  return allTypes.map ((currentType) =>`<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === chosenType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${capitalize(currentType)}</label>
  </div>`).join('');
}

function humanizeEventDate(eventDate, format) {
  return dayjs(eventDate).format(format);
}

function getEventDuration (eventStart, eventEnd) {
  const eventDurationMinutes = dayjs(eventEnd).diff(eventStart, 'minute');

  const days = eventDurationMinutes > (MINUTES * HOURS) ? Math.floor(eventDurationMinutes / (MINUTES * HOURS)) : '';
  const hours = eventDurationMinutes > MINUTES ? Math.floor(eventDurationMinutes / MINUTES) : '';
  const minutes = eventDurationMinutes - hours * MINUTES;

  const formattedEventDuration = eventDurationMinutes < MINUTES ? `${padToTwoDigits(eventDurationMinutes)}M` : `${padToTwoDigits(days)}D ${padToTwoDigits(hours)}H ${padToTwoDigits(minutes)}M`;
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

export {createOffersTemplate, createTypeTemplate, humanizeEventDate, getEventDuration, isFuturePoint, isPresentPoint, isPastPoint};
