import {Description, Position, TagNames} from "./constants";

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
  const array = Array.isArray(list) ? list : [...list];
  return array[getRandomNumber(array.length - 1)];
};
const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
const trimString = (string) => {
  return string.length < Description.LENGTH.MAX ? string : `${string.slice(0, Description.LENGTH.TO_DISPLAY).trim()}…`;
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
const isATag = (tagName) => tagName === TagNames.A;
const isButtonTag = (tagName) => tagName === TagNames.BUTTON;
const countDuplicateElements = (list) => {
  let counts = {};
  list.forEach((element) => {
    counts[element] = (counts[element] || 0) + 1;
  });
  return counts;
};
const debounce = (callback, time) => {
  let timeoutID;

  return (...args) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(callback(args), time);
  };
};
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
const toJSON = (response) => {
  return response.json();
};
const isOnline = () => {
  return window.navigator.onLine;
};
const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export {getRandomNumber, shuffleList, getRandomItem, getRandomDate, trimString, createElement, renderElement, removeElement, isATag, isButtonTag, countDuplicateElements, debounce, checkStatus, toJSON, isOnline, objectToArray};
