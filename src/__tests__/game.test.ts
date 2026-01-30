import { Game, GameResult } from '../game';
import { describe, it, expect } from 'vitest';

describe('Game', () => {
  it('devrait retourner VICTORY si le nombre est deviné correctement', () => {
    const secretNumber = 10;
    const game = new Game(secretNumber);
    const result = game.guess(secretNumber);
    expect(result).toBe(GameResult.VICTORY);
  });

  it('devrait retourner TOO_BIG si le nombre est trop grand', () => {
    const secretNumber = 10;
    const game = new Game(secretNumber);
    const result = game.guess(secretNumber + 1);
    expect(result).toBe(GameResult.TOO_BIG);
  });

  it('devrait retourner TOO_SMALL si le nombre est trop petit', () => {
    const secretNumber = 10;
    const game = new Game(secretNumber);
    const result = game.guess(secretNumber - 1);
    expect(result).toBe(GameResult.TOO_SMALL);
  });

  it('devrait retourner TOO_LATE si plus de 5 essais ont été faits', () => {
    const secretNumber = 10;
    const game = new Game(secretNumber);
    for (let i = 0; i < 5; i++) {
      game.guess(secretNumber + i);
    }
    const result = game.guess(secretNumber + 5);
    expect(result).toBe(GameResult.TOO_LATE);
    expect(game.isGameOver()).toBe(true);
  });

  // getAttemptsMade
  it("devrait retourner le nombre d'essais faits", () => {
    const secretNumber = 10;
    const game = new Game(secretNumber);
    // je pars de 1 car sinon ca trouve le nombre secret (secretNumber + 0 = secretNumber)
    for (let i = 1; i <= 5; i++) {
      game.guess(secretNumber + i);
    }
    expect(game.getAttemptsMade()).toBe(5);
  });

  // getAttemptsLeft
  it("devrait retourner le nombre d'essais restants", () => {
    const secretNumber = 10;
    const game = new Game(secretNumber);
    // pareil que pour getAttemptsMade
    for (let i = 1; i <= 5; i++) {
      game.guess(secretNumber + i);
    }
    expect(game.getAttemptsLeft()).toBe(0);
  });

  // isGameOver
  it('devrait retourner true si le jeu est terminé', () => {
    const secretNumber = 10;
    const game = new Game(secretNumber);
    for (let i = 0; i < 5; i++) {
      game.guess(secretNumber + i);
    }
    expect(game.isGameOver()).toBe(true);
  });

  // hasWon
  it('devrait retourner true si le joueur a gagné', () => {
    const secretNumber = 10;
    const game = new Game(secretNumber);
    game.guess(secretNumber);
    expect(game.hasWon()).toBe(true);
  });
});
