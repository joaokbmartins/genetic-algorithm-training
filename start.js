let target = "to be or not to be";
let populationSize = 1000;
let mutationRate = 0.01;

let generations = 0;
let population = [];

let better = { parent: "", score: 0 };
let topfitness = [];

function clearScreen() {
  console.clear();
}

function randomNumber(min, max) {
  const charCode = Math.floor(Math.random() * (max - min)) + min;
  return charCode;
}

function newPopulation() {
  const newPopulation = [];
  "."
    .repeat(populationSize)
    .split("")
    .forEach(() => {
      const person = [];
      [...target.split("")].forEach(() => {
        const charCode = randomNumber(32, 126);
        const leter = String.fromCharCode([charCode]);
        person.push(leter);
      });
      newPopulation.push(person.join(""));
    });
  return newPopulation;
}

function setup() {
  population = newPopulation();
}

function drawPopulation() {
  const right = document.getElementsByClassName("right")[0];
  right.innerHTML = null;

  population.forEach((person, index) => {
    const row = document.createElement("div");
    row.innerText = `${index < 10 ? `0${index}` : index}) ${person}`;
    right.append(row);
  });
}

function crossover(fitness) {
  const percentPop = [];
  const found = false;
  fitness.forEach(({ person, score }) => {
    if (score <= 1) return;
    if (score > better?.score) {
      better = { person, score };
      topfitness.push(better);
    }

    if (person === target) {
      found = true;
      return;
    }
    for (let qtd = 0; qtd < score; qtd++) {
      percentPop.push(person);
    }
  });
  // console.log(percentPop);

  const newPopulation = [];
  "."
    .repeat(populationSize)
    .split("")
    .forEach(() => {
      const indexParent1 = randomNumber(0, percentPop.length);
      const parent1 = "" + percentPop[indexParent1];

      const indexParent2 = randomNumber(0, percentPop.length);
      const parent2 = "" + percentPop[indexParent2];

      // console.log(indexParent1, indexParent2);
      // console.log({ parent1 }, { parent2 });

      const size1 = Math.floor(parent1.length / 2);
      const size2 = Math.floor(parent2.length / 2);

      const person = parent1.substring(0, size1) + parent2.substring(0, size2);
      // console.log(`
      //   ${parent1.substring(0, size1)} -
      //   ${parent2.substring(0, size2)} -
      //   ${person}
      // `);
      newPopulation.push(person);
    });

  population = newPopulation;

  if (found || generations >= 5) return;
  setTimeout(() => {
    draw();
  }, 10);
}

function evaluateFitness() {
  const fitness = [];
  population.forEach((person) => {
    let score = [];
    person.split("").forEach((pLeter) => {
      target.split("").forEach((tLeter) => {
        const p = pLeter.toLowerCase();
        const t = tLeter.toLowerCase();
        if (p === t) score.includes(p) ? null : score.push(p);
      });
    });
    fitness.push({ person, score: score.length });
  });

  // console.log(fitness);
  crossover(fitness);
}

function drawInfo() {
  const data = document.getElementsByClassName("data")[0];
  data.innerHTML = `
    Target: ${target}
    <br/>
    <br/>
    Mutation Rate: ${mutationRate * 100}% 
    <br/>
    Generations: ${generations} 
    <br/>
    Actual: ${better.person} ${better.score} 
    <br/>
    ${JSON.stringify(topfitness)}
  `;
}

function draw() {
  generations += 1;
  drawPopulation();
  drawInfo();
  evaluateFitness();
}

clearScreen();
setup();
draw();

// population.forEach((person, index) => {
//   console.log(index, person, person.length);
// });

for (let x = 0; x < 3; x++) {
  // console.log(123);
}
