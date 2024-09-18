import {mockOffers} from '../mock/offers.js';

export default class OffersModel {
  offers = mockOffers;

  getOffers () {
    return this.offers;
  }

  getOffersByType (type) {
    return this.getOffers().find((offer) => offer.type === type);
  }

  getOffersById (type, itemsIds) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsIds.includes(item.id));
  }
}
