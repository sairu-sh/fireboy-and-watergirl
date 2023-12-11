const fireBoy = new Character({
  position: { x: 200, y: myCanvas.height - 80 },
  element: "fire",
});
const waterGirl = new Character({
  position: { x: 400, y: myCanvas.height - 80 },
  element: "water",
});

let tileSize = 20; // Adjust this based on your needs
let tile = new TileMap(tileSize);
tile.draw();

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  // fireBoy.collisionWithEdgeWalls();
  // waterGirl.collisionWithEdgeWalls();
  fireBoy.draw(ctx);
  waterGirl.draw(ctx);
  for (let i = 0; i < poolArray.length; i++) {
    poolArray[i].drawPool();
    fireBoy.collisionWithPools(poolArray[i]);
    waterGirl.collisionWithPools(poolArray[i]);
  }
  for (let i = 0; i < pushersArray.length; i++) {
    pushersArray[i].drawPusher();
    if (
      detectCollision({ object1: fireBoy, object2: pushersArray[i] }) ||
      detectCollision({ object1: waterGirl, object2: pushersArray[i] })
    ) {
      pushersArray[i].pusherPushed();
    } else {
      pushersArray[i].pusherNotPushed();
    }
  }

  movingPlatformsArray.forEach((platform) => {
    platform.drawPlatform();
    let matchingPushers = pushersArray.filter((pusher) => {
      return pusher.color === platform.color && pusher.isPushed;
    });
    if (matchingPushers.length > 0) {
      // console.log(matchingPushers);
      matchingPushers.forEach(() => {
        platform.movePlatform(true);
      });
    } else {
      platform.movePlatform(false);
    }
  });
  fireBoy.update();
  waterGirl.update();
  // fireBoy.landingOnPlatforms();
  // waterGirl.landingOnPlatforms();
  // console.log(fireboyMovement.isGrounded);

  // Set the number of rows and columns in your map
  let numRows = Math.floor(myCanvas.height / tileSize);
  let numCols = Math.floor(myCanvas.width / tileSize);

  // Draw grid lines
  ctx.strokeStyle = "#ccc"; // Set the color of the grid lines
  ctx.lineWidth = 1;

  for (let i = 1; i < numRows; i++) {
    // Draw horizontal lines
    let y = i * tileSize;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(myCanvas.width, y);
    ctx.stroke();
  }

  for (let j = 1; j < numCols; j++) {
    // Draw vertical lines
    let x = j * tileSize;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, myCanvas.height);
    ctx.stroke();
  }

  requestAnimationFrame(animate);
}

animate();

//listen for the jumping event triggered by the player
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    if (fireboyMovement.isGrounded) {
      fireBoy.jump();
    }
  }
  if (e.key == "w") {
    if (watergirlMovement.isGrounded) {
      waterGirl.jump();
    }
  }
});
