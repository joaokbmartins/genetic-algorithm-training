class Ground {
  element = null;
  target = null;

  width = 0;
  height = 0;

  constructor() {
    this.readGroundElement();
    this.addTarget();
    this.listenGroundResize();
  }

  readGroundElement() {
    this.element = document.getElementById("ground");
  }

  listenGroundResize() {
    document.addEventListener("ground-resized", (event) => {
      this.setTargetInitialPosition();
    });
  }

  addTarget() {
    this.target = new Target();
    this.addElement(this.target.element);
    this.setTargetInitialPosition();
  }

  setTargetInitialPosition() {
    const MIDDLE = 2;
    const { width, height } = this.size;

    console.log(height, height / 2, Math.floor(height / 2));

    const position = {
      x: width - TILE * 5,
      y: GRID_WIDTH + Math.floor(height / TILE / MIDDLE) * TILE,
    };
    this.target.updatePosition(position);
  }

  addElement(element) {
    this.element.append(element);
  }

  get size() {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    };
  }

  get location() {
    return {
      x: this.element.offsetLeft,
      y: this.element.offsetTop,
    };
  }

  emitGroundResize(value) {
    const detail = { detail: value };
    const groundSizeEvent = new CustomEvent("ground-resized", detail);
    document.dispatchEvent(groundSizeEvent);
  }

  updateGroundWidth(width) {
    this.needUpdateGroundPosition = true;
    const height = this.element.clientHeight;
    this.element.setAttribute(
      "style",
      `
        width: calc((11px * ${width - 1}) + 12px);
        height: ${height}px;
      `
    );
    this.emitGroundResize({ width });
  }

  updateGroundHeight(height) {
    this.needUpdateGroundPosition = true;
    const wwidth = this.element.clientWidth;
    this.element.setAttribute(
      "style",
      `
        height: calc((11px * ${height - 1}) + 12px);
        width: ${wwidth}px;
      `
    );
    this.emitGroundResize({ height });
  }
}
