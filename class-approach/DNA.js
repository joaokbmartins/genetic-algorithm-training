class DNA {
  constructor(mutationRate, length) {
    this.mutationRate = mutationRate;
    this.length = length;
    this.gens = [];
    this.fitness = 0;
  }

  newGen() {
    const [min, max] = [63, 122];
    let char = floor(Math.random() * (max - min)) + min;
    if (char === 63) char = 32;
    if (char === 64) char = 46;
    return String.fromCharCode(char);
  }

  generate() {
    for (let i = 0; i < this.length; i++) {
      const gen = this.newGen();
      this.gens.push(gen);
    }
  }

  mutate() {
    const rate = this.mutationRate * 100;
    for (let i = 0; i < this.gens.length; i++) {
      const chance = random(100);
      if (chance <= this.mutationRate) this.gens[i] = this.newGen();
    }
  }

  evaluateFitness(target) {
    let accuracy = 0;
    for (let i = 0; i < this.gens.length; i++)
      if (this.gens[i] === target[i]) accuracy++;
    this.fitness = floor((accuracy / target.length) * 100);
  }
}

// const MUTATION_RATE = 0.01;
// const DNA_LENGTH = 10;

// const dna = new DNA(MUTATION_RATE, DNA_LENGTH);
// console.log(dna.gens);
// dna.generate();
// console.log(dna.gens);
// dna.mutate();
// console.log(dna.gens);
