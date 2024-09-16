import {mockOffers} from '../mock/offers.js';

export default class OffersModel {
  offers = mockOffers;

  getOffers () {
    return this.offers;
  }

  getOffersByType (type) {
    return this.offers.find((offer) => offer.type === type);
  }

  getOffersById (type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }
}
