const shuffle = require('lodash/shuffle');
const tiles = require('./TilesLists/tiles.pl');
const Tile = require('./Tile');
const Board = require('./Board');
const Player = require('./Player');
const Message = require('./Message');
const MessageTypes = require('./MessageTypes/MessageTypes');
const GameState = require('./GameState/GameState');

module.exports = class Game {
  constructor() {
    this.players = [];
    this.activePlayerIndex = -1;
    this.roundNumber = 1;
    this.bag = [];
    this.board = new Board();
    this.holdCount = 0;
    this.state = GameState.WAITING_FOR_PLAYERS;
    this.newLetters = null;
    this.playersThatAccepted = new Set();
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
    this.state = GameState.WAITING_FIRST_WORD;
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

  broadcastNextTurn(indexToOmit) {
    this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    this.players[this.activePlayerIndex].socket.send(JSON.stringify(new Message({ type: MessageTypes.YOUR_TURN })));
    this.players.forEach(({ socket }, index) => {
      if (index === indexToOmit || index === this.activePlayerIndex) return; // don't send information to a player who decided to hold or to the next player
      socket.send(JSON.stringify(new Message({ type: MessageTypes.NEXT_PLAYER })));
    });
  }

  broadcastScore(playerId, score) {
    this.players.forEach(({ socket }) => {
      socket.send(JSON.stringify(new Message({
        type: MessageTypes.UPDATE_SCORE,
        data: {
          playerId,
          score,
        },
      })));
    });
  }

  handleClientMessage(message, ip) {
    const messageObj = new Message(JSON.parse(message));
    const playerIndex = this.players.findIndex((player) => player.player.ip === ip);
    console.log({ messageObj, playerIndex });
    if (this.activePlayerIndex !== playerIndex && this.state !== GameState.WAITING_WORD_ACCEPTANCE) {
      return;
    }
    switch (messageObj.type) {
      case MessageTypes.PLACE: {
        // TODO: check if a player has these letters
        // TODO: handle blank letter
        // TODO: check if letters are in one line
        // TODO: check if letters cross the center if it's first turn
        // TODO: check if letters are connected to each other if it's first turn
        // TODO: check if letters are adjacent to the other ones
        this.holdCount = 0;
        this.newLetters = messageObj.data;
        this.state = GameState.WAITING_WORD_ACCEPTANCE;
        this.players[this.activePlayerIndex].socket.send(JSON.stringify(new Message({ type: MessageTypes.AWAITING_OTHERS_ACCEPTANCE })));
        this.players.forEach(({ socket }, index) => {
          if (index === this.activePlayerIndex) return;
          socket.send(JSON.stringify(new Message({ type: MessageTypes.AWAITING_ACCEPTANCE, data: this.newLetters })));
        });
        break;
      }
      case MessageTypes.WORD_ACCEPT:
        this.playersThatAccepted.add(playerIndex);
        if (this.playersThatAccepted.size === this.players.length - 1) {
          this.board.addLetters(this.newLetters);
          const currentPlayer = this.players[this.activePlayerIndex];
          currentPlayer.player.removeTiles(this.newLetters.map(({ letter }) => letter));
          const newTiles = this.bag.splice(0, this.newLetters.length);
          currentPlayer.player.giveTiles(newTiles);
          this.players[this.activePlayerIndex].socket.send(
            JSON.stringify(new Message({ type: MessageTypes.ADD_TILES, data: newTiles })),
          );
          const score = this.board.calculateScore(this.newLetters);
          this.broadcastScore(currentPlayer.player.id, score);
          this.playersThatAccepted.clear();
          this.newLetters = null;
          this.state = GameState.WAITING_WORD;
          this.broadcastNextTurn();
        }
        break;
      case MessageTypes.WORD_CHECK:
        // TODO: do it
        break;
      case MessageTypes.SWAP: {
        this.holdCount = 0;
        // TODO: check if a player has letters he's trying to swap
        if (messageObj.data.length > this.bag.length) {
          const tilesToSend = messageObj.data.map((letter) => new Tile(tiles.find((tile) => tile.letter === letter)));
          this.players[this.activePlayerIndex].socket.send(JSON.stringify(new Message({
            type: MessageTypes.SWAP_CANCELLED,
            data: tilesToSend,
          })));
        }
        const newTiles = messageObj.data.map((letter) => new Tile(tiles.find((tile) => tile.letter === letter)));
        const tilesToSend = this.bag.splice(0, messageObj.data.length, ...newTiles);
        this.bag = shuffle(this.bag);
        this.players[this.activePlayerIndex].socket.send(JSON.stringify(new Message({
          type: MessageTypes.SWAP_ACCEPTED,
          data: tilesToSend,
        })));
        this.broadcastNextTurn(playerIndex);
        break;
      }
      case MessageTypes.HOLD:
        this.holdCount += 1; // TODO: game over on too many holds
        this.broadcastNextTurn(playerIndex);
        break;
      default:
        // unknown action
    }
  }
};
