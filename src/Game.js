const shuffle = require('lodash/shuffle');
const tiles = require('./TilesLists/tiles.pl');
const Tile = require('./Tile');
const Board = require('./Board');
const Player = require('./Player');
const Message = require('./Message');
const messageTypes = require('./MessageTypes/messageTypes');

module.exports = class Game {
  constructor() {
    this.players = [];
    this.activePlayerIndex = -1;
    this.roundNumber = 1;
    this.bag = [];
    this.board = new Board();
    this.holdCount = 0;
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
    socket.on('message', (message) => {
      this.handleClientMessage(message, ip);
    });
    this.players.push({
      player: new Player(ip),
      socket,
    });
    socket.send(JSON.stringify(new Message({ type: messageTypes.SEND_BOARD, data: this.board.toMessage() })));
  }

  handleClientMessage(message, ip) {
    const data = JSON.parse(message);
    const playerIndex = this.players.findIndex((player) => player.player.ip === ip);
    if (this.activePlayerIndex !== playerIndex) return;
    switch (message.action) {
      case 'place':
        // place tiles
        break;
      case 'swap':
        // swap tiles
        break;
      case 'hold':
        // hold
        break;
      default:
        // unknown action
    }
  }
};
