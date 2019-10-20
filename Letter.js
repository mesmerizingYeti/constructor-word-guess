function Letter (character) {
  this.character = character
  this.guessed = false
  this.returnCharacter = function () {
    return this.guessed ? this.character : '_'
  }
  this.checkCharacter = function (char) {
    this.guessed = char === this.character
  }
}

modules.exports = Letter