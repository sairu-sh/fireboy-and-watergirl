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

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      fireboyMovement.right = true;
      break;
    case "ArrowLeft":
      fireboyMovement.left = true;
      break;
    case "d":
      watergirlMovement.right = true;
      break;
    case "a":
      watergirlMovement.left = true;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowRight":
      fireboyMovement.right = false;
      break;
    case "ArrowLeft":
      fireboyMovement.left = false;
      break;
    case "d":
      watergirlMovement.right = false;
      break;
    case "a":
      watergirlMovement.left = false;
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


const cropbox = {
  position: {
    x: 0,
    y: 0,
  },
  width: 0,
  height: 0,
};

function setCropboxAttributes({ position, width, height }) {
  cropbox.position = position;
  cropbox.width = width;
  cropbox.height = height;
}

