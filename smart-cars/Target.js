class Target {
  element = null;
  position = { x: 0, y: 0 };

  constructor() {
    this.createElement();
  }

  createElement() {
    this.element = document.createElement("span");
    this.element.setAttribute("class", "target");
  }

  updatePosition(position) {
    this.position = position;
    this.draw();
  }

  draw() {
    this.element.setAttribute(
      "style",
      `
        top: ${this.position.y}px;
        left: ${this.position.x}px;
      `
    );
    // console.log(this.position);
  }
}
