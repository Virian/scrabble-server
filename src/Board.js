const BoardBonus = require('./BoardBonus');

module.exports = class Board {
  constructor() {
    // creates default scrabble board
    this.board = Array(15).fill(Array(15).fill(null)); // empty 15x15 board
    this.bonuses = [
      new BoardBonus({
        y: 0, x: 0, type: 'word', multiplier: 3,
      }),
      new BoardBonus({
        y: 0, x: 3, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 0, x: 7, type: 'word', multiplier: 3,
      }),
      new BoardBonus({
        y: 0, x: 11, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 0, x: 14, type: 'word', multiplier: 3,
      }),
      new BoardBonus({
        y: 1, x: 1, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 1, x: 5, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 1, x: 9, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 1, x: 13, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 2, x: 2, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 2, x: 6, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 2, x: 8, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 2, x: 12, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 3, x: 0, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 3, x: 3, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 3, x: 7, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 3, x: 11, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 3, x: 14, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 4, x: 4, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 4, x: 10, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 5, x: 1, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 5, x: 5, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 5, x: 9, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 5, x: 13, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 6, x: 2, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 6, x: 6, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 6, x: 8, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 6, x: 12, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 7, x: 0, type: 'word', multiplier: 3,
      }),
      new BoardBonus({
        y: 7, x: 3, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 7, x: 7, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 7, x: 11, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 7, x: 14, type: 'word', multiplier: 3,
      }),
      new BoardBonus({
        y: 8, x: 2, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 8, x: 6, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 8, x: 8, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 8, x: 12, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 9, x: 1, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 9, x: 5, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 9, x: 9, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 9, x: 13, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 10, x: 4, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 10, x: 10, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 11, x: 0, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 11, x: 3, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 11, x: 7, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 11, x: 11, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 11, x: 14, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 12, x: 2, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 12, x: 6, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 12, x: 8, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 12, x: 12, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 13, x: 1, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 13, x: 5, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 13, x: 9, type: 'letter', multiplier: 3,
      }),
      new BoardBonus({
        y: 13, x: 13, type: 'word', multiplier: 2,
      }),
      new BoardBonus({
        y: 14, x: 0, type: 'word', multiplier: 3,
      }),
      new BoardBonus({
        y: 14, x: 3, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 14, x: 7, type: 'word', multiplier: 3,
      }),
      new BoardBonus({
        y: 14, x: 11, type: 'letter', multiplier: 2,
      }),
      new BoardBonus({
        y: 14, x: 14, type: 'word', multiplier: 3,
      }),
    ];
  }
};
