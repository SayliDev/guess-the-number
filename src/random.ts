export interface RandomGenerator {
  generate(min: number, max: number): number;
}

export class Random implements RandomGenerator {
  generate(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
