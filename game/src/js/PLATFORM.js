class Platform {
  constructor({ position, width, height }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = "../../../spritesheet/block.png";
  }
  drawPlatform() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

let platformArray = [];
