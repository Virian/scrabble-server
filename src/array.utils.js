// check if array of objects has the same value for given property name
const isPropertyEqual = (array, property) => {
  return array.every((obj, _, arr) => obj[property] === arr[0][property]);
};

module.exports = {
  isPropertyEqual,
};
