import {capitalize} from '../utils.js';

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

export {createOffersTemplate, createTypeTemplate};
