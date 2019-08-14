const getRandomNumber = (max, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const shuffleList = (list) => {
  for (let i = 0; i < list.length; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};
const getRandomItem = (list) => {
  const array = Array.from(list);
  return array[getRandomNumber(array.length - 1)];
};


export {getRandomNumber, shuffleList, getRandomItem};
