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

    const imageSrc =
      pokemonData.sprites.versions["generation-v"]["black-white"].animated[
        "front_default"
      ];
    const selectButton = this.createCustomElement({
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
      dataset: { name: pokemonData.name.toLowerCase(), image: imageSrc },
    });

    const title = this.createCustomElement({
      tag: "h2",
      text: capitalize(pokemonData.name),
      classes: ["font-bold"],
    });

    titleDiv.appendChild(title);
    titleDiv.appendChild(selectButton);
    titleDiv.classList.add("flex", "justify-between", "items-start");

    const image = document.createElement("img");
    image.src = imageSrc;

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

  static createCustomElement({
    tag,
    text = "",
    classes = [],
    id = "",
    dataset = {},
  }) {
    const element = document.createElement(tag);
    if (text) {
      const textNode = document.createTextNode(text);
      element.appendChild(textNode);
    }

    if (classes.length > 0) {
      element.classList.add(...classes);
    }
    if (id) {
      element.id = id;
    }
    if (Object.keys(dataset).length > 0) {
      Object.keys(dataset).forEach((key) => {
        element.dataset[key] = dataset[key];
      });
    }
    return element;
  }

  static appendCard(divId, card) {
    const teamSection = document.getElementById("pokemon-team-section");
    teamSection.classList.remove("hidden");

    const gridDiv = document.getElementById("pokemon-team-grid");
    gridDiv.appendChild(card);
  }

  static createCard(name, imageUrl) {
    const div = document.createElement("div");

    div.classList.add(
      "border",
      "rounded",
      "p-2",
      "flex",
      "flex-col",
      "items-center",
      "bg-gray-50",
      "shadow-sm",
    );

    const heading = this.createCustomElement({
      tag: "h3",
      text: capitalize(name),
      classes: ["font-bold", "text-sm", "mt-2"],
    });

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = name;
    image.classList.add("w-16", "h-16"); 
    
    div.appendChild(image);
    div.appendChild(heading);

    return div;
  }
}
