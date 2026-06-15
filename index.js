import { UI } from "./ui.js";

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";

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
      UI.addErrorMessage(
        "pokemon-name-input",
        "pokemon-input-error",
        "O nome não pode ser vazio",
      );
      return;
    }
    UI.showLoading("pokemon-info-div", "Carregando...", "loading-p");

    try {
      const pokemonData = await fetchPokemonData(pokemonName);
      UI.displayPokemonData("pokemon-info-div", pokemonData);
    } finally {
      UI.hideLoading("loading-p");
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
  UI.removeErrorMessage("pokemon-name-input", "pokemon-input-error");
});

document.addEventListener("pokemon:add-to-team", function (event) {
  const {
    detail: { name, image },
  } = event;

  UI.appendCard("pokemon-team-div", UI.createCard(name, image));
});
