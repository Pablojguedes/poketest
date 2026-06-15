import DexView from "./dex-view.js";
import {
  addErrorMessage,
  hideLoading,
  removeErrorMessage,
  showLoading,
} from "./components/ui-feedback.js";

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";

const dexView = new DexView(
  "pokemon-info-div",
  "pokemon-team-section",
  "pokemon-team-grid",
);

async function fetchPokemonData(pokemonName) {
  try {
    const response = await fetch(`${POKEAPI_URL}${pokemonName.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Pokémon não encontrado");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

document
  .getElementById("pokemon-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const pokemonName = document.getElementById("pokemon-name-input").value;

    if (pokemonName.trim() === "") {
      addErrorMessage(
        "pokemon-name-input",
        "pokemon-input-error",
        "O nome não pode ser vazio",
      );
      return;
    }
    showLoading("pokemon-info-div", "Carregando...", "loading-p");

    try {
      const pokemonData = await fetchPokemonData(pokemonName);
      dexView.displayPokemonData(pokemonData);
    } finally {
      hideLoading("loading-p");
    }
  });

document.addEventListener("click", function (e) {
  if (e.target.id === "pokemon-select-button") {
    const pokemonName = e.target.dataset.name;
    const imageUrl = e.target.dataset.image;

    document.dispatchEvent(
      new CustomEvent("pokemon:add-to-team", {
        detail: { name: pokemonName, image: imageUrl },
      }),
    );
    return;
  }

  if (e.target.id === "pokemon-name-input") return;
  removeErrorMessage("pokemon-name-input", "pokemon-input-error");
});

document.addEventListener("pokemon:add-to-team", function (event) {
  const {
    detail: { name, image },
  } = event;

  dexView.appendCard(name, image);
});
