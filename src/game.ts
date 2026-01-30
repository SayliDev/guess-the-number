export class Game {
  constructor(private readonly secretNumber: number) {}
  private attempts: number = 0;
  private readonly maxAttempts: number = 10;
  private numberGuessed: number | null = null;
  private gameOver: boolean = false;

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
