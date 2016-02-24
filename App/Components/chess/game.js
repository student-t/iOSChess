import Board from './board'
import Player from './player'

export default class Game {
  constructor() {
    this.board = new Board()
    this.history = []
  }

  move(start, end) {
    this.grid = this.board.move(start, end)
  }

  history() {

  }

  isOver() {
    return this.board.checkmate("black") || this.board.checkmate("white")
  }
}
