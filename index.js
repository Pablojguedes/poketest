import DexView from "./dex-view.js";
import Team from "./team.js";

let lastSearchedPokemon = "";
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

  team.members.forEach(({ name, imageUrl }) =>
    dexView.appendCard(name, imageUrl),
  );
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
      dexView.displayPokemonData(pokemonData);
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
  const {
    detail: { name, image },
  } = event;

  if (team.isFull()) {
    dexView.addFullErrorMessage();
    return;
  }

  if (team.hasMember(name)) {
    dexView.addTeamErrorMessage(name);
    return;
  }

  team.addMember({ name, imageUrl: image });
  team.save();

  dexView.appendCard(name, image);
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
