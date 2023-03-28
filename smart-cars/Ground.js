class Ground {
  element = null;
  width = 0;
  height = 0;

  constructor() {
    this.readGroundElement();
  }

  readGroundElement() {
    this.element = document.getElementById("ground");
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

  emitUpdatedGroundSize(value) {
    const detail = { detail: value };
    const groundSizeEvent = new CustomEvent("ground-size-update", detail);
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
    this.emitUpdatedGroundSize({ width });
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
    this.emitUpdatedGroundSize({ height });
  }
}
