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

const HOURS = 24;
const MINUTES = 60;

export {TIME_FORMAT, HOURS, MINUTES, EVENT_TYPES};
