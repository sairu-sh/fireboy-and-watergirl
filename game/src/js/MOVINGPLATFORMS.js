class MovingPlatforms {
  constructor({ position, width, trigger, color, movement }) {
    this.position = position;
    this.trigger = trigger;
    this.color = color;
    this.movement = movement;
    this.width = width;
    this.height = 20;
    this.originalX = this.position.x;
    this.originalY = this.position.y;
    this.maxDisplacement = 120;
    this.image = new Image();
    this.image.src = "../../../spritesheet/purplePlatform.svg";
    this.active = false;
  }

  /**
   * always move the platform towards the original position
   */
  updatePlatform() {
    switch (this.movement) {
      case "horizontalRight":
        this.x;
        break;
      case "horizontalLeft":
        break;
      case "verticalDown":
        break;
      case "verticalUp":
    }
  }

  movePlatform(isPushed) {
    this.active = isPushed;
    switch (this.movement) {
      case "horizontalRight":
        if (isPushed) {
          if (this.position.x < this.originalX + this.maxDisplacement)
            this.position.x += 2;
        } else {
          if (this.position.x >= this.originalX) this.position.x -= 2;
        }
        break;
      case "horizontalLeft":
        if (isPushed) {
          if (this.position.x >= this.originalX - this.maxDisplacement)
            this.position.x -= 2;
        } else {
          if (this.position.x + this.width < this.originalX)
            this.position.x += 2;
        }

        break;
      case "verticalDown":
        if (isPushed) {
          if (this.position.y < this.originalY + this.maxDisplacement)
            this.position.y += 2;
        } else {
          if (this.position.y > this.originalY) this.position.y -= 2;
        }

        break;
      case "verticalUp":
        if (isPushed) {
          if (this.position.y > this.originalY - this.maxDisplacement)
            this.position.y -= 2;
        } else {
          if (this.position.y < this.originalY) this.position.y += 2;
        }
        break;
    }
  }

  drawPlatform() {
    if (this.active) {
      setCropboxAttributes({
        position: {
          x: 1,
          y: 1,
        },
        width: 277,
        height: 94,
      });
    } else {
      setCropboxAttributes({
        position: {
          x: 300,
          y: 1,
        },
        width: 305,
        height: 94,
      });
    }

    ctx.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      30
    );
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.position.x, this.position.y, 20, 20);
  }
}

let movingPlatformsArray = [];
