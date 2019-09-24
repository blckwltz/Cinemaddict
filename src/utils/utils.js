import {Description, Position, TagNames, UserRating} from "./constants";

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
const getUserTitle = (amount) => {
  let title = ``;
  if (amount >= UserRating.MILESTONES.FIRST && amount <= UserRating.MILESTONES.SECOND) {
    title = UserRating.TITLES.FIRST;
  } else if (amount >= UserRating.MILESTONES.THIRD && amount <= UserRating.MILESTONES.FOURTH) {
    title = UserRating.TITLES.SECOND;
  } else if (amount > UserRating.MILESTONES.FIFTH) {
    title = UserRating.TITLES.THIRD;
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

export {trimString, createElement, renderElement, removeElement, getUserTitle, isATag, isButtonTag, countDuplicateElements, checkStatus, toJSON, isOnline, objectToArray};