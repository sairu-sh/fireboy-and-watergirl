class Lever {
  constructor({ position, color, trigger }) {
    this.position = position;
    this.color = color;
    this.active = false;
    this.image = new Image();
    this.image.src = "../../../spritesheet/mechanisms/lever.png";
    this.trigger = trigger;
    this.width = 50;
    this.height = 32;
    this.handleX = {
      position: {
        x:
          this.trigger == "rightToLeft"
            ? this.position.x + this.width
            : this.position.x,
        y: this.position.y,
      },
      width: 5,
      height: this.height,
    };
  }

  checkOverlapWithCharacter(character) {
    if (detectCollision({ object1: character, object2: this.handleX })) {
      if (
        character.vx > 0 &&
        this.handleX.position.x + this.handleX.width <=
          this.position.x + this.width
      )
        this.handleX.position.x = character.position.x + character.width + 0.01;
      else if (character.vx < 0 && this.handleX.position.x >= this.position.x)
        this.handleX.position.x = character.position.x - 0.01;
    }

    if (this.trigger == "rightToLeft") {
      if (this.handleX.position.x < this.position.x + this.width / 2)
        this.active = true;
      else this.active = false;
    } else {
      if (this.handleX.position.x > this.position.x + this.width / 2)
        this.active = true;
      else this.active = false;
    }
  }

  update() {
    if (this.trigger == "leftToRight") {
      if (this.handleX.position.x < this.position.x + this.width / 4) {
        setCropboxAttributes({
          position: {
            x: 0,
            y: 0,
          },
          width: 40,
          height: 55,
        });
      }
    } else {
      if (this.handleX.position.x > this.position.x + (this.width * 3) / 4) {
        setCropboxAttributes({
          position: {
            x: 0,
            y: 0,
          },
          width: 70,
          height: 150,
        });
      } else if (this.handleX.position.x >= this.position.x + this.width) {
        setCropboxAttributes({
          position: {
            x: 0,
            y: 0,
          },
          width: 70,
          height: 150,
        });
      }
    }
    this.drawLever();
  }

  drawLever() {
    // ctx.fillStyle = "yellow";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.handleX.position.x, this.position.y, 5, this.height);
    ctx.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      64,
      64
    );
  }
}

let leverArray = [];
