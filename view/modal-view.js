import { createMovesSelect } from "../components/ui-components.js";
import {
  appendError,
  appendLoading,
  removeError,
  removeLoading,
} from "../components/ui-feedback.js";

const LOADING_ID = "modal-loading-p";
const ERROR_ID = "modal-error";

export default class MovesModalView {
  dialog;
  addButton;
  closeButton;
  selectDiv;

  constructor({ dialogId }) {
    this.dialog = document.getElementById(dialogId);

    this.addButton = this.dialog.querySelector("#modal-add-button");
    this.closeButton = this.dialog.querySelector("#modal-close-button");
    this.selectDiv = this.dialog.querySelector("#moves-select-div");

    this.bindEvents();
  }

  bindEvents() {
    this.addButton.addEventListener("click", (e) => {});
    this.closeButton.addEventListener("click", (e) => {
      this.close();
    });
  }

  open() {
    this.dialog.showModal();
  }

  close() {
    removeError({ element: this.selectDiv, errorParId: ERROR_ID });
    this.dialog.close();
  }

  showLoading() {
    appendLoading({
      element: this.selectDiv,
      text: "Carregando...",
      loadingParId: LOADING_ID,
    });
  }

  hideLoading() {
    removeLoading({ loadingParId: LOADING_ID });
  }

  showFetchError(message) {
    appendError({
      errorParId: ERROR_ID,
      element: this.selectDiv,
      message,
    });
  }

  appendSelect(movesList) {
    const select = createMovesSelect({ movesList });
    this.selectDiv.replaceChildren(select);
  }
}
