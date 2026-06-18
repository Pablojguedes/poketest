export default class Pokemon {
  name;
  imageSrc;
  height;
  weight;
  types;
  moves;

  constructor(name, imageSrc, height, weight, types = [], moves = []) {
    this.name = name;
    this.imageSrc = imageSrc;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.moves = moves;
  }
}
