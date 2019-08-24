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
const getTitle = (amount) => {
  let title = ``;
  if (amount >= 1 && amount <= 10) {
    title = `Novice`;
  } else if (amount >= 11 && amount <= 20) {
    title = `Fan`;
  } else if (amount > 21) {
    title = `Movie Buff`;
  }
  return title;
};
const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
const createElement = (template) => {
  const containerElement = document.createElement(`div`);
  containerElement.innerHTML = template;
  return containerElement.firstChild;
};
const renderElement = (container, element, position = Position.BEFOREEND) => {
  switch (position) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};
const removeElement = (element) => {
  if (element) {
    element.remove();
  }
};

export {getRandomNumber, shuffleList, getRandomItem, getTitle, createElement, renderElement, removeElement};
