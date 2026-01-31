import { Game, GameResult } from './game';
import * as readline from 'readline';

const game = new Game();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Devinez le nombre entre 1 et 100');
console.log(`Vous avez ${game.getAttemptsLeft()} essais`);

function askQuestion() {
  rl.question(
    `Essai ${game.getAttemptsMade() + 1}/${
      game.getAttemptsMade() + game.getAttemptsLeft()
    } - Entrez un nombre: `,
    (input) => {
      const number = parseInt(input);

      if (isNaN(number)) {
        console.log('Veuillez entrer un nombre valide.\n');
        askQuestion();
        return;
      }

      if (number < 1 || number > 100) {
        console.log('Veuillez entrer un nombre entre 1 et 100.\n');
        askQuestion();
        return;
      }

      const result = game.guess(number);

      if (result === GameResult.VICTORY) {
        console.log(`\n${result}`);
        console.log(`Vous avez trouvé en ${game.getAttemptsMade()} essais.\n`);
        askPlayAgain();
      } else if (result === GameResult.DEFEAT) {
        console.log(`\n${result}`);
        console.log(`Le nombre était ${game.getSecretNumber()}\n`);
        askPlayAgain();
      } else {
        console.log(
          `${result} Il vous reste ${game.getAttemptsLeft()} essais.\n`
        );
        askQuestion();
      }
    }
  );
}

function askPlayAgain() {
  rl.question('Voulez vous rejouer ? (y/N): ', (answer) => {
    const response = answer.toLowerCase().trim();
    if (response === 'y') {
      game.startNewGame();
      console.log('Nouvelle partie !');
      console.log(`Vous avez ${game.getAttemptsLeft()} essais`);
      askQuestion();
    } else {
      rl.close();
    }
  });
}

askQuestion();
