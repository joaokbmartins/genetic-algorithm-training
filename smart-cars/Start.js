class Start {
  car;
  grid = [];
  widthInput;
  heightInput;

  constructor() {
    this.field = document.getElementById("field");
    this.drawGrid();
    this.setupInputListeners();
  }

  drawGrid() {
    this.grid = document.createElement("div");
  }

  setupInputListeners() {
    this.widthInput = document.getElementById("width");
    this.heightInput = document.getElementById("height");

    this.widthInput.addEventListener("change", ({ target }) =>
      this.updateFieldWidth(target)
    );
    this.heightInput.addEventListener("change", ({ target }) =>
      this.updateFieldHeight(target)
    );

    this.widthInput.addEventListener("keyup", ({ target }) =>
      this.updateFieldWidth(target)
    );
    this.heightInput.addEventListener("keyup", ({ target }) =>
      this.updateFieldHeight(target)
    );
  }

  updateFieldWidth({ value }) {
    const height = this.field.clientHeight;
    this.field.setAttribute(
      "style",
      `
        width: calc((11px * ${value - 1}) + 12px);
        height: ${height}px;
      `
    );
  }

  updateFieldHeight({ value }) {
    const wwidth = this.field.clientWidth;
    this.field.setAttribute(
      "style",
      `
        height: calc((11px * ${value - 1}) + 12px);
        width: ${wwidth}px;
      `
    );
  }

  drawVehicle(vehicle) {
    this.field.append(vehicle);
  }

  get movementButtons() {
    return {
      up: document.getElementById("up"),
      down: document.getElementById("down"),
      left: document.getElementById("left"),
      right: document.getElementById("right"),
    };
  }

  get fieldPosition() {
    return {
      length: {
        x: this.field.offsetWidth,
        y: this.field.offsetHeight,
      },
      x: this.field.offsetLeft,
      y: this.field.offsetTop,
    };
  }

  main() {
    //
  }
}

const main = new Start();
const car = new Car(main.fieldPosition);

car.setControllers(main.movementButtons);

main.drawVehicle(car.vehicle);

function draw() {
  car.draw();
  setTimeout(() => draw(), 100);
}

draw();

// function run() {
//   main.drawGrid();
// }
