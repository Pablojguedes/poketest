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
  const div = createCustomElement({
    tag: "div",
    classes: [
      "relative",
      "border",
      "rounded",
      "p-2",
      "flex",
      "flex-col",
      "items-center",
      "bg-gray-50",
      "shadow-sm",
      "cursor-pointer",
    ],
    dataset: { name },
  });

  const heading = createCustomElement({
    tag: "h3",
    text: capitalize(name),
    classes: ["font-bold", "text-sm", "mt-2"],
  });

  const image = createImage(imageSrc, capitalize(name), ["w-16", "h-16"]);

  const removeButton = createCustomElement({
    tag: "button",
    text: "x",
    classes: [
      "absolute",
      "-top-2",
      "-right-2",
      "bg-red-500",
      "text-white",
      "w-5",
      "h-5",
      "text-xs",
      "font-bold",
      "flex",
      "items-center",
      "justify-center",
      "rounded-full",
      "hover:bg-red-600",
      "transition-colors",
      "shadow-md",
    ],
    dataset: { name, action: "remove" },
  });

  div.appendChild(image);
  div.appendChild(heading);
  div.appendChild(removeButton);

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

export function createMovesSelect({ selectId, movesList = [], classes = [] }) {
  const select = document.createElement("select");
  select.id = selectId;

  select.multiple = true;

  const defaultClasses = [
    "w-full",
    "border",
    "border-gray-300",
    "rounded-lg",
    "p-2",
    "mb-4",
    "text-gray-700",
    "bg-white",
    "focus:ring-2",
    "focus:ring-blue-500",
    "outline-none",
    "transition-all",
    "h-48",
    "overflow-y-auto",
    "shadow-inner",
  ];

  select.classList.add(...defaultClasses);
  if (classes.length > 0) {
    select.classList.add(...classes);
  }

  movesList.forEach((move) => {
    const option = document.createElement("option");
    option.value = move;
    option.text = capitalize(move);

    option.classList.add(
      "p-2",
      "cursor-pointer",
      "rounded",
      "hover:bg-blue-50",
    );

    select.appendChild(option);
  });

  return select;
}

export function createMoveBadge(moveName, pokemonName) {
  const badge = createCustomElement({
    tag: "div",
    classes: [
      "inline-flex",
      "items-center",
      "bg-blue-100",
      "text-blue-800",
      "px-3",
      "py-1",
      "rounded-full",
      "text-sm",
      "font-semibold",
      "shadow-sm",
      "m-1",
      "border",
      "border-blue-200",
      "transition-all",
    ],
  });

  const text = createCustomElement({
    tag: "span",
    text: capitalize(moveName),
    classes: ["mr-2"],
  });

  const removeBtn = createCustomElement({
    tag: "button",
    text: "×",
    classes: [
      "text-blue-500",
      "hover:text-blue-800",
      "hover:bg-blue-200",
      "rounded-full",
      "w-5",
      "h-5",
      "flex",
      "items-center",
      "justify-center",
      "transition-colors",
      "font-bold",
      "leading-none",
      "focus:outline-none",
    ],
    dataset: {
      action: "remove-move",
      move: moveName,
    },
  });

  badge.appendChild(text);
  badge.appendChild(removeBtn);

  return badge;
}
