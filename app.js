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

// set initial color for board color
document.addEventListener("DOMContentLoaded", function () {
  boardColorPicker.value = "#706363";
  setBoardColor(boardColorPicker.value);
});

// function to set board color
boardColorPicker = document.querySelector("#boardColor");

const setBoardColor = function (color) {
  let childNodes = document.querySelectorAll(".board > *");
  for (let child of childNodes) {
    child.style.backgroundColor = color;
  }
};

boardColorPicker.addEventListener("change", function () {
  setBoardColor(boardColorPicker.value);
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
let currentRainbow = "red"; // setting last element, as when lines below execute, the color becomes violet
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

const parseRgb = function (rgb) {
  rgb = rgb.substring(4, rgb.length - 1); // removing brackets and the "rgb" key word
  rgb = rgb.split(","); // splitting the numbers into array
  rgb = rgb.map((elem) => elem.trim()); // trimming the whitespaces
  return rgb;
};

const rgbToHsl = function (rgb) {
  const [r, g, b] = parseRgb(rgb);
  let r1 = r / 255;
  let g1 = g / 255;
  let b1 = b / 255;

  let cmax = Math.max(r1, g1, b1);
  let cmin = Math.min(r1, g1, b1);
  let del = cmax - cmin;

  let hue = 0;
  if (del === 0) {
    hue = 0;
  } else if (cmax === r1) {
    hue = 60 * (((g1 - b1) / del) % 6);
  } else if (cmax === g1) {
    hue = 60 * ((b1 - r1) / del + 2);
  } else if (cmax === b1) {
    hue = 60 * ((r1 - g1) / del + 4);
  }

  let lightness = (cmax + cmin) / 2;

  let saturation = 0;
  if (del === 0) {
    saturation = 0;
  } else if (del > 0 || del < 0) {
    saturation = del / (1 - Math.abs(2 * lightness - 1));
  }

  // after calculation saturation and lightness will be in percentage form,
  // so rounding them and changing to 100% scale
  hue = Math.round(hue);
  lightness = Math.round(lightness * 100);
  saturation = Math.round(saturation * 100);

  return {
    h: hue,
    s: saturation,
    l: lightness,
  };
};

const increaseGrey = function (rgb) {
  let h = rgbToHsl(rgb).h;
  let s = rgbToHsl(rgb).s;
  let l = rgbToHsl(rgb).l;
  return `hsl(${h}, ${s}%, ${l - 5 > 0 ? l - 5 : 0}%)`;
};

// finding next greyscale
const findNextGrey = function (elem) {
  if (elem.style.backgroundColor === "") {
    // taken from stylesheet, background of .board > div
    return increaseGrey("rgb(112, 99, 99)");
  } else {
    // console.log(increaseGrey(elem.style.backgroundColor));
    return increaseGrey(elem.style.backgroundColor);
  }
};

// function to find the next color
const findCurrentColor = function (elem) {
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
    case "greyscale":
      return findNextGrey(elem);
      break;
  }
};

// On hovering over the board's child divs
const changeBgColor = function () {
  let childNodes = document.querySelectorAll(".board > *");
  for (let child of childNodes) {
    child.addEventListener("mouseover", function () {
      this.style.backgroundColor = findCurrentColor(this);
    });
  }
};

document.addEventListener("DOMContentLoaded", changeBgColor);
document.addEventListener("change", changeBgColor);
