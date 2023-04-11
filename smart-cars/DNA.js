class DNA {
  gen;
  car;

  btnContinue;
  btnFitness;

  movementList = [];
  moveLimit = 60;

  fitnessList = [];

  constructor() {
    this.#init();
    this.listenGroundResize();
    this.car = new Car();
    GROUND.addElement(this.car.element);
    this.setFitnessControlButtons();
  }

  #init() {
    this.car = null;
  }

  async draw() {
    // if (this.counter <= 0)
    /* STEP 1 */ await this.createInitialRandomMovementList(); //
    // /* STEP 2 */ this.drawCarAtGivenPosition();
    /* STEP 3 */ this.evaluateFitness();
    /* STEP 4 */ this.crossover();

    // if (this.counter <= 0) setTimeout(() => this.draw(), 10);
    // this.counter++;
  }

  async createInitialRandomMovementList() {
    /* STEP 1 */
    console.log("STEP 1: RANDOM MOVEMENT LIST");
    do {
      this.moveCarRandomDirection();
      this.movementList.push({ ...this.car.position });
      this.car.updatePosition();
      await this.delay(25);
    } while (this.movementList.length < this.moveLimit);
  }

  // drawCarAtGivenPosition() {
  //   /* STEP 2 */
  //   console.log("STEP 2: DRAW CAR AT GIVEN POSITION");
  //   let counterr = 0;
  //   do {
  //     const position = this.movementList[counterr];
  //     this.car.moveToPosition(position);
  //     counterr++;
  //   } while (counterr < this.movementList.length);
  //   // for (let i = 0; i < this.movementList.length; i++) {}
  // }

  evaluateFitness() {
    /* STEP 3 */
    console.log("STEP 3: Evaluate Fitness");

    for (let i = 0; i < this.movementList.length; i++) {
      const position = this.movementList[i];
      const fitness = this.calcFitness(position);
      this.movementList[i] = { position, fitness };
    }
  }

  crossover() {
    /* STEP 4 */
    console.log("STEP 4: CROSSOVER");
    for (let i = 0; i < this.movementList.length; i++) {
      let firstRandomMove = this.nonZeroFitnessMovement();
      let secondRandomMove = this.nonZeroFitnessMovement();
      console.log(firstRandomMove);
      console.log(secondRandomMove);
    }
  }

  // ================================================================================
  // ================================================================================
  // ================================================================================
  // ================================================================================
  // ================================================================================

  targetPos = { x: 496, y: 111 };

  calcFitness(position) {
    const fitness = {
      final_x: Math.abs(
        (100 - (position.x * 100) / this.targetPos.x).toFixed(2)
      ),
      final_y: Math.abs(
        (100 - (position.y * 100) / this.targetPos.y).toFixed(2)
      ),
      result_x:
        (100 - (position.x * 100) / this.targetPos.x).toFixed(2) <= 50 ? 1 : 0,
      result_y:
        (100 - (position.y * 100) / this.targetPos.y).toFixed(2) <= 50 ? 1 : 0,
    };

    return fitness;
  }

  nonZeroFitnessMovement() {
    let counter = 0;
    let randomIndex = this.randomNumber();
    do {
      const movement = this.movementList[randomIndex];
      const { fitness } = movement;
      console.log(fitness.result_x, fitness.result_y);
      if (fitness.result_x && fitness.result_y) return movement;
      counter++;
    } while (counter < this.movementList.length);
  }

  randomNumber() {
    return Math.floor(Math.random() * this.movementList.length);
  }

  async delay(millis) {
    await new Promise((resolve) => setTimeout(() => resolve(), millis)).then();
  }

  setFitnessControlButtons() {
    this.btnContinue = document.getElementById("btnContinue");
    this.btnFitness = document.getElementById("btnFitness");

    this.btnContinue.addEventListener("click", () => {
      this.movementList = [];
      this.draw();
    });

    this.btnFitness.addEventListener("click", () => {
      this.evaluateFitness();
    });
  }

  get boundaries() {
    return {
      location: GROUND.location,
      size: GROUND.sizeInTales,
    };
  }

  listenGroundResize() {
    document.addEventListener("ground-resize", ({ detail }) => {
      this.car.boundaries = this.boundaries;
      this.car.resetCarPosition();
    });
  }

  moveCarRandomDirection() {
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
