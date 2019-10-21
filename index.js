const Word = require(`./Word`)
const buzzwords = require(`./buzzwords`)
const inquirer = require(`inquirer`)
const chalk = require(`chalk`)

let phrase = []
let guesses

const validateInput = async (input) => {
  if (/[a-zA-Z]/.test(input) && input.length === 1) {
    return true
  }
  return `You need to guess a letter!`
}

const displayPhrase = _ => console.log(`
  ${phrase.map(word => word.display()).join(' ')}
  `)

const guessLetter = _ => {
  inquirer.prompt({
    type: `input`,
    name: `character`,
    message: `Guess a letter:`,
    validate: validateInput
  })
    .then(({ character }) => {
      if (phrase.some(word => word.guessCharacter(character))) {
        console.log(chalk.green(`\nCORRECT!!`))
      } else {
        console.log(chalk.red(`\nINCORRECT!!`))
      }
      displayPhrase()
      guessLetter()
      // if (phrase.every(word => word.guessed)) {
      //   console.log(`You got it right! Next Word...`)
      //   startGame()
      // } else if (guesses > 0) {
      //   displayPhrase()
      //   guessLetter()
      // }
    })
    .catch(e => console.log(e))
}

const startGame = _ => {
  guesses = 10
  phrase = buzzwords.buzzwords().split(' ').map(word => new Word(word))
  displayPhrase()
  guessLetter()
}

startGame()