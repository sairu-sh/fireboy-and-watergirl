let tileSize = 32;
let tile = new TileMap(tileSize);
tile.draw();

let gameWon = false;
let gameOver = false;

let fireBoy;
let waterGirl;

characters.forEach((character) => {
  if (character.element == "fire") fireBoy = character;
  else waterGirl = character;
});

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  ctx.drawImage(background, 0, 0, myCanvas.width, myCanvas.height);

  doorArray.forEach((door) => {
    door.drawDoors();
    door.isOpen(fireBoy);
    door.isOpen(waterGirl);
  });

  if (doorArray[0].open && doorArray[1].open) {
    gameWon = true;
    // setTimeout
  }
  // fireBoy.collisionWithEdgeWalls();
  // waterGirl.collisionWithEdgeWalls();
  fireBoy.draw();
  waterGirl.draw();

  for (let i = 0; i < poolArray.length; i++) {
    poolArray[i].drawPool();
    fireBoy.collisionWithPools(poolArray[i]);
    waterGirl.collisionWithPools(poolArray[i]);
  }

  for (let i = 0; i < pushersArray.length; i++) {
    pushersArray[i].drawPusher();

    const isFireBoyColliding = detectCollision({
      object1: fireBoy,
      object2: pushersArray[i],
    });
    const isWaterGirlColliding = detectCollision({
      object1: waterGirl,
      object2: pushersArray[i],
    });
    const isBlockColliding = blockArray.some((block) =>
      detectCollision({ object1: block, object2: pushersArray[i] })
    );

    if (isFireBoyColliding || isWaterGirlColliding || isBlockColliding) {
      pushersArray[i].pusherPushed();
    } else {
      pushersArray[i].pusherNotPushed();
    }

    if (pushersArray[i].position.y <= pushersArray[i].originalY)
      pushersArray[i].pusherSoundDisabled = false;
  }

  leverArray.forEach((lever) => {
    lever.checkOverlapWithCharacter(fireBoy);
    lever.checkOverlapWithCharacter(waterGirl);
    lever.update();
  });

  movingPlatformsArray
    .filter((platform) => {
      return platform.trigger == "pusher";
    })
    .forEach((platform) => {
      platform.drawPlatform();
      let matchingPushers = pushersArray.filter((pusher) => {
        return pusher.color === platform.color && pusher.isPushed;
      });
      if (matchingPushers.length > 0) {
        matchingPushers.forEach(() => {
          platform.movePlatform(true);
        });
      } else {
        platform.movePlatform(false);
      }
    });

  movingPlatformsArray
    .filter((platform) => {
      return platform.trigger == "lever";
    })
    .forEach((platform) => {
      platform.drawPlatform();
      let matchingLevers = leverArray.filter((lever) => {
        return lever.color === platform.color && lever.isActive;
      });
      if (matchingLevers.length > 0) {
        matchingLevers.forEach(() => {
          platform.movePlatform(true);
        });
      } else {
        platform.movePlatform(false);
      }
    });

  // blockArray.forEach((block) => {
  //   block.update();
  //   pushersArray.forEach((pusher) => {
  //     if (detectCollision({ object1: block, object2: pusher })) {
  //       pusher.pusherPushed();
  //     }
  //   });
  // });

  diamondsArray.forEach((dia) => {
    dia.update();
    dia.collisionWithCharacter(fireBoy);
    dia.collisionWithCharacter(waterGirl);
  });

  fireBoy.update();
  waterGirl.update();

  // fireBoy.landingOnPlatforms();
  // waterGirl.landingOnPlatforms();
  // console.log(fireboyMovement.isGrounded);

  // Set the number of rows and columns in your map
  // let numRows = Math.floor(myCanvas.height / tileSize);
  // let numCols = Math.floor(myCanvas.width / tileSize);

  // // Draw grid lines
  // ctx.strokeStyle = "#ccc"; // Set the color of the grid lines
  // ctx.lineWidth = 1;

  // for (let i = 1; i < numRows; i++) {
  //   // Draw horizontal lines
  //   let y = i * tileSize;
  //   ctx.beginPath();
  //   ctx.moveTo(0, y);
  //   ctx.lineTo(myCanvas.width, y);
  //   ctx.stroke();
  // }

  // for (let j = 1; j < numCols; j++) {
  //   // Draw vertical lines
  //   let x = j * tileSize;
  //   ctx.beginPath();
  //   ctx.moveTo(x, 0);
  //   ctx.lineTo(x, myCanvas.height);
  //   ctx.stroke();
  // }

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
