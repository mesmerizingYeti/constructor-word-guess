function Letter (character) {
  this.character = character
  this.guessed = character === '-'
  this.display = function () {
    return this.guessed ? this.character : '_'
  }
  this.guess = function (char) {
    return !this.guessed && (this.guessed = char === this.character)
  }
}

module.exports = Letter