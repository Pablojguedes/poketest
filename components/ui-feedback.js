import UIComponents from "./ui-components.js";
export default class UIFeedback {
  static addErrorMessage(inputIdentifier, errorIdentifier, errorMessage) {
    const pokemonInput = document.getElementById(inputIdentifier);

    if (!pokemonInput.classList.contains("border-red-500")) {
      pokemonInput.classList.add("border-red-500");
    }

    if (!document.getElementById(errorIdentifier)) {
      const invalidFormParagraph = UIComponents.createErrorParagraph(
        errorMessage,
        ["text-sm"],
      );

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
}
