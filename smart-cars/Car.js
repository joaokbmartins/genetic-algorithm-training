class Car {
  element;
  tilePosition = { x: 0, y: 0 };

  boundaries;

  START_COLUMN = 3;
  moviments = {
    up: null,
    down: null,
    left: null,
    right: null,
  };

  constructor() {
    this.element = document.createElement("span");
    this.boundaries = GROUND.sizeInTales;

    this.#addClass();
    this.#setMovementButtons();
    this.#addKeyListeners();
    this.#addButtonsListeners();
    this.#listenGroundResize();
    this.#setInitialPosition();
  }

  #addClass() {
    this.element.setAttribute("class", "car");
  }

  #setInitialPosition() {
    this.resetCarPosition();
  }

  updateGroundSize(groundLocation) {
    this.groundLocation = groundLocation;
    this.resetCarPosition();
  }

  resetCarPosition() {
    const { height } = this.boundaries;
    const x = Math.floor(3);
    const y = Math.floor(height / 2);

    this.tilePosition = { x, y };
    this.updatePosition();
  }

  #setMovementButtons() {
    this.moviments.up = document.getElementById("btnUp");
    this.moviments.down = document.getElementById("btnDown");
    this.moviments.left = document.getElementById("btnLeft");
    this.moviments.right = document.getElementById("btnRight");
  }

  #listenGroundResize() {
    document.addEventListener("ground-resize", ({ detail }) => {
      this.boundaries = detail;
      this.resetCarPosition();
    });
  }

  #setCarLocationStyle() {
    this.element.setAttribute(
      "style",
      `
        top: ${Start.calcSizeInPixels(this.tilePosition.y)}px;
        left: ${Start.calcSizeInPixels(this.tilePosition.x)}px;
      `
    );
  }

  moveToPosition({ x, y }) {
    this.element.setAttribute(
      "style",
      `
        top: ${Start.calcSizeInPixels(y)}px; 
        left: ${Start.calcSizeInPixels(x)}px;
      `
    );
  }

  updatePosition() {
    this.#setCarLocationStyle();
  }

  #addButtonsListeners() {
    this.moviments.up.addEventListener("click", () => this.moveUp);
    this.moviments.right.addEventListener("click", () => this.moveRight);
    this.moviments.down.addEventListener("click", () => this.moveDown);
    this.moviments.left.addEventListener("click", () => this.moveLeft);
  }

  #addKeyListeners() {
    document.addEventListener("keyup", ({ code }) => {
      if (INPUT_FOCUSED) return;
      switch (code) {
        case "ArrowUp":
          return this.moveUp;

        case "ArrowRight":
          return this.moveRight;

        case "ArrowDown":
          return this.moveDown;

        case "ArrowLeft":
          return this.moveLeft;
      }
    });
  }

  get moveUp() {
    if (this.tilePosition.y <= 0) return;
    this.tilePosition.y -= 1;
    this.updatePosition();
  }

  get moveRight() {
    if (this.tilePosition.x >= this.boundaries.width - 1) return;
    this.tilePosition.x += 1;
    this.updatePosition();
  }

  get moveDown() {
    if (this.tilePosition.y >= this.boundaries.height - 1) return;
    this.tilePosition.y += 1;
    this.updatePosition();
  }

  get moveLeft() {
    if (this.tilePosition.x <= 0) return;
    this.tilePosition.x -= 1;
    this.updatePosition();
  }
}
