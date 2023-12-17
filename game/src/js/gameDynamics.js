const startButton = document.getElementById("start");
const designerButton = document.getElementById("designer");
const mapEditor = document.querySelector(".mapEditor");
const menu = document.getElementById("menu");
const levelSelector = document.querySelector(".level-selector");

let availableLevels = 3;
let currentLevel = 1;
let gameStart = false;

const introSound = new Audio("../../../music/IntroMusic.wav");
introSound.loop = true;
// introSound.play();

const levelSound = new Audio("../../../music/LevelMusic.wav");
levelSound.loop = true;

const coinCollected = new Audio("../../../music/coinCollect.ogg");
const death = new Audio("../../../music/death.ogg");
const fbJump = new Audio("../../../music/fireboyJump.ogg");
const wgJump = new Audio("../../../music/watergirlJump.ogg");
const door = new Audio("../../../music/Door.mp3");
const lever = new Audio("../../../music/Lever.mp3");
const pusher = new Audio("../../../music/Pusher.mp3");
const platform = new Audio("../../../music/Platform.mp3");

startButton.addEventListener("click", (e) => {
  menu.style.display = "none";
  levelSelector.style.display = "block";
  introSound.pause();
  // levelSound.play();
});

designerButton.addEventListener("mousedown", (e) => {
  menu.style.display = "none";
  mapEditor.style.display = "flex";
});

levelSelector.addEventListener("mousedown", (e) => {
  currentLevel = e.target.dataset.id;
  levelSelector.style.display = "none";
  mapEditor.style.display = "none";
  myCanvas.style.display = "block";

  tile.draw(maps[currentLevel - 1]);
  gameStart = true;
});
