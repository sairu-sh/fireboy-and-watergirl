const selectionBar = document.getElementById("selection-bar");

const images = document.querySelectorAll(".mapElement");
const mapCanvas = document.getElementById("mapEditor");
const context = mapCanvas.getContext("2d");
/*index
 * 1: ground/wall
 * 2: waterpool
 * 3: lava pool
 * 4: goo pool
 * 5: purple pusher
 * 6: white pusher
 * 7: green pusher
 * 8: pink pusher
 * 10: lever
 * 16: purple leftMovingPlatform triggered by pusher
 * 17: purple rightMovingPlatform triggered by pusher
 * 18: purple upMovingPlatform triggered by pusher
 * 19: purple DownMovingPlatform triggered by pusher
 * 30: big block
 * 35: blue diamond
 * 36: red diamond
 * 40: yellow lever triggered left to right
 * 41: yellow lever triggered right to left
 * 50: yellow leftMovingPlatform triggered by lever
 * 51: yellow rightMovingPlatform triggered by lever
 * 52: yellow upMovingPlatform triggered by lever
 * 53: yellow DownMovingPlatform triggered by lever
 * 60: fireboy's door
 * 61: watergirl's door
 * 99: fireboy
 * 100: watergirl
 */
let selectedElement = 0;
let isSelected = false;

let tileSize = 32;

selectionBar.addEventListener("click", handleSelection);

function handleSelection(e) {
  let id = e.target.dataset.id;
  if (isSelected && id == selectedElement) {
    isSelected = false;
    selectedElement = 0;
    e.target.classList.remove("active");
  } else {
    isSelected = true;
    selectedElement = e.target.dataset.id;
    images.forEach((img) => {
      img.classList.remove("active");
    });
    e.target.classList.add("active");
  }
  console.log(selectedElement);
}

let numRows = Math.floor(mapCanvas.height / tileSize);
let numCols = Math.floor(mapCanvas.width / tileSize);

let layer = {};

function draw() {
  context.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
  setImage();
  //   console.log(layer);
  // Draw grid lines
  context.strokeStyle = "#ccc"; // Set the color of the grid lines
  context.lineWidth = 1;

  for (let i = 1; i < numRows; i++) {
    // Draw horizontal lines
    let y = i * tileSize;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(myCanvas.width, y);
    context.stroke();
  }

  for (let j = 1; j < numCols; j++) {
    // Draw vertical lines
    let x = j * tileSize;
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, myCanvas.height);
    context.stroke();
  }
  requestAnimationFrame(draw);
}

draw();

let isMouseDown = false;

function getCoords(e) {
  const { x, y } = e.target.getBoundingClientRect();
  const mouseX = e.clientX - x;
  const mouseY = e.clientY - y;
  return [Math.floor(mouseX / 32), Math.floor(mouseY / 32)];
}

mapCanvas.addEventListener("mousedown", () => {
  isMouseDown = true;
});
mapCanvas.addEventListener("mouseup", () => {
  isMouseDown = false;
});
mapCanvas.addEventListener("mouseleave", () => {
  isMouseDown = false;
});
mapCanvas.addEventListener("mousedown", addTile);

mapCanvas.addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    addTile(e);
  }
});

function addTile(e) {
  let clicked = getCoords(e);
  key = clicked[0] + "-" + clicked[1];
  layer[key] = selectedElement;
}

function setImage() {
  Object.keys(layer).forEach((key) => {
    let positionX = Number(key.split("-")[0]);
    let positionY = Number(key.split("-")[1]);
    context.fillStyle = "red";
    context.fillRect(positionX * 32, positionY * 32, 32, 32);
    //   let [tilesheetX, tilesheetY] = layer[key];
    //   console.log(positionX, positionY, tilesheetX, tilesheetY);
  });
}
