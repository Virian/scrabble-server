module.exports = class Tile {
  constructor({ letter, score }) {
    this.letter = letter;
    this.score = score;
    this.isBlank = !letter;
  }

  setLetter(letter) {
    this.letter = letter;
  }
};
