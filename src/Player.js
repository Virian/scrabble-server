module.exports = class Player {
  constructor({ id, ip}) {
    this.id = id;
    this.ip = ip;
    this.score = 0;
    this.rack = [];
  }

  giveTiles(tiles) {
    this.rack = this.rack.concat(tiles);
  }
};
