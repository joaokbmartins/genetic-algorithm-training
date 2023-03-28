class DNA {
  gen = null;
  car = null;
  fitness = 0;

  moveCount = 50;

  constructor(controllers) {
    this.watchGroundSizeUpdate();
    this.car = new Car(this.boundaries, controllers);
    GROUND.addElement(this.car.element);
  }

  get boundaries() {
    return {
      location: GROUND.location,
      size: GROUND.size,
    };
  }

  randomMove() {
    for (let i = 0; i < this.moveCount; i++) {
      const direction = Math.floor(Math.random() * 4);
      switch (direction) {
        case 0:
          return this.car.moveUp;
        case 1:
          return this.car.moveRight;
        case 2:
          return this.car.moveDown;
        case 3:
          return this.car.moveLeft;
      }
    }
  }

  watchGroundSizeUpdate() {
    document.addEventListener("ground-size-update", ({ detail }) => {
      this.car.boundaries = this.boundaries;
      this.car.resetCarPosition();
    });
  }

  draw() {
    this.car.setCarLocationStyle();
  }
}
