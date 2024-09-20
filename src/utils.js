import dayjs from 'dayjs';
import {HOURS, MINUTES} from './consts.js';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const isEscapeKey = (evt) => evt.key === 'Escape';

function humanizeEventDate(eventDate, format) {
  return dayjs(eventDate).format(format);
}

function getEventDuration (eventStart, eventEnd) {
  const eventDurationDays = dayjs(eventEnd).diff(eventStart, 'day');
  const eventDurationHours = dayjs(eventEnd).diff(eventStart, 'hour');
  const eventDurationMinutes = dayjs(eventEnd).diff(eventStart, 'minute');

  const days = eventDurationDays > 0 ? Math.floor(eventDurationDays) : '';
  const hours = eventDurationHours > HOURS ? Math.floor(eventDurationHours - (eventDurationDays * HOURS)) : '';
  const minutes = eventDurationMinutes > MINUTES ? eventDurationMinutes % MINUTES : '';

  const formattedEventDuration = `${padToTwoDigits(days)}D ${padToTwoDigits(hours)}H ${padToTwoDigits(minutes)}M`;
  return formattedEventDuration;
}

function padToTwoDigits(number) {
  return number.toString().padStart(2, '0');
}

export {getRandomArrayElement, humanizeEventDate, getEventDuration, capitalize, isEscapeKey};
