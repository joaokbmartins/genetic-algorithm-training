class Target {
  element = null;
  tilePosition = { x: 0, y: 0 };

  constructor() {
    this.createElement();
  }

  createElement() {
    this.element = document.createElement("span");
    this.element.setAttribute("class", "target");
  }

  updatePosition(tilePosition) {
    this.tilePosition = tilePosition;
    this.draw();
  }

  draw() {
    this.element.setAttribute(
      "style",
      `
        top: ${Start.calcSizeInPixels(this.tilePosition.y)}px;
        left: ${Start.calcSizeInPixels(this.tilePosition.x)}px;
      `
    );
  }
}
