class Car {
  element;
  position = { x: 0, y: 0 };

  boundaries = null;

  START_COLUMN = 3;
  moviments = {
    up: null,
    down: null,
    left: null,
    right: null,
  };

  constructor(boundaries) {
    if (!boundaries) return;
    this.element = document.createElement("span");
    this.boundaries = boundaries;

    this.#addClass();
    this.#setMovementButtons();
    this.#addKeyListeners();
    this.#addButtonsListeners();
    this.#listenGroundResize();
    this.#setInitialPosition();
    this.#setCarLocationStyle();
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
    const MIDDLE = 2;
    const { height } = this.boundaries.size;

    const x = GRID_WIDTH + this.START_COLUMN * TILE;
    const y = GRID_WIDTH + Math.floor(height / TILE / MIDDLE) * TILE;

    this.position = { x, y };
  }

  #setMovementButtons() {
    this.moviments.up = document.getElementById("btnUp");
    this.moviments.down = document.getElementById("btnDown");
    this.moviments.left = document.getElementById("btnLeft");
    this.moviments.right = document.getElementById("btnRight");
  }

  #listenGroundResize() {
    document.addEventListener("ground-resize", ({ detail }) => {
      console.log(" >>> ", { detail });
      this.resetCarPosition();
    });
  }

  #setCarLocationStyle() {
    this.element.setAttribute(
      "style",
      `
        top: ${this.position.y}px;
        left: ${this.position.x}px;
      `
    );
  }

  moveToPosition({ x, y }) {
    this.element.setAttribute("style", `top: ${y}px; left: ${x}px;`);
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
    if (this.position.y <= TILE) return;
    this.position.y -= TILE;
  }

  get moveRight() {
    if (this.position.x + TILE >= this.boundaries.size.width) return;
    this.position.x += TILE;
  }

  get moveDown() {
    if (this.position.y + TILE >= this.boundaries.size.height) return;
    this.position.y += TILE;
  }

  get moveLeft() {
    if (this.position.x <= TILE) return;
    this.position.x -= TILE;
  }
}
