export default class OffersModel{
  #eventApiService = null;
  #offers = [];

  constructor(eventApiService) {
    this.#eventApiService = eventApiService;
  }

  get offers () {
    return this.#offers;
  }

  async init() {
    try {
      const offers = await this.#eventApiService.offers;
      this.#offers = offers;
    } catch(err) {
      this.#offers = [];
    }
  }
}
