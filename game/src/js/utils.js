const fireboyMovement = {
  right: false,
  left: false,
  isGrounded: true,
};

const watergirlMovement = {
  right: false,
  left: false,
  isGrounded: true,
};

let wgAnimationFrame = 0;
let wgCurrentAnimationFrames = [];
let fbAnimationFrame = 0;
let fbCurrentAnimationFrames = [];
let wgFrameCounter = 0;
let fbFrameCounter = 0;
const framesPerUpdate = 10;

let watergirlLeftRun = [
  {
    position: {
      x: 78,
      y: 0,
    },
    width: 45,
    height: 55,
  },
  {
    position: {
      x: 145,
      y: 0,
    },
    width: 50,
    height: 55,
  },
  {
    position: {
      x: 220,
      y: 0,
    },
    width: 50,
    height: 55,
  },
  {
    position: {
      x: 280,
      y: 0,
    },
    width: 50,
    height: 55,
  },
  {
    position: {
      x: 349,
      y: 0,
    },
    width: 50,
    height: 53,
  },
  {
    position: {
      x: 410,
      y: 0,
    },
    width: 50,
    height: 53,
  },
  {
    position: {
      x: 475,
      y: 0,
    },
    width: 45,
    height: 53,
  },
];

let watergirlRunRight = [
  {
    position: {
      x: 935,
      y: 0,
    },
    width: 40,
    height: 53,
  },
  {
    position: {
      x: 870,
      y: 0,
    },
    width: 38,
    height: 53,
  },
  {
    position: {
      x: 795,
      y: 0,
    },
    width: 42,
    height: 53,
  },
  {
    position: {
      x: 725,
      y: 0,
    },
    width: 42,
    height: 53,
  },
  {
    position: {
      x: 660,
      y: 0,
    },
    width: 42,
    height: 53,
  },
  {
    position: {
      x: 595,
      y: 0,
    },
    width: 42,
    height: 53,
  },
  {
    position: {
      x: 535,
      y: 0,
    },
    width: 42,
    height: 53,
  },
];

let fireboyRunLeft = [
  {
    position: {
      x: 50,
      y: 0,
    },
    width: 37,
    height: 57,
  },
  {
    position: {
      x: 105,
      y: 0,
    },
    width: 37,
    height: 57,
  },
  {
    position: {
      x: 160,
      y: 0,
    },
    width: 39,
    height: 52,
  },
  {
    position: {
      x: 215,
      y: 0,
    },
    width: 45,
    height: 55,
  },
  {
    position: {
      x: 275,
      y: 0,
    },
    width: 45,
    height: 55,
  },
  {
    position: {
      x: 325,
      y: 0,
    },
    width: 40,
    height: 55,
  },
  {
    position: {
      x: 375,
      y: 0,
    },
    width: 35,
    height: 55,
  },
];

let fireboyRightRun = [
  {
    position: {
      x: 745,
      y: 0,
    },
    width: 40,
    height: 55,
  },
  {
    position: {
      x: 690,
      y: 0,
    },
    width: 40,
    height: 55,
  },
  {
    position: {
      x: 635,
      y: 0,
    },
    width: 40,
    height: 55,
  },
  {
    position: {
      x: 575,
      y: 0,
    },
    width: 45,
    height: 55,
  },
  {
    position: {
      x: 520,
      y: 0,
    },
    width: 40,
    height: 55,
  },
  {
    position: {
      x: 470,
      y: 0,
    },
    width: 40,
    height: 55,
  },
  {
    position: {
      x: 425,
      y: 0,
    },
    width: 35,
    height: 55,
  },
];

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      fireboyMovement.right = true;
      fbCurrentAnimationFrames = fireboyRightRun;
      break;
    case "ArrowLeft":
      fireboyMovement.left = true;
      fbCurrentAnimationFrames = fireboyRunLeft;
      break;
    case "d":
      watergirlMovement.right = true;
      wgCurrentAnimationFrames = watergirlRunRight;
      break;
    case "a":
      watergirlMovement.left = true;
      wgCurrentAnimationFrames = watergirlLeftRun;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowRight":
      fireboyMovement.right = false;
      fbAnimationFrame = 0;
      break;
    case "ArrowLeft":
      fireboyMovement.left = false;
      fbAnimationFrame = 0;
      break;
    case "d":
      watergirlMovement.right = false;
      wgAnimationFrame = 0;
    case "a":
      watergirlMovement.left = false;
      wgAnimationFrame = 0;
      break;
  }
});

function detectCollision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x &&
    object1.position.y <= object2.position.y + object2.height
  );
}

/**
 * cropbox to crop a fixed area from a spritesheet from (x, y)
 */
const cropbox = {
  position: {
    x: 0,
    y: 0,
  },
  width: 0,
  height: 0,
};

/**'
 * @param {number} position
 * @param {number} width
 * @param {number} height
 */
function setCropboxAttributes({ position, width, height }) {
  cropbox.position = position;
  cropbox.width = width;
  cropbox.height = height;
}

function randomNumGenerator(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
