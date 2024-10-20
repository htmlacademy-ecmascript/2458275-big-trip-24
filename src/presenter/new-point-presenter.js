import {isEscapeKey} from '../utils/common.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType, BLANK_POINT} from '../utils/consts.js';
import PointAddView from '../view/point-add-view.js';

export default class NewPointPresenter {
  #point = BLANK_POINT;
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #handleCancel = null;

  #pointAddComponent = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({pointsListContainer, destinationsModel, offersModel, onDataChange, onDestroy, onCancel}) {
    this.#pointsListContainer = pointsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#handleCancel = onCancel;
  }

  init() {
    if (this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new PointAddView ({
      point: this.#point,
      allDestinations: this.#destinationsModel.destinations,
      allOffers: this.#offersModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick
    });

    render(this.#pointAddComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointAddComponent === null) {
      return;
    }

    this.#handleDestroy();
    this.#handleCancel();

    remove(this.#pointAddComponent);
    this.#pointAddComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointAddComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointAddComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointAddComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
