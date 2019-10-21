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
      let result = false, 
        gameOver = false,
        message = ''
      phrase.forEach(word => result = (word.guessCharacter(character) || result) ? true : false)

      if (result) {
        console.log(chalk.green(`\nCORRECT!!`))
        gameOver = phrase.every(word => word.guessed)
        message = chalk.green(`\nYou got it right! Next word...`)
      } else {
        guesses--
        gameOver = guesses === 0
        if (guesses > 0) {
          console.log(`${chalk.red('\nINCORRECT!!')}\n\n${guesses} guess${guesses === 1 ? '' : 'es'} remaining!!`)
        }
        message = chalk.red(`\nYou lost :( Next word...`)
      }

      if (gameOver) {
        console.log(message)
        startGame()
      } else {
        displayPhrase()
        guessLetter()
      }
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