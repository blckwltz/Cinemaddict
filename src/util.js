const getRandom = (max, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getRating = () => {
  const firstDigit = getRandom(10, 1);
  return firstDigit < 10 ? `${firstDigit}.${getRandom(9)}` : `${firstDigit}.0`;
};

export {getRandom, getRating};
