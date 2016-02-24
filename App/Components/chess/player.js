export default class Player {
  constructor(color, board, name = "Player") {
    this.color = color
    this.board = board
    this.name = name
    this.startPos = null
    this.endPos = null
  }

  getMove() {
    while (!this.startPos || !this.endPos) {
      this.getPosition()
    }
  }

  getPosition() {

  }

  resetPos() {
    this.startPos = null
    this.endPos = null
  }

}

module.exports = Player
