let target;
let populationSize;
let mutationRate;

let actual;

let generations;
let generationLimit;

let population;

let RUNNING;

let highestFitness;

function initVariables() {
  target = "to be or not to be";
  // target = "zorba";
  populationSize = 1000;
  mutationRate = 0.05;

  actual = "";

  generations = 0;
  generationLimit = 5000;

  population = [];

  RUNNING = true;

  highestFitness = { person: "", fitness: 0 };
}

function randomNumber(min = 32, max = 127) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomPopulation() {
  for (let i = 0; i < populationSize; i++) {
    const size = target.length;
    let person = "";

    for (let l = 0; l < size; l++) {
      person += String.fromCharCode(randomNumber());
    }

    population.push(person);
  }
  // console.log(population);
}

function drawInfo() {
  generations += 1;
  const info = document.getElementsByClassName("data")[0];
  info.innerText = `
    Target: ${target}

    Actual: ${highestFitness.person}
    
    Generations: ${generations} 
    Generation Limit: ${generationLimit}
    Mutation Rate: ${mutationRate * 100}%  
  `;
}

function drawPopulation() {
  const right = document.getElementsByClassName("right")[0];
  let text = "";
  population.forEach((person, index) => {
    text += `
    ${index + 1 < 10 ? `0${index + 1}` : index + 1}) ${person}`;
  });
  right.innerText = text;
}

function evaluateFitness() {
  const populationFitness = [];

  population.forEach((person) => {
    let fitness = 0;

    for (let i = 0; i < target.length; i++) {
      if (String(person).includes(target[i])) fitness++;
      if (person.charAt(i) === target.charAt(i)) fitness++;
    }

    if (fitness > 0) populationFitness.push({ person, fitness });
    if (highestFitness.fitness < fitness) highestFitness = { person, fitness };
  });

  return populationFitness;
}

function crossover(populationFitness) {
  const populationAsPercent = [];
  for (let i = 0; i < populationFitness.length; i++)
    for (let l = 0; l < populationFitness[i].fitness; l++)
      populationAsPercent.push(populationFitness[i]);

  const newPopulation = [];

  for (let i = 0; i < populationSize; i++) {
    let person = "";
    const rand1 = Math.floor(Math.random() * populationAsPercent.length);
    const rand2 = Math.floor(Math.random() * populationAsPercent.length);

    const parent1 = populationAsPercent[rand1].person;
    const parent2 = populationAsPercent[rand2].person;

    const size1 = Math.floor(parent1.length / 2);

    const first = parent1.substring(0, size1);
    const second = parent2.substring(size1);

    person = first + second;

    const mutate = Math.floor(Math.random() * 100) <= mutationRate * 100;
    if (mutate) {
      const randChar = randomNumber();
      const randPos = randomNumber(0, target.length);
      // console.log("before mutation: ", person);
      let personArray = person.split("");
      personArray[randPos] = String.fromCharCode(randChar);
      person = personArray.join("");
      // console.log("after mutation: ", person);
    }

    newPopulation.push(person);
  }

  population = newPopulation;
}

function throwErrorIfFitnessNotFound(populationFitness) {
  if (!populationFitness?.length)
    throw new Error("Error: !!!!! Not fitness found !!!!!");
}

function init() {
  const populationFitness = evaluateFitness();
  throwErrorIfFitnessNotFound(populationFitness);

  crossover(populationFitness);

  drawInfo();
  drawPopulation();

  setTimeout(() => {
    if (
      RUNNING &&
      generations < generationLimit &&
      highestFitness.person !== target
    )
      init();
    else if (highestFitness.person === target) RUNNING = false;
  }, 10);
}

function setStop() {
  const button = document.getElementById("switch");
  button.addEventListener("click", () => {
    if (RUNNING) RUNNING = false;
    else setup();
  });
}

function setup() {
  console.clear();
  initVariables();
  randomPopulation();
  init();
}

setStop();
setup();
