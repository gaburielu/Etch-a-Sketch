const slider = document.getElementById("slider");
const sliderValue = document.getElementById("sliderValue");
const canvas = document.querySelector(".canvas");
const colorPicker = document.getElementById("input-color");
const rainbowButton = document.getElementById("rainbow");
const colorPickBtn = document.querySelector(".colorPicker");
const text = document.getElementById("sliderValue");

text.textContent = "Canvas Size: 16 x 16";
let value = 16;
let color = "black";
let useRainbowColor = false;
let colorPick = "black";
let interactionCount = 0;

function removeGrid() {
  while (canvas.firstChild) {
    canvas.firstChild.remove();
  }
}

rainbowButton.addEventListener("click", function () {
  useRainbowColor = !useRainbowColor; // Toggle the rainbow color state
});

function createBlocks(value) {
  let totalBlock = value * value;
  canvas.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${value}, 1fr)`;
  for (let i = 0; i < totalBlock; i++) {
    let block = document.createElement("div");
    let giveClass = document.createAttribute("class");
    giveClass.value = "drawBlock";
    block.setAttributeNode(giveClass);
    block.addEventListener("mousemove", drawBlock);
    canvas.insertAdjacentElement("beforeend", block);
  }
}

function handleSliderInput() {
  value = slider.value;
  sliderValue.textContent = value;
  removeGrid();
  createBlocks(value);
  text.textContent = `Canvas Size: ${value} x ${value}`;
}

function drawBlock(event) {
  if (event.buttons === 1) {
    //only draw when the mouse if left clicked and hold
    if (useRainbowColor) {
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else {
      this.style.backgroundColor = color;
    }
  }
}

function changeColor(newColor) {
  useRainbowColor = false;
  color = newColor;
}

function clearCanvas() {
  let allBlock = document.querySelectorAll(".drawBlock").forEach((block) => {
    block.style.backgroundColor = "white";
  });
}

const debounce = (func, delay) => {
  //delay the slider input which is causing lagging due to the event listener triggering too frequently
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const debouncedHandleSliderInput = debounce(handleSliderInput, 250);

colorPicker.addEventListener("input", function () {
  useRainbowColor = false;
  color = colorPicker.value;
  colorPick = colorPicker.value;
});

colorPickBtn.addEventListener("click", function () {
  //saving and reusing the color picker value
  useRainbowColor = false;
  color = colorPick;
});

slider.addEventListener("input", debouncedHandleSliderInput);

createBlocks(value);