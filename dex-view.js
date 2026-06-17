import { capitalize } from "./util.js";
import {
  createCustomElement,
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
    });
  }

  getSearchValue() {
    return this.nameInput.value;
  }

  displayPokemonData(pokemonData) {
    this.infoDiv.classList.remove("hidden");

    const fragment = document.createDocumentFragment();

    const titleDiv = document.createElement("div");

    const imageSrc =
      pokemonData.sprites.versions["generation-v"]["black-white"].animated[
        "front_default"
      ];
    const selectButton = createCustomElement({
      tag: "button",
      text: "+",
      classes: [
        "bg-blue-500",
        "text-white",
        "w-8",
        "h-8",
        "flex",
        "items-center",
        "justify-center",
        "rounded-full",
        "hover:bg-blue-600",
        "transition-colors",
      ],
      id: "pokemon-select-button",
      dataset: {
        name: pokemonData.name.toLowerCase(),
        image: imageSrc,
        action: "add",
      },
    });

    const title = createCustomElement({
      tag: "h2",
      text: capitalize(pokemonData.name),
      classes: ["font-bold"],
    });

    titleDiv.appendChild(title);
    titleDiv.appendChild(selectButton);
    titleDiv.classList.add("flex", "justify-between", "items-start");

    const image = createImage(imageSrc, capitalize(pokemonData.name), [
      "w-16",
      "h-16",
    ]);

    fragment.appendChild(titleDiv);
    fragment.appendChild(image);
    fragment.appendChild(createPElement("Height", pokemonData.height));
    fragment.appendChild(createPElement("Weight", pokemonData.weight));
    fragment.appendChild(
      createPElement(
        "Types",
        pokemonData.types.map((type) => type.type.name).join(", "),
      ),
    );
    this.infoDiv.replaceChildren(fragment);
  }

  showFetchError(message) {
    this.infoDiv.classList.remove("hidden");
    const errorParagraph = createErrorParagraph(message);

    this.infoDiv.replaceChildren(errorParagraph);
  }

  appendCard(name, image) {
    this.teamDiv.classList.remove("hidden");

    const card = createTeamCard(name, image);
    this.teamGrid.appendChild(card);
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
}
