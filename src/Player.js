module.exports = class Player {
  constructor({ id, ip }) {
    this.id = id;
    this.ip = ip;
    this.order = null;
    this.score = 0;
    this.rack = [];
  }

  giveTiles(tiles) {
    this.rack = this.rack.concat(tiles);
  }

  removeTiles(letters) {
    letters.forEach((letter) => {
      const index = this.rack.findIndex((tile) => tile.letter === letter);
      this.rack.splice(index, 1);
    });
  }
};
