export const MAX_MOVES = 4;
export default class Pokemon {
  name;
  imageSrc;
  height;
  weight;
  types;
  moves;

  constructor({ name, imageSrc, height, weight, types = [], moves = [] }) {
    this.name = name;
    this.imageSrc = imageSrc;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.moves = moves;
  }

  moveslotIsFull() {
    return this.moves.length === MAX_MOVES;
  }

  hasMove(move) {
    return this.moves.some((currentMove) => currentMove === move);
  }

  addMove(move) {
    if (this.moveslotIsFull()) throw new Error("MAX_MOVES_REACHED");
    if (this.hasMove(move)) throw new Error("DUPLICATE_MOVE");

    this.moves.push(move);
    return true;
  }

  removeMove(move) {
    this.moves = this.moves.filter((currentMove) => currentMove !== move);
  }
}
