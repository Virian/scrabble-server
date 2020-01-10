module.exports = class Tile {
  constructor({ letter, score }) {
    this.letter = letter;
    this.score = score;
  }

  setLetter(letter) {
    this.letter = letter;
  }
};
