module.exports = class BoardBonus {
  constructor({ y, x, type, multiplier }) {
    this.x = x;
    this.y = y;
    this.type = type; // can be word or letter
    this.multiplier = multiplier;
    this.isUsed = false;
  }

  useBonus() {
    this.isUsed = true;
  }
};
