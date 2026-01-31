import { Random, RandomGenerator } from './random';

export enum GameResult {
  VICTORY = 'Bravo!',
  DEFEAT = 'Trop tard!',
  TOO_SMALL = 'Trop petit...',
  TOO_BIG = 'Trop grand...',
}

export class Game {
  private secretNumber: number;
  private attempts: number = 0;
  private readonly maxAttempts: number = 10;
  private won: boolean = false;
  private gameOver: boolean = false;

  constructor(private readonly random: RandomGenerator = new Random()) {
    this.secretNumber = this.random.generate(1, 100);
  }

  public guess(number: number): GameResult {
    if (this.gameOver) {
      return this.won ? GameResult.VICTORY : GameResult.DEFEAT;
    }

    this.attempts++;

    if (number === this.secretNumber) {
      this.won = true;
      this.gameOver = true;
      return GameResult.VICTORY;
    }

    if (this.attempts >= this.maxAttempts) {
      this.gameOver = true;
      return GameResult.DEFEAT;
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
    return this.won;
  }

  public startNewGame(): void {
    this.secretNumber = this.random.generate(1, 100);
    this.attempts = 0;
    this.gameOver = false;
    this.won = false;
  }

  public getSecretNumber(): number {
    return this.secretNumber;
  }
}
