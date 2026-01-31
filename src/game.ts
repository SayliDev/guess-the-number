import { Random, RandomGenerator } from './random';

export enum GameResult {
  VICTORY = 'Bravo!',
  TOO_LATE = 'Trop tard!',
  TOO_SMALL = 'Trop petit...',
  TOO_BIG = 'Trop grand...',
}

export class Game {
  private secretNumber: number;
  private attempts: number = 0;
  private readonly maxAttempts: number = 5;
  private numberGuessed: number | null = null;
  private gameOver: boolean = false;

  constructor(private readonly random: RandomGenerator = new Random()) {
    this.secretNumber = this.random.generate(1, 100);
  }

  public guess(number: number): GameResult {
    if (this.gameOver) {
      return GameResult.TOO_LATE;
    }

    this.attempts++;

    if (number === this.secretNumber) {
      this.numberGuessed = number;
      this.gameOver = true;
      return GameResult.VICTORY;
    }

    if (this.attempts >= this.maxAttempts) {
      this.gameOver = true;
      return GameResult.TOO_LATE;
    }

    if (number > this.secretNumber) {
      return GameResult.TOO_BIG;
    }

    return GameResult.TOO_SMALL;
  }

  public getAttemptsMade(): number {
    return this.attempts;
  }

  public getAttemptsLeft(): number {
    return this.maxAttempts - this.attempts;
  }

  public isGameOver(): boolean {
    return this.gameOver;
  }

  public hasWon(): boolean {
    return this.numberGuessed === this.secretNumber;
  }

  public startNewGame(): void {
    this.secretNumber = this.random.generate(1, 100);
    this.attempts = 0;
    this.gameOver = false;
    this.numberGuessed = null;
  }

  public getSecretNumber(): number {
    return this.secretNumber;
  }
}
