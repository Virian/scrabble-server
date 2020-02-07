const { sortedUniqBy, sortBy } = require('lodash');
const BoardBonus = require('./BoardBonus');
const Tile = require('./Tile');
const { isPropertyEqual } = require('./array.utils');

module.exports = class Board {
  constructor() {
    // creates default scrabble board
    /* eslint-disable no-plusplus */
    this.board = new Array(15); // empty 15x15 board
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(15);
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = null;
      }
    }
    /* eslint-enable no-plusplus */
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

  addLetters(letters) {
    letters.forEach(({ letter, score, x, y }) => {
      this.board[y][x] = new Tile({ letter, score });
    });
  }

  getAllNewWords(newLetters, areLettersOnBoard = true, getStrings = false) {
    const board = areLettersOnBoard ? this.board : this.board.slice();
    if (!areLettersOnBoard) {
      newLetters.forEach(({ letter, score, x, y }) => {
        board[y][x] = new Tile({ letter, score });
      });
    }
    return newLetters.reduce((words, newLetter) => {
      const { x, y } = newLetter;
      let i = y;
      let startIndex = -1;
      let endIndex = -1;
      let newWord = [];

      while (board[i][x] !== null && i > -1) {
        startIndex = i;
        newWord.push({ index: i, letter: board[i][x].letter });
        i -= 1;
      }
      i = y;
      while (board[i][x] !== null && i < board.length) {
        endIndex = i;
        newWord.push({ index: i, letter: board[i][x].letter });
        i += 1;
      }
      const verticalWord = {
        start: {
          x,
          y: startIndex,
        },
        end: {
          x,
          y: endIndex,
        },
        length: endIndex - startIndex + 1,
        word: sortedUniqBy(sortBy(newWord, 'index'), 'index').map(({ letter }) => letter).join(''),
      };

      newWord = [];
      i = x;
      while (board[y][i] !== null && i > -1) {
        startIndex = i;
        newWord.push({ index: i, letter: board[y][i].letter });
        i -= 1;
      }
      i = x;
      while (board[y][i] !== null && i < board[y].length) {
        endIndex = i;
        newWord.push({ index: i, letter: board[y][i].letter });
        i += 1;
      }
      const horizontalWord = {
        start: {
          x: startIndex,
          y,
        },
        end: {
          x: endIndex,
          y,
        },
        length: endIndex - startIndex + 1,
        word: sortedUniqBy(sortBy(newWord, 'index'), 'index').map(({ letter }) => letter).join(''),
      };
      let toReturn = words.slice();
      if (horizontalWord.length > 1
        && (words.findIndex((word) => JSON.stringify(word) === JSON.stringify(horizontalWord)) === -1)) {
        toReturn = [...toReturn, horizontalWord];
      }
      if (verticalWord.length > 1
        && (words.findIndex((word) => JSON.stringify(word) === JSON.stringify(verticalWord)) === -1)) {
        toReturn = [...toReturn, verticalWord];
      }
      return toReturn;
    }, []);
  }

  calculateScore(newLetters) {
    const allWords = this.getAllNewWords(newLetters);
    const usedBonuses = [];
    const score = allWords.reduce((accScore, { start, end }) => {
      const isHorizontal = isPropertyEqual([start, end], 'y');
      let wordMultiplier = 1;
      let wordScore = 0;
      if (isHorizontal) {
        for (let i = start.x; i <= end.x; i += 1) {
          const bonus = this.bonuses.find((boardBonus) => boardBonus.y === start.y && boardBonus.x === i);
          if (bonus && !bonus.isUsed) {
            usedBonuses.push(bonus);
            if (bonus.type === 'letter') {
              wordScore += this.board[start.y][i].score * bonus.multiplier;
            } else {
              wordScore += this.board[start.y][i].score;
              wordMultiplier *= bonus.multiplier;
            }
          } else {
            wordScore += this.board[start.y][i].score;
          }
        }
      } else {
        for (let i = start.y; i <= end.y; i += 1) {
          const bonus = this.bonuses.find((boardBonus) => boardBonus.y === i && boardBonus.x === start.x);
          if (bonus && !bonus.isUsed) {
            usedBonuses.push(bonus);
            if (bonus.type === 'letter') {
              wordScore += this.board[i][start.x].score * bonus.multiplier;
            } else {
              wordScore += this.board[i][start.x].score;
              wordMultiplier *= bonus.multiplier;
            }
          } else {
            wordScore += this.board[i][start.x].score;
          }
        }
      }
      return accScore + wordScore * wordMultiplier;
    }, 0);
    usedBonuses.forEach((bonus) => bonus.useBonus());
    return score;
  }

  toMessage() {
    return {
      board: this.board,
      bonuses: this.bonuses,
    };
  }
};
