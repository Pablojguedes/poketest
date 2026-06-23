import {
  createMoveBadge,
  createMovesSelect,
} from "../components/ui-components.js";
import {
  appendError,
  appendLoading,
  removeError,
  removeLoading,
} from "../components/ui-feedback.js";
import { MAX_MOVES } from "../domain/pokemon.js";

const LOADING_ID = "modal-loading-p";
const ERROR_ID = "modal-error";
const SELECT_ID = "moves-select";

export default class MovesModalView {
  dialog;
  addButton;
  closeButton;
  selectDiv;
  currentPokemon = {};

  constructor({ dialogId }) {
    this.dialog = document.getElementById(dialogId);

    this.addButton = this.dialog.querySelector("#modal-add-button");
    this.closeButton = this.dialog.querySelector("#modal-close-button");
    this.selectDiv = this.dialog.querySelector("#moves-select-div");

    this.bindEvents();
  }

  bindEvents() {
    this.addButton.addEventListener("click", (e) => {
      const select = this.selectDiv.querySelector(`#${SELECT_ID}`);
      const selectedOptions = select.selectedOptions;
      const movesTexts = Array.from(selectedOptions).map(
        (option) => option.value,
      );
      document.dispatchEvent(
        new CustomEvent("pokemon:add-attack", {
          detail: { pokemon: this.currentPokemon, moves: movesTexts },
        }),
      );
    });
    this.closeButton.addEventListener("click", (e) => {
      this.close();
    });
    this.selectDiv.addEventListener("change", (e) => {
      const selectedOptions = Array.from(e.target.selectedOptions);

      if (selectedOptions.length > MAX_MOVES) {
        this.showError(`Você só pode escolher até ${MAX_MOVES} ataques!`);

        selectedOptions.forEach((option, index) => {
          if (index >= MAX_MOVES) {
            option.selected = false;
          }
        });
      } else {
        removeError({ element: this.selectDiv, errorParId: ERROR_ID });
      }

      this.addButton.disabled = e.target.selectedOptions.length === 0;
    });
  }

  open(pokemon) {
    this.currentPokemon = pokemon;
    this.appendMovesDiv(this.currentPokemon);
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

  showError(message) {
    appendError({
      errorParId: ERROR_ID,
      element: this.selectDiv,
      message,
    });
  }

  appendSelect(movesList) {
    const select = createMovesSelect({ selectId: SELECT_ID, movesList });
    this.selectDiv.replaceChildren(select);
  }

  removeSelect() {
    const select = document.getElementById(SELECT_ID);
    if (select) select.remove();
  }

  appendMovesDiv(pokemon) {
    const movesContainer = document.getElementById("pokemon-moves-container");
    movesContainer.innerHTML = "";

    pokemon.moves.forEach((move) => {
      const moveElement = createMoveBadge(move, pokemon.name);
      movesContainer.appendChild(moveElement);
    });
  }
}
