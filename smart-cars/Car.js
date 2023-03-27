class Car {
  car;
  position = { x: 0, y: 0 };
  fieldPosition = { x: 0, y: 0 };

  moviments = {
    up: null,
    down: null,
    left: null,
    right: null,
  };

  GRID_TILE = 11;
  EVEN_TILE_CORRECTION = 5;
  FONT_CORRECTION = 1.4;

  constructor(fieldPosition) {
    this.fieldPosition = fieldPosition;
    this.setupCar();
    this.addKeyListeners();
  }

  updateFildSize(fieldPosition) {
    this.fieldPosition = fieldPosition;
    this.resetCarPosition();
  }

  setupCar() {
    this.resetCarPosition();
    this.car = document.createElement("span");
    this.car.setAttribute("class", "car");
  }

  setControllers(controllers) {
    this.moviments.up = controllers.up;
    this.moviments.down = controllers.down;
    this.moviments.left = controllers.left;
    this.moviments.right = controllers.right;
    this.addMovements();
  }

  addMovements() {
    this.moviments.up.addEventListener("click", () => this.move("up"));
    this.moviments.down.addEventListener("click", () => this.move("down"));
    this.moviments.left.addEventListener("click", () => this.move("left"));
    this.moviments.right.addEventListener("click", () => this.move("right"));
  }

  addKeyListeners() {
    document.addEventListener("keyup", ({ code }) => {
      this.move(code);
    });
  }

  move(direction) {
    switch (direction) {
      case "up":
      case "ArrowUp":
        if (this.position.y <= this.fieldPosition.y + this.GRID_TILE + 1)
          return;
        this.position.y -= this.GRID_TILE;
        break;

      case "right":
      case "ArrowRight":
        if (
          this.position.x >=
          this.fieldPosition.length.x + this.fieldPosition.x - this.GRID_TILE
        )
          return;
        this.position.x += this.GRID_TILE;
        break;

      case "down":
      case "ArrowDown":
        if (
          this.position.y >=
          this.fieldPosition.length.y + this.fieldPosition.y - this.GRID_TILE
        )
          return;
        this.position.y += this.GRID_TILE;
        break;

      case "left":
      case "ArrowLeft":
        if (this.position.x <= this.fieldPosition.x + 1) return;
        this.position.x -= this.GRID_TILE;
        break;
    }
  }

  resetCarPosition() {
    let y =
      this.fieldPosition.y +
      Math.floor(this.fieldPosition.length.y / 2) +
      this.FONT_CORRECTION -
      this.GRID_TILE;

    if (this.fieldPosition.length.y % 2 === 0) y += this.EVEN_TILE_CORRECTION;

    this.position = { x: 49 + 1, y };
  }

  draw() {
    this.car.setAttribute(
      "style",
      `
        top: ${this.position.y}px;
        left: ${this.position.x}px;
      `
    );
  }

  get vehicle() {
    return this.car;
  }
}

// const car = new Car();
// car.draw();

// function draw() {
//   console.log("aui");
//   setTimeout(() => {
//     console.clear();
//     draw();
//   }, 1000);
// }

// draw();
