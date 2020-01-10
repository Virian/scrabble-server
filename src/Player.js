module.exports = class Player {
  constructor(ip) {
    this.ip = ip; // will be used a player identifier
    this.score = 0;
    this.rack = [];
  }

  giveTiles(tiles) {
    this.rack = this.rack.concat(tiles);
  }
};
