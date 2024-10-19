export default class DestinationsModel{
  #eventApiService = null;
  #destinations = [];

  constructor(eventApiService) {
    this.#eventApiService = eventApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const destinations = await this.#eventApiService.destinations;
      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
      this._notify(UpdateType.ERROR);
    }
  }
}
