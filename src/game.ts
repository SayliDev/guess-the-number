export enum GameResult {
  VICTORY = 'Bravo!',
  TOO_LATE = 'Trop tard!',
  TOO_SMALL = 'Plus petit...',
  TOO_BIG = 'Plus grand...',
}

export class Game {
  constructor(private readonly secretNumber: number) {}
  private attempts: number = 0;
  private readonly maxAttempts: number = 10;
  private numberGuessed: number | null = null;
  private gameOver: boolean = false;

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
      return GameResult.TOO_SMALL;
    }

    return GameResult.TOO_BIG;
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
}
