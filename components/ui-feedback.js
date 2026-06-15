import { createErrorParagraph } from "./ui-components.js";

export function addErrorMessage(
  inputIdentifier,
  errorIdentifier,
  errorMessage,
) {
  const pokemonInput = document.getElementById(inputIdentifier);

  if (!pokemonInput.classList.contains("border-red-500")) {
    pokemonInput.classList.add("border-red-500");
  }

  if (!document.getElementById(errorIdentifier)) {
    const invalidFormParagraph = createErrorParagraph(errorMessage, [
      "text-sm",
    ]);

    invalidFormParagraph.id = errorIdentifier;
    pokemonInput.insertAdjacentElement("afterend", invalidFormParagraph);
  }
}

export function removeErrorMessage(inputIdentifier, errorIdentifier) {
  const pokemonInput = document.getElementById(inputIdentifier);

  if (pokemonInput.classList.contains("border-red-500"))
    pokemonInput.classList.remove("border-red-500");

  const invalidFormPar = document.getElementById(errorIdentifier);
  if (invalidFormPar) {
    invalidFormPar.remove();
  }
}

export function showLoading(parent, text, childId) {
  const pokemonInfoDiv = document.getElementById(parent);
  const loadingParagraph = document.createElement("p");
  const loadingText = document.createTextNode(text);
  loadingParagraph.appendChild(loadingText);
  loadingParagraph.id = childId;
  pokemonInfoDiv.replaceChildren(loadingParagraph);
}

export function hideLoading(childId) {
  const loadingParagraph = document.getElementById(childId);
  if (loadingParagraph) loadingParagraph.remove();
}
