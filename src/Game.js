const shuffle = require('lodash/shuffle');
const tiles = require('./TilesLists/tiles.pl');
const Tile = require('./Tile');
const Board = require('./Board');
const Player = require('./Player');

module.exports = class Game {
  constructor() {
    this.players = [];
    this.activePlayerIndex = -1;
    this.bag = [];
    this.board = new Board();
  }

  isReadyToStart() {
    return this.players.length >= 2;
  }

  initGame() {
    this.bag = tiles
      .map((tile) => Array(tile.count).fill(new Tile(tile)))
      .reduce((acc, curr) => acc.concat(curr), []);
    this.bag = shuffle(this.bag);
    this.activePlayerIndex = Math.floor(Math.random() * this.players.length);
    this.players.forEach(({ player }) => {
      const playerTiles = this.bag.splice(0, 7);
      player.giveTiles(playerTiles);
    });
  }

  addPlayer(socket, ip) {
    this.players.push({
      player: new Player(ip),
      socket,
    });
  }
};
