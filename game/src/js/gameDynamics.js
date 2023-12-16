const startButton = document.getElementById("start");
const menu = document.getElementById("menu");

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
  myCanvas.style.display = "block";
  menu.style.display = "none";

  introSound.pause();
  // levelSound.play();
});
