import { Game, GameResult } from '../game';
import { describe, it, expect } from 'vitest';
const SECRET_NUMBERS = [1, 2, 27, 49, 50, 83, 99, 100];
const MAX_ATTEMPTS = 10;

function createGameWithSecret(secretNumber: number): Game {
  return new Game({ generate: () => secretNumber });
}

describe('Game', () => {
  it.each(SECRET_NUMBERS)(
    'should return VICTORY if the number is guessed correctly (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      const result = game.guess(secretNumber);
      expect(result).toBe(GameResult.VICTORY);
    }
  );

  it.each(SECRET_NUMBERS)(
    'should return TOO_BIG if the number is too big (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      const result = game.guess(secretNumber + 1);
      expect(result).toBe(GameResult.TOO_BIG);
    }
  );

  it.each(SECRET_NUMBERS)(
    'should return TOO_SMALL if the number is too small (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      const result = game.guess(secretNumber - 1);
      expect(result).toBe(GameResult.TOO_SMALL);
    }
  );

  it.each(SECRET_NUMBERS)(
    'should return DEFEAT if more than 10 attempts have been made (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        game.guess(secretNumber + i + 1);
      }
      const result = game.guess(secretNumber + MAX_ATTEMPTS + 1);
      expect(result).toBe(GameResult.DEFEAT);
      expect(game.isGameOver()).toBe(true);
    }
  );

  it('should return VICTORY if the game is over and the player has won (secret=%i)', () => {
    const game = createGameWithSecret(10);
    game.guess(10);
    expect(game.isGameOver()).toBe(true);
    expect(game.hasWon()).toBe(true);
    expect(game.guess(10)).toBe(GameResult.VICTORY);
  });

  it.each(SECRET_NUMBERS)(
    'should return the number of attempts made (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      // je pars de 1 car sinon ça trouve le nombre secret (secretNumber + 0 = secretNumber)
      for (let i = 1; i <= MAX_ATTEMPTS; i++) {
        game.guess(secretNumber + i);
      }
      expect(game.getAttemptsMade()).toBe(MAX_ATTEMPTS);
    }
  );

  it.each(SECRET_NUMBERS)(
    'should return the number of attempts remaining (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      // pareil ici
      for (let i = 1; i <= MAX_ATTEMPTS; i++) {
        game.guess(secretNumber + i);
      }
      expect(game.getAttemptsLeft()).toBe(0);
    }
  );

  it.each(SECRET_NUMBERS)(
    'should return true if the game is over (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        game.guess(secretNumber + i + 1);
      }
      expect(game.isGameOver()).toBe(true);
    }
  );

  it.each(SECRET_NUMBERS)(
    'should return true if the player has won (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      game.guess(secretNumber);
      expect(game.hasWon()).toBe(true);
    }
  );

  it.each(SECRET_NUMBERS)(
    'should return the secret number (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      expect(game.getSecretNumber()).toBe(secretNumber);
    }
  );

  it.each([10, 25, 50])(
    'should reset the game with startNewGame (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      game.guess(Math.max(1, secretNumber - 5));
      game.guess(secretNumber + 5);
      expect(game.getAttemptsMade()).toBe(2);
      expect(game.isGameOver()).toBe(false);
      game.startNewGame();
      expect(game.getAttemptsMade()).toBe(0);
      expect(game.isGameOver()).toBe(false);
      expect(game.hasWon()).toBe(false);
    }
  );
});
