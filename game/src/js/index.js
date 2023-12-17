let gameWon = false;
let gameOver = false;

let fireBoy;
let waterGirl;

function animate() {
  if (gameStart) {
    characters.forEach((character) => {
      if (character.element == "fire") fireBoy = character;
      else waterGirl = character;
    });
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.drawImage(background, 0, 0, myCanvas.width, myCanvas.height);
    doorArray.forEach((door) => {
      door.drawDoors();
      door.isOpen(fireBoy);
      door.isOpen(waterGirl);
    });

    if (doorArray[0].open && doorArray[1].open) {
      gameWon = true;
      fireBoy.position.x = 2000;
      waterGirl.position.x = 2000;
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

    diamondsArray.forEach((dia, i) => {
      dia.update();
      dia.collisionWithCharacter(fireBoy, i);
      dia.collisionWithCharacter(waterGirl, i);
    });

    fireBoy.update();
    waterGirl.update();
  }

  ctx.drawImage(timerImage, 520, 0, 200, 100);
  ctx.font = "30px Arial";
  ctx.fillStyle = "yellow";

  // Draw the timer text at position (10, 20)
  ctx.fillText(displayTime, 585, 40);

  let animationId = requestAnimationFrame(animate);
  if (gameOver) {
    cancelAnimationFrame(animationId);
    calculateScore();
    console.log(menu);
    let matchingScoreImage;
    scoreImages.forEach((img) => {
      img.classList.remove("active");
      if (img.dataset.id == scoreStatus) matchingScoreImage = img;
    });
    matchingScoreImage?.classList.add("active");
    scoreBoard.style.display = "block";
  }
}

animate();

function calculateScore() {
  if (diamondsArray.length == 0 && seconds <= 90) {
    scoreStatus = 1;
  } else if (diamondsArray.length !== 0 && seconds <= 90) {
    scoreStatus = 2;
  } else if (diamondsArray.length !== 0 && seconds > 90) {
    scoreStatus = 3;
  } else {
    scoreStatus = 4;
  }
}

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
