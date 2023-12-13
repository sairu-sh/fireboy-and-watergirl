class Character {
  constructor({ position, element }) {
    this.position = position;
    this.width = 50;
    this.height = 50;
    this.element = element;
    this.initialVelocity = -5;
    this.image = new Image();
    this.color = this.element == "fire" ? "red" : "blue";
    this.vx = SPEEDX;
    this.vy = SPEEDY;
    this.isPushingBlock = false;
    fireboyMovement.isGrounded = watergirlMovement.isGrounded = false;
  }

  update() {
    /**
     * x-axis movement
     */
    if (this.element == "fire") {
      if (!fireboyMovement.right && !fireboyMovement.left) fireBoy.vx = 0;
      if (fireboyMovement.right)
        this.isPushingBlock ? (fireBoy.vx = 2) : (fireBoy.vx = SPEEDX);
      if (fireboyMovement.left)
        this.isPushingBlock ? (fireBoy.vx = -2) : (fireBoy.vx = -SPEEDX);
      this.position.x += this.vx;
      this.horizontalCollisionWithPlatforms();
      this.horizontalCollisionWithBlock();
      this.applyGravity();
      this.verticalCollisionWithPlatforms();
      this.verticalCollisionWithBlock();
    } else {
      if (!watergirlMovement.right && !watergirlMovement.left) waterGirl.vx = 0;
      if (watergirlMovement.right)
        this.isPushingBlock ? (waterGirl.vx = 2) : (waterGirl.vx = SPEEDX);
      if (watergirlMovement.left)
        this.isPushingBlock ? (waterGirl.vx = -2) : (waterGirl.vx = -SPEEDX);
      this.position.x += this.vx;
      this.horizontalCollisionWithPlatforms();
      this.horizontalCollisionWithBlock();
      this.applyGravity();
      this.verticalCollisionWithPlatforms();
      this.verticalCollisionWithBlock();
    }
  }
  /**
   * check if the character is grounded or not and set vy to a fixed value if it is grounded when user triggers the jump mechanism
   */
  jump() {
    if (this.element == "fire") {
      fireboyMovement.isGrounded = false;
      this.vy = -8;
    } else {
      watergirlMovement.isGrounded = false;
      this.vy = -8;
    }
  }

  /**
   * add gravity to the character after it jumps to make it fall after it reaches a certain height
   */
  applyGravity() {
    // if (this.element == "fire") {
    // if (!fireboyMovement.isGrounded) {
    this.position.y += this.vy;
    this.vy += GRAVITY;
    // }
    // } else {
    // if (!watergirlMovement.isGrounded) {
    // this.vy += GRAVITY;
    // }
    // }
  }

  // collisionWithEdgeWalls() {
  //   if (this.position.x + this.width >= myCanvas.width)
  //     this.position.x = myCanvas.width - this.width;
  //   if (this.position.x < 0) this.position.x = 0;
  // }

  // collisionWithPlatforms(platform) {
  //   this.verticalCollisionWithPlatforms(platform);
  // }

  horizontalCollisionWithPlatforms() {
    for (let i = 0; i < platformArray.length; i++) {
      let platform = platformArray[i];
      platform.drawPlatform();
      if (detectCollision({ object1: this, object2: platform })) {
        if (this.vx < 0) {
          this.vx = 0;
          this.position.x = platform.position.x + platform.width + 0.01;
        }
        if (this.vx > 0) {
          this.vx = 0;
          this.position.x = platform.position.x - this.width - 0.01;
        }
      }
    }
  }

  verticalCollisionWithPlatforms() {
    for (let i = 0; i < platformArray.length; i++) {
      let platform = platformArray[i];
      if (detectCollision({ object1: this, object2: platform })) {
        if (this.vy < 0) {
          this.vy = 0;
          this.position.y = platform.position.y + platform.height + 0.01;
        }
        if (this.vy > 0) {
          this.vy = 0;
          this.position.y = platform.position.y - this.height - 0.01;
        }
        this.element == "fire"
          ? (fireboyMovement.isGrounded = true)
          : (watergirlMovement.isGrounded = true);
      }
    }
  }

  /**
   * check if the character is colliding with the top of a platform and make it land there if it does
   */
  // landingOnPlatforms(platform) {
  //   if (detectCollision({ object1: this, object2: platform })) {
  //     // this.position.y = platform.y - this.height;
  //     this.vy = 0;
  //     this.element == "fire"
  //       ? (fireboyMovement.isGrounded = true)
  //       : (watergirlMovement.isGrounded = true);
  //   }
  // }

  collisionWithPools(pool) {
    if (this.element == "fire") {
      if (pool.type == "fire") {
        return;
      } else {
        if (detectCollision({ object1: this, object2: pool })) {
          this.width = this.height = 0;
        }
      }
    } else {
      if (pool.type == "water") {
        return;
      } else {
        if (detectCollision({ object1: this, object2: pool })) {
          this.width = this.height = 0;
        }
      }
    }
  }

  // collisionWithPushers(pusher) {
  //   if (detectCollision({ object1: this, object2: pusher })) {
  //     pusher.position.y += 0.1;
  //   } else {
  //     // console.log(detectCollision({ object1: this, object2: pusher }));
  //     // if (pusher.position.y > pusher.originalY) pusher.position.y -= 0.5;
  //   }
  // }

  horizontalCollisionWithBlock() {
    blockArray.forEach((block) => {
      block.update();
      if (detectCollision({ object1: this, object2: block })) {
        if (this.vx < 0) {
          this.isPushingBlock = true;
          block.position.x += this.vx;
        }
        if (this.vx > 0) {
          this.isPushingBlock = true;
          block.position.x += this.vx;
        }
      } else {
        this.isPushingBlock = false;
      }
    });
    // if (this.vy < 0) {
    //   this.vy = 0;
    //   this.position.y = block.position.y + block.height + 0.01;
    // }
    // if (this.vy > 0) {
    //   this.vy = 0;
    //   this.position.y = block.position.y - this.height - 0.01;
    // }
  }

  verticalCollisionWithBlock() {
    blockArray.forEach((block) => {
      block.update();
      if (detectCollision({ object1: this, object2: block })) {
        if (this.vy < 0) {
          this.vy = 0;
          this.position.y = block.position.y + block.height + 0.01;
        }
        if (this.vy > 0) {
          this.vy = 0;
          this.position.y = block.position.y - this.height - 0.01;
          this.element == "fire"
            ? (fireboyMovement.isGrounded = true)
            : (watergirlMovement.isGrounded = true);
        }
      }
    });
  }

  /**
   * to render the relevant character image
   * @param {context} ctx
   */
  draw(ctx) {
    // console.log(this.vx);
    if (this.element == "fire") this.setFireboyCropbox();
    else this.setWatergirlCropbox();
    ctx.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      50,
      50
    );

    ctx.fillStyle = "transparent";
    ctx.fillRect(this.position.x, this.position.y, 50, 50);
    // console.log(this.position.y);
  }

  setFireboyCropbox() {
    if (this.vx == 0 && fireboyMovement.isGrounded) {
      this.image.src = "../../../spritesheet/fire_boy_character.png";
      setCropboxAttributes({
        position: {
          x: 0,
          y: 0,
        },
        width: 35,
        height: 59,
      });
    } else if (this.vy < 0 && fireboyMovement.right) {
      this.image.src = "../../../spritesheet/fbSpriteFinal.svg";
      setCropboxAttributes({
        position: {
          x: 887,
          y: 9,
        },
        width: 76,
        height: 124,
      });
    } else if (this.vy < 0 && fireboyMovement.left) {
      this.image.src = "../../../spritesheet/fbSpriteFinal.svg";
      setCropboxAttributes({
        position: {
          x: 785,
          y: 9,
        },
        width: 92,
        height: 111,
      });
    } else if (fireboyMovement.left) {
      this.image.src = "../../../spritesheet/fire boy_run left.gif";
      setCropboxAttributes({
        position: {
          x: 1,
          y: 1,
        },
        width: 40,
        height: 60,
      });
    } else if (fireboyMovement.right) {
      this.image.src = "../../../spritesheet/fire boy_run right.gif";
      setCropboxAttributes({
        position: {
          x: -10,
          y: 1,
        },
        width: 60,
        height: 60,
      });
    } else if (this.vy < 0) {
      this.image.src = "../../../spritesheet/fbSpriteFinal.svg";
      setCropboxAttributes({
        position: {
          x: 591,
          y: 24,
        },
        width: 72,
        height: 109,
      });
    } else if (this.vy > 0) {
      this.image.src = "../../../spritesheet/fbSpriteFinal.svg";
      setCropboxAttributes({
        position: {
          x: 680,
          y: 0,
        },
        width: 81,
        height: 142,
      });
    }
  }

  setWatergirlCropbox() {
    this.image.src = "../../../spritesheet/wgSpriteFinal.svg";
    if (this.vx == 0 && watergirlMovement.isGrounded) {
      setCropboxAttributes({
        position: {
          x: 15,
          y: 37,
        },
        width: 74,
        height: 130,
      });
    } else if (this.vy < 0 && watergirlMovement.right) {
      setCropboxAttributes({
        position: {
          x: 880,
          y: 45,
        },
        width: 150,
        height: 100,
      });
    } else if (this.vy < 0 && watergirlMovement.left) {
      setCropboxAttributes({
        position: {
          x: 1000,
          y: 34,
        },
        width: 135,
        height: 95,
      });
    } else if (watergirlMovement.left) {
      setCropboxAttributes({
        position: {
          x: 440,
          y: 41,
        },
        width: 123,
        height: 120,
      });
    } else if (watergirlMovement.right) {
      setCropboxAttributes({
        position: {
          x: 110,
          y: 45,
        },
        width: 127,
        height: 120,
      });
    } else if (this.vy < 0) {
      setCropboxAttributes({
        position: {
          x: 712,
          y: 36,
        },
        width: 75,
        height: 125,
      });
    } else if (this.vy > 0) {
      setCropboxAttributes({
        position: {
          x: 802,
          y: 10,
        },
        width: 75,
        height: 144,
      });
    }
  }
}
