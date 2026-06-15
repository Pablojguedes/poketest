import { capitalize } from "./util.js";
import UIComponents from "./components/ui-components.js";

export default class DexView {
  infoDiv;
  teamDiv;
  teamGrid;

  constructor(infoDivId, teamDivId, teamGridId) {
    this.infoDiv = document.getElementById(infoDivId);
    this.teamDiv = document.getElementById(teamDivId);
    this.teamGrid = document.getElementById(teamGridId);
  }

  displayPokemonData(pokemonData) {
    if (!pokemonData) {
      const errorParagraph = UIComponents.createErrorParagraph(
        "Pokémon não encontrado. Tente outro nome!",
      );

      this.infoDiv.replaceChildren(errorParagraph);
      return;
    }

    const fragment = document.createDocumentFragment();

    const titleDiv = document.createElement("div");

    const imageSrc =
      pokemonData.sprites.versions["generation-v"]["black-white"].animated[
        "front_default"
      ];
    const selectButton = UIComponents.createCustomElement({
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

    const title = UIComponents.createCustomElement({
      tag: "h2",
      text: capitalize(pokemonData.name),
      classes: ["font-bold"],
    });

    titleDiv.appendChild(title);
    titleDiv.appendChild(selectButton);
    titleDiv.classList.add("flex", "justify-between", "items-start");

    const image = UIComponents.createImage(
      imageSrc,
      capitalize(pokemonData.name),
      ["w-16", "h-16"],
    );

    fragment.appendChild(titleDiv);
    fragment.appendChild(image);
    fragment.appendChild(
      UIComponents.createPElement("Height", pokemonData.height),
    );
    fragment.appendChild(
      UIComponents.createPElement("Weight", pokemonData.weight),
    );
    fragment.appendChild(
      UIComponents.createPElement(
        "Types",
        pokemonData.types.map((type) => type.type.name).join(", "),
      ),
    );
    this.infoDiv.replaceChildren(fragment);
  }

  appendCard(name, image) {
    this.teamDiv.classList.remove("hidden");

    const card = UIComponents.createTeamCard(name, image);
    this.teamGrid.appendChild(card);
  }
}
