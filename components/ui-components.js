import { capitalize } from "../util.js";

export default class UIComponents {
  static createPElement(title, value) {
    const element = document.createElement("p");

    const strong = document.createElement("strong");
    const strongTextNode = document.createTextNode(`${title}: `);
    strong.appendChild(strongTextNode);
    element.appendChild(strong);

    const infoTextNode = document.createTextNode(value);
    element.appendChild(infoTextNode);

    return element;
  }

  static createErrorParagraph(text, extraClasses = []) {
    const errorParagraph = document.createElement("p");
    const invalidTextNode = document.createTextNode(text);
    errorParagraph.appendChild(invalidTextNode);

    errorParagraph.classList.add("text-red-500", ...extraClasses);
    return errorParagraph;
  }

  static createTeamCard(name, imageUrl) {
    const div = document.createElement("div");

    div.classList.add(
      "border",
      "rounded",
      "p-2",
      "flex",
      "flex-col",
      "items-center",
      "bg-gray-50",
      "shadow-sm",
    );

    const heading = this.createCustomElement({
      tag: "h3",
      text: capitalize(name),
      classes: ["font-bold", "text-sm", "mt-2"],
    });

    const image = this.createImage(imageUrl, capitalize(name), [
      "w-16",
      "h-16",
    ]);

    div.appendChild(image);
    div.appendChild(heading);

    return div;
  }

  static createCustomElement({
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

  static createImage(imageSrc, imageAlt, classes = []) {
    const image = document.createElement("img");
    image.src = imageSrc;
    image.alt = imageAlt;
    image.classList.add(...classes);
    return image;
  }
}
