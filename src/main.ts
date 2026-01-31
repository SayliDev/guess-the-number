import { Game } from './game';
import { Random } from './random';
import * as readline from 'readline';

const random = new Random();
const secretNumber = random.generate(1, 100);
const game = new Game(secretNumber, random);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  rl.question('Entrez un nombre entre 1 et 100: ', (input) => {
    const number = parseInt(input);

    if (isNaN(number)) {
      console.log('Veuillez entrer un nombre valide.');
      askQuestion();
      return;
    }

    if (number < 1 || number > 100) {
      console.log('Veuillez entrer un nombre entre 1 et 100 :');
      askQuestion();
      return;
    }

    const result = game.guess(number);
    console.log(result);

    if (game.isGameOver()) {
      rl.close();
      return;
    } else {
      askQuestion();
    }
  });
}

askQuestion();
