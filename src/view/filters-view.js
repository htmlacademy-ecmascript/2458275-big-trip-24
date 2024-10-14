import AbstractView from '../framework/view/abstract-view.js';

function createFiltersItemTemplate(filter, isChecked) {
  const {type, count} = filter;
  return `<div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${isChecked ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}
      />
      <label class="trip-filters__filter-label" for="filter-${type}">
      ${type}
      </label>
      </div>`;
}

function createFiltersTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFiltersItemTemplate(filter, index === 0))
    .join('');
  return (`<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">
      Accept filter
    </button>
  </form>`);
}
export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
