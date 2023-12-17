const startButton = document.getElementById("start");
const designerButton = document.getElementById("designer");
const mapEditor = document.querySelector(".mapEditor");
const menu = document.getElementById("menu");
const scoreBoard = document.getElementById("scoreboard");
const scoreImages = document.querySelectorAll(".score");
const levelSelector = document.querySelector(".level-selector");

let availableLevels = 3;
let currentLevel = 1;
let gameStart = false;
let scoreStatus = 1;

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
  menu.style.display = "none";
  mapEditor.style.display = "none";
  myCanvas.style.display = "block";

  tile.draw(maps[currentLevel - 1]);
  startTimer();
  gameStart = true;
});

let seconds = 0;
let timerInterval;
let displayTime = "00:00";

function updateTimer() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  displayTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function incrementTimer() {
  seconds++;
  updateTimer();
}

function startTimer() {
  timerInterval = setInterval(incrementTimer, 1000);
}

scoreBoard.addEventListener("mousedown", (e) => {
  if (e.target.getAttribute("id") === "continue") {
    myCanvas.style.display = "none";
    scoreBoard.style.display = "none";
    levelSelector.style.display = "block";
  } else if (e.target.getAttribute("id") === "continue") {
    myCanvas.style.display = "none";
    scoreBoard.style.display = "none";
    menu.style.display = "block";
  }
});
