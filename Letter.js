function Letter (character) {
  this.character = character
  this.guessed = false
  this.displayCharacter = function () {
    return this.guessed ? this.character : '_'
  }
  this.checkCharacter = function (char) {
    this.guessed = char === this.character
  }
}

modules.exports = Letter