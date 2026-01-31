import { Game, GameResult } from '../game';
import { describe, it, expect } from 'vitest';
const SECRET_NUMBERS = [2, 10, 50, 99, 100];
const MAX_ATTEMPTS = 10;

function createGameWithSecret(secretNumber: number): Game {
  return new Game({ generate: () => secretNumber });
}

describe('Game', () => {
  it.each(SECRET_NUMBERS)(
    'devrait retourner VICTORY si le nombre est deviné correctement (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      const result = game.guess(secretNumber);
      expect(result).toBe(GameResult.VICTORY);
    }
  );

  it.each(SECRET_NUMBERS)(
    'devrait retourner TOO_BIG si le nombre est trop grand (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      const result = game.guess(secretNumber + 1);
      expect(result).toBe(GameResult.TOO_BIG);
    }
  );

  it.each(SECRET_NUMBERS)(
    'devrait retourner TOO_SMALL si le nombre est trop petit (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      const result = game.guess(secretNumber - 1);
      expect(result).toBe(GameResult.TOO_SMALL);
    }
  );

  it.each(SECRET_NUMBERS)(
    'devrait retourner DEFEAT si plus de 10 essais ont été faits (secret=%i)',
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

  it.each(SECRET_NUMBERS)(
    "devrait retourner le nombre d'essais faits (secret=%i)",
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
    "devrait retourner le nombre d'essais restants (secret=%i)",
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
    'devrait retourner true si le jeu est terminé (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        game.guess(secretNumber + i + 1);
      }
      expect(game.isGameOver()).toBe(true);
    }
  );

  it.each(SECRET_NUMBERS)(
    'devrait retourner true si le joueur a gagné (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      game.guess(secretNumber);
      expect(game.hasWon()).toBe(true);
    }
  );

  it.each(SECRET_NUMBERS)(
    'devrait retourner le nombre secret (secret=%i)',
    (secretNumber) => {
      const game = createGameWithSecret(secretNumber);
      expect(game.getSecretNumber()).toBe(secretNumber);
    }
  );

  it.each([10, 25, 50])(
    'devrait réinitialiser le jeu avec startNewGame (secret=%i)',
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
