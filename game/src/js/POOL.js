class Pool {
  constructor({ position, width, height, type }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.type = type;
    switch (this.type) {
      case "water":
        this.color = "blue";
        break;
      case "fire":
        this.color = "red";
        break;
      case "goo":
        this.color = "green";
        break;
    }
    // this.boundingPlatform = new Platform({
    //   position: {
    //     x: this.position.x - 10,
    //     y: this.position.y,
    //   },
    //   width: this.width + 20,
    //   height: 25,
    // });
    // platformArray.push(this.boundingPlatform);
  }

  drawPool() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

let poolArray = [];
