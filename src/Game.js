const shuffle = require('lodash/shuffle');
const tiles = require('./TilesLists/tiles.pl');
const Tile = require('./Tile');

module.exports = class Game {
  constructor() {
    this.players = [];
    this.activePlayerIndex = -1;
    this.bag = [];
  }

  initGame() {
    this.bag = tiles
      .map((tile) => Array(tile.count).fill(new Tile(tile)))
      .reduce((acc, curr) => acc.concat(curr), []);
    this.bag = shuffle(this.bag);
    this.activePlayerIndex = Math.floor(Math.random() * this.players.length);
  }
};
