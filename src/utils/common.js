const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const isEscapeKey = (evt) => evt.key === 'Escape';

const padToTwoDigits = (number) => number.toString().padStart(2, '0');

const changeSpaceToHyphen = (string) => string.replace(/\s+/g, '-').toLowerCase();

export {padToTwoDigits, capitalize, isEscapeKey, changeSpaceToHyphen};

