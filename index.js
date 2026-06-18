import DexView from "./dex-view.js";
import Pokemon from "./domain/pokemon.js";
import Team from "./domain/team.js";

let lastSearchedPokemon = "";
let activePokemon;

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";

const dexView = new DexView({
  infoDivId: "pokemon-info-div",
  teamDivId: "pokemon-team-section",
  teamGridId: "pokemon-team-grid",
  nameInputId: "pokemon-name-input",
});

const team = new Team([]);
if (Team.hasStored()) {
  team.load();

  team.members.forEach((pokemon) => dexView.appendCard(pokemon));
}

async function fetchPokemonData(pokemonName) {
  const response = await fetch(`${POKEAPI_URL}${pokemonName.toLowerCase()}`);
  if (!response.ok) {
    const error = new Error();
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

document
  .getElementById("pokemon-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const pokemonName = dexView.getSearchValue();

    if (pokemonName.trim() === "") {
      dexView.addErrorMessage();
      return;
    }
    if (lastSearchedPokemon === pokemonName) return;

    lastSearchedPokemon = pokemonName;
    dexView.showLoading();
    try {
      const pokemonData = await fetchPokemonData(pokemonName);
      const { name, sprites, height, weight, types } = pokemonData;
      const pokemon = new Pokemon(
        name,
        sprites.versions["generation-v"]["black-white"].animated[
          "front_default"
        ],
        weight,
        height,
        types.map((type) => type.type.name),
      );
      activePokemon = pokemon;

      dexView.displayPokemonData(pokemon);
    } catch (error) {
      if (error.status === 404)
        dexView.showFetchError("Pokémon não encontrado");
      else
        dexView.showFetchError(
          "Ocorreu um erro desconhecido. Tente novamente mais tarde",
        );
    } finally {
      dexView.hideLoading();
    }
  });

document.addEventListener("pokemon:add-to-team", function (event) {
  // const {
  //   detail: { name, image },
  // } = event;

  if (team.isFull()) {
    dexView.addFullErrorMessage();
    return;
  }

  if (team.hasMember(activePokemon.name)) {
    dexView.addTeamErrorMessage(activePokemon.name);
    return;
  }

  team.addMember(activePokemon);
  team.save();

  dexView.appendCard(activePokemon);

  dexView.hidePokemonData();
  dexView.clearSearchInput();

  lastSearchedPokemon = "";
});

document.addEventListener("pokemon:remove-from-team", function (event) {
  const {
    detail: { name },
  } = event;

  if (confirm(`Você deseja remover ${name} da sua equipe?`)) {
    team.removeMember(name);
    team.save();

    dexView.removeCard(name);

    if (team.isEmpty()) dexView.hideTeamSection();
  }
});
