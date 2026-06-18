import { capitalize } from "../util.js";

export function createPElement(title, value) {
  const element = document.createElement("p");

  const strong = document.createElement("strong");
  const strongTextNode = document.createTextNode(`${title}: `);
  strong.appendChild(strongTextNode);
  element.appendChild(strong);

  const infoTextNode = document.createTextNode(value);
  element.appendChild(infoTextNode);

  return element;
}

export function createErrorParagraph(text, extraClasses = []) {
  const errorParagraph = document.createElement("p");
  const invalidTextNode = document.createTextNode(text);
  errorParagraph.appendChild(invalidTextNode);

  errorParagraph.classList.add("text-red-500", ...extraClasses);
  return errorParagraph;
}

export function createTeamCard({ name, imageSrc }) {
  const div = document.createElement("div");

  div.dataset.name = name;

  div.classList.add(
    "border",
    "rounded",
    "p-2",
    "flex",
    "flex-col",
    "items-center",
    "bg-gray-50",
    "shadow-sm",
    "cursor-pointer",
  );

  const heading = createCustomElement({
    tag: "h3",
    text: capitalize(name),
    classes: ["font-bold", "text-sm", "mt-2"],
  });

  const image = createImage(imageSrc, capitalize(name), ["w-16", "h-16"]);

  div.appendChild(image);
  div.appendChild(heading);

  return div;
}

export function createCustomElement({
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

export function createImage(imageSrc, imageAlt, classes = []) {
  const image = document.createElement("img");
  image.src = imageSrc;
  image.alt = imageAlt;
  image.classList.add(...classes);
  return image;
}

export function createDisplayCard({ name, imageSrc, weight, height, types }) {
  const fragment = document.createDocumentFragment();

  const titleDiv = document.createElement("div");

  const selectButton = createCustomElement({
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
    dataset: {
      name: name.toLowerCase(),
      image: imageSrc,
      action: "add",
    },
  });

  const title = createCustomElement({
    tag: "h2",
    text: capitalize(name),
    classes: ["font-bold"],
  });

  titleDiv.appendChild(title);
  titleDiv.appendChild(selectButton);
  titleDiv.classList.add("flex", "justify-between", "items-start");

  const image = createImage(imageSrc, capitalize(name), ["w-16", "h-16"]);

  fragment.appendChild(titleDiv);
  fragment.appendChild(image);
  fragment.appendChild(createPElement("Height", height));
  fragment.appendChild(createPElement("Weight", weight));
  fragment.appendChild(createPElement("Types", types.join(", ")));

  return fragment;
}
