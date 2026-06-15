import { capitalize } from "./util.js";

export class UI {
  static addErrorMessage(inputIdentifier, errorIdentifier, errorMessage) {
    const pokemonInput = document.getElementById(inputIdentifier);

    if (!pokemonInput.classList.contains("border-red-500")) {
      pokemonInput.classList.add("border-red-500");
    }

    if (!document.getElementById(errorIdentifier)) {
      const invalidFormParagraph = this.createErrorParagraph(errorMessage, [
        "text-sm",
      ]);

      invalidFormParagraph.id = errorIdentifier;
      pokemonInput.insertAdjacentElement("afterend", invalidFormParagraph);
    }
  }
  static removeErrorMessage(inputIdentifier, errorIdentifier) {
    const pokemonInput = document.getElementById(inputIdentifier);

    if (pokemonInput.classList.contains("border-red-500"))
      pokemonInput.classList.remove("border-red-500");

    const invalidFormPar = document.getElementById(errorIdentifier);
    if (invalidFormPar) {
      invalidFormPar.remove();
    }
  }

  static displayPokemonData(pokemonDiv, pokemonData) {
    const pokemonInfoDiv = document.getElementById(pokemonDiv);

    if (!pokemonData) {
      const errorParagraph = this.createErrorParagraph(
        "Pokémon não encontrado. Tente outro nome!",
      );

      pokemonInfoDiv.replaceChildren(errorParagraph);
      return;
    }

    const fragment = document.createDocumentFragment();

    const titleDiv = document.createElement("div");

    const selectButton = this.createCustomElement("button", "+", [
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
    ]);

    const title = this.createCustomElement("h2", capitalize(pokemonData.name), [
      "font-bold",
    ]);

    titleDiv.appendChild(title);
    titleDiv.appendChild(selectButton);
    titleDiv.classList.add("flex", "justify-between", "items-start");

    const image = document.createElement("img");
    image.src =
      pokemonData.sprites.versions["generation-v"]["black-white"].animated[
        "front_default"
      ];
    image.alt = pokemonData.name;

    fragment.appendChild(titleDiv);
    fragment.appendChild(image);
    fragment.appendChild(this.createPElement("Height", pokemonData.height));
    fragment.appendChild(this.createPElement("Weight", pokemonData.weight));
    fragment.appendChild(
      this.createPElement(
        "Types",
        pokemonData.types.map((type) => type.type.name).join(", "),
      ),
    );
    pokemonInfoDiv.replaceChildren(fragment);
  }

  static createPElement(title, value) {
    const element = document.createElement("p");

    const strong = document.createElement("strong");
    const strongTextNode = document.createTextNode(`${title}: `);
    strong.appendChild(strongTextNode);
    element.appendChild(strong);

    const infoTextNode = document.createTextNode(value);
    element.appendChild(infoTextNode);

    return element;
  }

  static createErrorParagraph(text, extraClasses = []) {
    const errorParagraph = document.createElement("p");
    const invalidTextNode = document.createTextNode(text);
    errorParagraph.appendChild(invalidTextNode);

    errorParagraph.classList.add("text-red-500", ...extraClasses);
    return errorParagraph;
  }

  static showLoading(parent, text, childId) {
    const pokemonInfoDiv = document.getElementById(parent);
    const loadingParagraph = document.createElement("p");
    const loadingText = document.createTextNode(text);
    loadingParagraph.appendChild(loadingText);
    loadingParagraph.id = childId;
    pokemonInfoDiv.replaceChildren(loadingParagraph);
  }

  static hideLoading(childId) {
    const loadingParagraph = document.getElementById(childId);
    if (loadingParagraph) loadingParagraph.remove();
  }

  static createCustomElement(type, text = "", classes = []) {
    const element = document.createElement(type);
    if (text) {
      const textNode = document.createTextNode(text);
      element.appendChild(textNode);
    }

    if (classes.length > 0) {
      element.classList.add(...classes);
    }
    return element;
  }
}
