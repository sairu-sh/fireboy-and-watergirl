class Lever {
  constructor({ position, color, trigger }) {
    this.position = position;
    this.color = color;
    this.active = false;
    this.image = new Image();
    this.image.src = "../../../spritesheet/mechanisms/lever.png";
    this.trigger = trigger;
  }

  drawLever() {
    ctx.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      32,
      64
    );
  }
}

let lever = [];
