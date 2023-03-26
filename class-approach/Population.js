class Population {
  constructor(mutationRate, size, targetLength) {
    this.mutationRate = mutationRate;
    this.size = size;
    this.people = [];
    this.targetLength = targetLength;
  }

  createPopulation() {
    for (let i = 0; i < this.size; i++) {
      const dna = new DNA(this.mutationRate, this.targetLength);
      dna.generate();
      this.people.push(dna);
    }
  }

  mutate() {
    for (let i = 0; i < this.people.length; i++) this.people[i].mutate();
  }

  evaluateFitness(target) {
    for (let i = 0; i < this.people.length; i++) {
      this.people[i].evaluateFitness(target);
      if (this.people[i].fitness === 100) return true;
    }
    return false;
  }

  crossover() {
    const fitnessBucket = [];
    for (let i = 0; i < this.people.length; i++)
      for (let j = 0; j < this.people[i].fitness; j++) {
        // log(this.people[i].fitness);
        fitnessBucket.push(this.people[i]);
      }

    if (!fitnessBucket.length) log("Not fitness found.");
    else {
      for (let i = 0; i < this.people.length; i++) {
        const index1 = floor(random(fitnessBucket.length));
        const index2 = floor(random(fitnessBucket.length));

        const first = fitnessBucket[index1];
        const second = fitnessBucket[index2];

        const middle = floor(random(first.length));

        const child = new DNA(this.mutationRate, this.targetLength);

        for (let j = 0; j < fitnessBucket[index1].length; j++)
          if (j < middle) child.gens.push(first.gens[j]);
          else child.gens.push(second.gens[j]);

        this.people[i] = child;
      }
    }
  }
}

const TARGET = "O rato roeu a roupa do rei de Roma.";
const TARGET_LENGTH = TARGET.length;
const MUTATION_RATE = 0.1;
const POPULATION_SIZE = 1000;

let limit = 5000;

const population = new Population(
  MUTATION_RATE,
  POPULATION_SIZE,
  TARGET_LENGTH
);
population.createPopulation();

let counter = 0;
function start() {
  population.mutate();
  const result = population.evaluateFitness(TARGET);

  if (result) {
    log(`Generations: ${counter + 1}`);
    return;
  }
  population.crossover();
  counter++;

  setTimeout(() => start(), 10);
}

start();
