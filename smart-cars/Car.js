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

  constructor(fieldPosition) {
    this.fieldPosition = fieldPosition;
    this.setupCar();
  }

  updateFildSize(fieldPosition) {
    this.position = {
      x: this.fieldPosition.x + 1,
      y: this.fieldPosition.y + 1,
    };
    this.fieldPosition = fieldPosition;
  }

  setupCar() {
    this.position = {
      x: this.fieldPosition.x + 1,
      y: this.fieldPosition.y + 1,
    };
    this.car = document.createElement("span");
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

  move(direction) {
    switch (direction) {
      case "up":
        if (this.position.y <= this.fieldPosition.y + 1) return;
        this.position.y -= 11;
        break;

      case "right":
        if (
          this.position.x >=
          this.fieldPosition.length.x + this.fieldPosition.x - 11
        )
          return;
        this.position.x += 11;
        break;

      case "down":
        if (
          this.position.y >=
          this.fieldPosition.length.y + this.fieldPosition.y - 11
        )
          return;
        this.position.y += 11;
        break;

      case "left":
        if (this.position.x <= this.fieldPosition.x + 1) return;
        this.position.x -= 11;
        break;
    }
  }

  draw() {
    this.car.setAttribute(
      "style",
      `
        display: flex;
        background-color: blue;
        height: 10px;
        width: 10px;
        position: absolute;
        top: ${this.position.y}px;
        left: ${this.position.x}px;
        border-radius: 0 100px 100px 0;
        box-shadow: white 0px 0px 11px 1px;
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
