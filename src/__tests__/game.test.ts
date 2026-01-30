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
});
