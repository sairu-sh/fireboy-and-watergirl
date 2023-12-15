class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
  }

  /**
   * legend:
   * 1: ground/wall
   * 2: waterpool
   * 3: lava pool
   * 4: goo pool
   * 5: yellow pusher
   * 6: white pusher
   * 7: green pusher
   * 8: pink pusher
   * 10: lever
   * 16: yellow leftMovingPlatform
   * 17: yellow rightMovingPlatform
   * 18: yellow upMovingPlatform
   * 19: yellow DownMovingPlatform
   * 30: big block
   * 35:blue diamond
   * 36: red diamond
   * 40: yellow lever triggered left to right
   * 41: yellow lever triggered right to left
   */
  map = [
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 19, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 4, 0, 0,
      0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 0, 0, 0, 0,
      0, 0, 0, 0, 35, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 1, 1, 1,
      1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
  ];

  draw() {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        switch (tile) {
          case 1:
            platformArray.push(
              new Platform({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
                width: this.tileSize,
                height: this.tileSize,
              })
            );
            break;
          case 2:
            poolArray.push(
              new Pool({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
                width: this.tileSize * 5,
                height: this.tileSize,
                type: "water",
              })
            );
            break;
          case 3:
            poolArray.push(
              new Pool({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
                width: this.tileSize * 5,
                height: this.tileSize,
                type: "fire",
              })
            );
            break;
          case 4:
            poolArray.push(
              new Pool({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
                width: this.tileSize * 5,
                height: this.tileSize,
                type: "goo",
              })
            );
            break;
          case 5:
            pushersArray.push(
              new Pusher({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
                color: "purple",
              })
            );
            break;
          case 19:
            movingPlatformsArray.push(
              new MovingPlatforms({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
                width: 128,
                trigger: "pusher",
                color: "purple",
                movement: "verticalDown",
              })
            );
            break;
          case 30:
            blockArray.push(
              new Block({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
              })
            );
            break;
          case 35:
            diamondsArray.push(
              new Diamonds({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
                type: "water",
              })
            );
            break;
          case 36:
            diamondsArray.push(
              new Diamonds({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
                type: "fire",
              })
            );
            break;
          case 40:
            leverArray.push(
              new Lever({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
                color: "yellow",
                trigger: "leftToRight",
              })
            );
            break;
          case 41:
            leverArray.push(
              new Lever({
                position: {
                  x: column * this.tileSize,
                  y: row * this.tileSize,
                },
                color: "yellow",
                trigger: "rightToLeft",
              })
            );
            break;
          default:
            break;
        }
      }
    }
  }
}

console.log(leverArray);
