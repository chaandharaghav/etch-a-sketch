const logButton = (e) => {
  console.log(e.target);
};

// finding the active element
custSection = document.querySelectorAll(".cust-buttons > *");
const redefineActiveElement = (e) => {
  for (let element of custSection) {
    element.classList.remove("active");
  }
  e.target.classList.add("active");
};

// customization options click events

// 1. Customization buttons
custButtons = document.querySelectorAll(".cust-buttons > button");
for (let custButton of custButtons) {
  custButton.addEventListener("click", redefineActiveElement);
}

// 2. Color selector
pointerColorSelector = document.querySelector(".cust-buttons > input");
pointerColorSelector.addEventListener("change", redefineActiveElement);

const board = document.querySelector(".board");

// function to create the divs in the board
const tilePicker = document.querySelector("#numTiles");

const createDivs = function () {
  const numTiles = tilePicker.value;

  //craeting elements to append to board
  for (let i = 0; i < numTiles ** 2; i++) {
    const tile = document.createElement("div");
    tile.style.cssText = `
            height: calc(100%/${numTiles});
            width: calc(100%/${numTiles});
        `;
    board.append(tile);
  }
  board.style.cssText = `
        display: flex;
        flex-wrap: wrap;
    `;
};

// On DOMContentLoaded, run createDivs once
document.addEventListener("DOMContentLoaded", createDivs);

// if user changes no of tiles value, createDivs again
const deleteDivs = function () {
  board.innerHTML = "";
};
tilePicker.addEventListener("change", deleteDivs);
tilePicker.addEventListener("change", createDivs);

// function to set board color

// implemented by changing written css,
// changing styleSheets will impact this as well
const findDivBgCss = function () {
  cssRules = document.styleSheets[0].cssRules;
  for (let cssRule of cssRules) {
    if (cssRule.selectorText === ".board > div") {
      return cssRule.style;
    }
  }
};

boardColorPicker = document.querySelector("#boardColor");
boardColorPicker.addEventListener("change", function () {
  const divBgCss = findDivBgCss();
  divBgCss.backgroundColor = boardColorPicker.value;
});

// find the selected customization button
const findCurrentActive = function () {
  return document.querySelector(".active").id;
};

// make a random number
const randomNumber = (range, offset) => {
  offset = offset ?? 0;
  return Math.round(Math.random() * range) + offset;
};

// make a random color
const randomColor = function () {
  return `rgb(${randomNumber(256)}, ${randomNumber(256)}, ${randomNumber(
    256
  )})`;
};

// find next rainbow color
let currentRainbow = "red";
const findNextRainbow = function () {
  const rainbowColors = [
    "violet",
    "indigo",
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
  ];

  let index = rainbowColors.indexOf(currentRainbow);
  if (index === rainbowColors.length - 1) {
    currentRainbow = rainbowColors[0];
  } else {
    currentRainbow = rainbowColors[index + 1];
  }

  return currentRainbow;
};

// function to find the next color
const findCurrentColor = function () {
  const currentActive = findCurrentActive();

  switch (currentActive) {
    case "manual":
      return pointerColorSelector.value;
      break;
    case "black":
      return "hsl(0,0%,0%)";
      break;
    case "random":
      return randomColor();
      break;
    case "rainbow":
      return findNextRainbow();
      break;
  }
};

// On hovering over the board's child divs
const changeBgColor = function () {
  let childNodes = document.querySelectorAll(".board > *");
  for (let child of childNodes) {
    child.addEventListener("mouseover", function () {
      this.style.backgroundColor = findCurrentColor();
    });
  }
};

document.addEventListener("DOMContentLoaded", changeBgColor);
document.addEventListener("change", changeBgColor);
