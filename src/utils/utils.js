const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const isEscapeKey = (evt) => evt.key === 'Escape';


function padToTwoDigits(number) {
  return number.toString().padStart(2, '0');
}

export {padToTwoDigits, capitalize, isEscapeKey};

