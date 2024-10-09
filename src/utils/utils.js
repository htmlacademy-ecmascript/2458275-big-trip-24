
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const isEscapeKey = (evt) => evt.key === 'Escape';


function padToTwoDigits(number) {
  return number.toString().padStart(2, '0');
}

export {getRandomArrayElement, padToTwoDigits, capitalize, isEscapeKey};

