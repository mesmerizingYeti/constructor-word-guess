const Letter = require('./Letter.js')

function Word (str) {
  this.letters = str.split('').map(char => new Letter(char))
  this.displayWord = function () {
    return this.letters.map(letter => letter.displayLetter()).join('')
  }
  this.guessCharacter = function (char) {
    this.letters.forEach(letter => letter.checkCharacter(char))
  }
}