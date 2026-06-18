import { capitalize } from "./util.js";
import {
  createCustomElement,
  createDisplayCard,
  createErrorParagraph,
  createImage,
  createPElement,
  createTeamCard,
} from "./components/ui-components.js";
import {
  appendError,
  removeLoading,
  removeError,
  appendLoading,
} from "./components/ui-feedback.js";

const LOADING_ID = "loading-p";
const INPUT_ERROR_ID = "pokemon-input-error";
const TEAM_ERROR_ID = "pokemon-team-error";
const FULL_TEAM_ERROR_ID = "team-full-error";

export default class DexView {
  infoDiv;
  teamDiv;
  teamGrid;
  nameInput;

  constructor({ infoDivId, teamDivId, teamGridId, nameInputId }) {
    this.infoDiv = document.getElementById(infoDivId);
    this.teamDiv = document.getElementById(teamDivId);
    this.teamGrid = document.getElementById(teamGridId);
    this.nameInput = document.getElementById(nameInputId);

    this.bindEvents();
  }

  bindEvents() {
    this.infoDiv.addEventListener("click", (e) => {
      if (e.target.dataset.action === "add") {
        const pokemonName = e.target.dataset.name;
        const imageUrl = e.target.dataset.image;

        document.dispatchEvent(
          new CustomEvent("pokemon:add-to-team", {
            detail: { name: pokemonName, image: imageUrl },
          }),
        );
        return;
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target === this.nameInput) return;
      removeError({
        element: this.nameInput,
        errorParId: INPUT_ERROR_ID,
      });
      if (e.target.dataset.action === "add") return;
      removeError({ element: this.infoDiv, errorParId: TEAM_ERROR_ID });
      removeError({ element: this.teamDiv, errorParId: FULL_TEAM_ERROR_ID });
    });

    this.teamGrid.addEventListener("click", (e) => {
      const cardDiv = e.target.closest("[data-name]");
      if (!cardDiv) return;
      const {
        dataset: { name },
      } = cardDiv;

      document.dispatchEvent(
        new CustomEvent("pokemon:remove-from-team", {
          detail: { name },
        }),
      );
    });
  }

  getSearchValue() {
    return this.nameInput.value;
  }

  displayPokemonData(cleanData) {
    this.infoDiv.classList.remove("hidden");

    const infoCard = createDisplayCard(cleanData);

    this.infoDiv.replaceChildren(infoCard);
  }

  hidePokemonData() {
    this.infoDiv.replaceChildren();
    this.infoDiv.classList.add("hidden");
  }

  clearSearchInput() {
    this.nameInput.value = "";
  }

  showFetchError(message) {
    this.infoDiv.classList.remove("hidden");
    const errorParagraph = createErrorParagraph(message);

    this.infoDiv.replaceChildren(errorParagraph);
  }

  addErrorMessage() {
    appendError({
      element: this.nameInput,
      errorParId: INPUT_ERROR_ID,
      message: "O nome não pode ser vazio",
    });
  }

  addTeamErrorMessage(name) {
    appendError({
      element: this.infoDiv,
      errorParId: TEAM_ERROR_ID,
      message: `${capitalize(name)} já está na sua equipe!`,
    });
  }

  addFullErrorMessage() {
    appendError({
      element: this.teamDiv,
      errorParId: FULL_TEAM_ERROR_ID,
      message: "Sua equipe já está cheia!",
    });
  }

  showLoading() {
    this.infoDiv.classList.remove("hidden");
    appendLoading({
      element: this.infoDiv,
      text: "Carregando...",
      loadingParId: LOADING_ID,
    });
  }

  hideLoading() {
    removeLoading({ loadingParId: LOADING_ID });
  }

  appendCard(name, image) {
    this.teamDiv.classList.remove("hidden");

    const card = createTeamCard(name, image);
    this.teamGrid.appendChild(card);
  }

  removeCard(name) {
    const card = this.teamGrid.querySelector(`[data-name=${name}]`);
    if (card) card.remove();
  }

  hideTeamSection() {
    this.teamDiv.classList.add("hidden");
  }
}
