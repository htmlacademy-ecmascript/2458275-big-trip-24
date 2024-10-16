export default class OffersModel{
  #pointsApiService = null;
  #offers = [];

  constructor({pointsApiService}) {
    this.#pointsApiService = pointsApiService;
  }

  get offers () {
    return this.#offers;
  }

  async init() {
    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers;
    } catch(err) {
      this.#offers = [];
    }
  }
}
