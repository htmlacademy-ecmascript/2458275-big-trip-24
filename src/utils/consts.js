const AUTHORIZATION = 'Basic tmy8qnrywc9dgq';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const HOURS = 24;
const MINUTES = 60;
const MIN_WORD_LENGTH = 3;
const MAIN_WORDS_COUNT = 3;

const BLANK_POINT = {
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight'
};

const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const TimeFormatType = {
  FULL_DATE_AND_TIME: 'DD/MM/YY HH:mm',
  SHORT_DATE: 'MMM DD',
  FULL_DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'pice',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {AUTHORIZATION, END_POINT, BLANK_POINT, HOURS, MINUTES, MIN_WORD_LENGTH, MAIN_WORDS_COUNT, EVENT_TYPES, TimeFormatType, FilterType, Mode, SortType, UserAction, UpdateType, Method, TimeLimit, NoPointsTextType};
