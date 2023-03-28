class Start {
  grid = [];
  needUpdateGroundPosition = false;

  car = null;
  ground = null;

  widthInputField = null;
  heightInputField = null;

  constructor(ground) {
    this.ground = ground;
    this.setupInputFieldListeners();
    this.createSizeEvents();
  }

  setupInputFieldListeners() {
    this.widthInputField = document.getElementById("width");
    this.heightInputField = document.getElementById("height");

    this.widthInputField.addEventListener("change", ({ target }) =>
      this.updateGroundWidth(target)
    );
    this.heightInputField.addEventListener("change", ({ target }) =>
      this.updateGroundHeight(target)
    );

    this.widthInputField.addEventListener("keyup", ({ target }) =>
      this.updateGroundWidth(target)
    );
    this.heightInputField.addEventListener("keyup", ({ target }) =>
      this.updateGroundHeight(target)
    );
  }

  updateGroundWidth({ value }) {
    console.log(this.widthInputField);
    console.log(this.widthInputField.focused);
    this.ground.updateGroundWidth(value);
  }

  updateGroundHeight({ value }) {
    this.ground.updateGroundHeight(value);
  }

  get movementButtons() {
    return {
      up: document.getElementById("up"),
      down: document.getElementById("down"),
      left: document.getElementById("left"),
      right: document.getElementById("right"),
    };
  }

  createSizeEvents() {}
}

INPUT_FOCUSED = false;

GROUND_TILE = 11;
EVEN_TILE_CORRECTION = 5;
FONT_CORRECTION = 1.4;
GRID_WIDTH = 1;

const ground = new Ground();

const main = new Start(ground);

const GROUND_LOCATION = main.groundLocation;
const GROUND = main.ground;

const dna = new DNA(main.movementButtons);

function draw() {
  dna.draw();
  setTimeout(() => draw(), 100);
}

draw();
