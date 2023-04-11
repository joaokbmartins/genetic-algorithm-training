class Start {
  grid = [];
  needUpdateGroundPosition = false;

  ground;

  widthInputField;
  heightInputField;

  constructor(ground) {
    if (ground instanceof Ground) this.ground = ground;
    this.setupInputFieldListeners();
  }

  static calcSizeInPixels(tileQtd) {
    return 11 * (tileQtd - 1) + 12;
  }

  setupInputFieldListeners() {
    this.widthInputField = document.getElementById("formWidth");
    this.heightInputField = document.getElementById("formHeight");

    this.onChange();
    this.onKeyUp();
  }

  onChange() {
    this.widthInputField.addEventListener("change", ({ target }) =>
      this.updateGroundWidth(target)
    );

    this.heightInputField.addEventListener("change", ({ target }) =>
      this.updateGroundHeight(target)
    );
  }

  onKeyUp() {
    this.widthInputField.addEventListener("keyup", ({ target }) =>
      this.updateGroundWidth(target)
    );

    this.heightInputField.addEventListener("keyup", ({ target }) =>
      this.updateGroundHeight(target)
    );
  }

  updateGroundWidth({ value }) {
    if (+value < 15) return (this.widthInputField.value = 15);
    const height = +this.heightInputField.value;
    this.ground.updateGround({ width: +value, height });
  }

  updateGroundHeight({ value }) {
    if (+value < 15) return (this.heightInputField.value = 15);
    const width = +this.widthInputField.value;
    this.ground.updateGround({ width, height: +value });
  }
}

INPUT_FOCUSED = false;
TILE = 11;
EVEN_TILE_CORRECTION = 5;
FONT_CORRECTION = 1.4;
GRID_WIDTH = 1;

const ground = new Ground();
const main = new Start(ground);

const GROUND_LOCATION = main.groundLocation;
const GROUND = main.ground;

const dna = new DNA();

function draw() {
  // dna.draw();
  setTimeout(() => draw(), 100);
}

draw();
