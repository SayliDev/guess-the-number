export enum GameResult {
  VICTORY = 'Bravo!',
  TOO_LATE = 'Trop tard!',
  TOO_SMALL = 'Trop petit...',
  TOO_BIG = 'Trop grand...',
}

export class Game {
  constructor(private readonly secretNumber: number) {}
  private attempts: number = 0;
  private readonly maxAttempts: number = 5;
  private numberGuessed: number | null = null;
  private gameOver: boolean = false;

  public guess(number: number): GameResult {
    if (this.gameOver) {
      return GameResult.TOO_LATE;
    }
    console.log(this.secretNumber);

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
}
