class Ground {
  element;
  target;

  sizeInTales = {
    width: 50,
    height: 20,
  };

  constructor() {
    this.target = new Target();
    this.readGroundElement();
    this.addTarget();
    this.listenGroundResize();
  }

  readGroundElement() {
    this.element = document.getElementById("ground");
  }

  addTarget() {
    this.addElement(this.target.element);
    this.setTargetInitialPosition();
  }

  listenGroundResize() {
    document.addEventListener("ground-resize", (event) => {
      this.setTargetInitialPosition();
    });
  }

  setTargetInitialPosition() {
    const { width, height } = this.sizeInTales;
    const tilePosition = {
      x: width - 4,
      y: Math.floor(height / 2),
    };
    this.target.updatePosition(tilePosition);
  }

  addElement(element) {
    this.element.append(element);
  }

  get size() {
    return this.sizeInTales;
  }

  get location() {
    return {
      x: this.element.offsetLeft,
      y: this.element.offsetTop,
    };
  }

  emitGroundResize(value) {
    const detail = { detail: value };
    const groundSizeEvent = new CustomEvent("ground-resize", detail);
    document.dispatchEvent(groundSizeEvent);
  }

  updateGround({ width, height }) {
    this.sizeInTales.width = width;
    this.sizeInTales.height = height;
    this.needUpdateGroundPosition = true;
    this.element.setAttribute(
      "style",
      `
        width: ${Start.calcSizeInPixels(width)}px;
        height: ${Start.calcSizeInPixels(height)}px;
      `
    );
    this.emitGroundResize({ width, height });
  }
}
