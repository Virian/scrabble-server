const shuffle = require('lodash/shuffle');
const tiles = require('./TilesLists/tiles.pl');
const Tile = require('./Tile');
const Board = require('./Board');
const Player = require('./Player');
const Message = require('./Message');
const MessageTypes = require('./MessageTypes/MessageTypes');
const gameState = require('./GameState/GameState');

module.exports = class Game {
  constructor() {
    this.players = [];
    this.activePlayerIndex = -1;
    this.roundNumber = 1;
    this.bag = [];
    this.board = new Board();
    this.holdCount = 0;
    this.state = gameState.WAITING_FOR_PLAYERS;
  }

  isReadyToStart() {
    return this.players.length >= 2;
  }

  initGame() {
    this.bag = tiles
      .map((tile) => Array(tile.count).fill(new Tile(tile)))
      .reduce((acc, curr) => acc.concat(curr), []);
    this.bag = shuffle(this.bag);
    this.players = shuffle(this.players);
    this.players.forEach((_, index) => {
      this.players[index].player.order = index;
    });
    this.activePlayerIndex = 0;
    const playerOrder = this.players.map(({ player: { id, order } }) => ({ id, order }));
    this.players.forEach(({ player, socket }) => {
      const playerTiles = this.bag.splice(0, 7);
      player.giveTiles(playerTiles);
      socket.send(JSON.stringify(new Message({ type: MessageTypes.ADD_TILES, data: playerTiles })));
      socket.send(JSON.stringify(new Message({ type: MessageTypes.NOTIFY_START, data: playerOrder })));
    });
  }

  addPlayer(socket, ip) {
    socket.on('message', (message) => {
      this.handleClientMessage(message, ip);
    });
    this.players.forEach((player) => { // send to all players an information that a player has connected
      player.socket.send(JSON.stringify(new Message({
        type: MessageTypes.PLAYER_CONNECTED,
        data: this.players.length, // will be his id
      })));
    });
    this.players.push({
      player: new Player({ ip, id: this.players.length }),
      socket,
    });
    socket.send(JSON.stringify(new Message({
      type: MessageTypes.SEND_BOARD,
      data: this.board.toMessage(),
    })));
    socket.send(JSON.stringify(new Message({
      type: MessageTypes.SEND_PLAYERS,
      data: this.players.map(({ player: { id } }) => ({
        id,
        isYou: id === this.players.length - 1,
      })),
    })));
  }

  handleClientMessage(message, ip) {
    const messageObj = new Message(JSON.parse(message));
    const playerIndex = this.players.findIndex((player) => player.player.ip === ip);
    console.log({ messageObj, playerIndex });
    if (this.activePlayerIndex !== playerIndex) return;
    switch (messageObj.type) {
      case MessageTypes.PLACE:
        this.holdCount = 0;
        // place tiles
        break;
      case MessageTypes.SWAP:
        this.holdCount = 0;
        // swap tiles
        break;
      case MessageTypes.HOLD:
        // hold
        this.holdCount += 1; // TODO: game over on too many holds
        this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
        this.players[this.activePlayerIndex].socket.send(JSON.stringify(new Message({ type: MessageTypes.YOUR_TURN })));
        this.players.forEach(({ socket }, index) => {
          if (index === playerIndex || index === this.activePlayerIndex) return; // don't send information to a player who decided to hold or to the next player
          socket.send(JSON.stringify(new Message({ type: MessageTypes.NEXT_PLAYER })));
        });
        break;
      default:
        // unknown action
    }
  }
};
