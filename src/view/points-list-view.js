import AbstractView from '../framework/view/abstract-view.js';

function createPointsListTemplate() {
  return '<ul class="trip-events__list">';
}

export default class PointsListView extends AbstractView {
  get template() {
    return createPointsListTemplate();
  }
}


