const BLANK_POINT = {
  'id': '',
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight'
};

const TIME_FORMAT = {
  fullDateAndTime: 'DD/MM/YY HH:mm',
  eventDate: 'MMM DD',
  fullEventDate: 'YYYY-MM-DD',
  eventTime: 'HH:mm',

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

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
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
};

const HOURS = 24;
const MINUTES = 60;
const MIN_WORD_LENGTH = 3;
const MAIN_WORDS_COUNT = 3;

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export {BLANK_POINT, TIME_FORMAT, HOURS, MINUTES, MIN_WORD_LENGTH, MAIN_WORDS_COUNT, EVENT_TYPES, FilterType, Mode, SortType, UserAction, UpdateType, Method};
