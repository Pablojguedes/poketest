import { createErrorParagraph } from "./ui-components.js";

export function appendError({ element, errorParId, message }) {
  element.classList.add("border", "border-red-500");

  if (!document.getElementById(errorParId)) {
    const errorMessagePar = createErrorParagraph(message, ["text-sm"]);

    errorMessagePar.id = errorParId;
    element.insertAdjacentElement("afterend", errorMessagePar);
  }
}

export function removeError({ element, errorParId }) {
  element.classList.remove("border", "border-red-500");

  const invalidFormPar = document.getElementById(errorParId);
  if (invalidFormPar) {
    invalidFormPar.remove();
  }
}

export function appendLoading({ element, text, loadingParId }) {
  const loadingParagraph = document.createElement("p");
  const loadingText = document.createTextNode(text);
  loadingParagraph.appendChild(loadingText);
  loadingParagraph.id = loadingParId;
  element.replaceChildren(loadingParagraph);
}

export function removeLoading({ loadingParId }) {
  const loadingParagraph = document.getElementById(loadingParId);
  if (loadingParagraph) loadingParagraph.remove();
}
