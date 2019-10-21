const Letter = require('./Letter.js')

function Word (str) {
  this.letters = str.split('').map(char => new Letter(char))
  this.guessed = false
  this.display = function () {
    return this.letters.map(letter => letter.display()).join('')
  }
  this.guessCharacter = function (char) {
    const result = this.letters.some(letter => letter.guess(char))
    this.guessed = this.letters.every(letter => letter.guessed)
    return result
  }
}

module.exports = Word