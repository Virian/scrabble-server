const Game = require('./Game');

module.exports = class GameController {
  constructor() {
    this.games = [];
  }

  connectToGame(socket, ip) {
    // const isPlayerInGame = !!this.games.find((game) => game.players.find((player) => player.player.ip === ip));
    // if (isPlayerInGame) {
    //   socket.send('Już jesteś w grze...');
    //   return;
    // }
    const gameToConnect = this.games.find((game) => !game.isReadyToStart());
    if (!gameToConnect) {
      const newGame = new Game();
      newGame.addPlayer(socket, ip);
      this.games.push(newGame);
    } else {
      gameToConnect.addPlayer(socket, ip);
    }
    socket.send('Zapraszam do gry');
  }
};
