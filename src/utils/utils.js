import {Description, Position, TagNames, UserRating, UserRatingChart} from "./constants";

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
const isValueInRange = (value, min, max) => {
  return min <= value && value <= max;
};
const getUserTitle = (amount) => {
  let title;

  for (let key of UserRatingChart.keys()) {
    if (isValueInRange(amount, ...key)) {
      title = UserRatingChart.get(key);
    }
  }

  return title;
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
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
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

export {trimString, createElement, renderElement, removeElement, isValueInRange, getUserTitle, isATag, isButtonTag, countDuplicateElements, checkStatus, toJSON, isOnline, objectToArray};
