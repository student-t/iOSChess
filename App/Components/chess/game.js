import Board from './board'
import Player from './player'

export default class Game {
  constructor() {
    this.board = new Board()
    // this.playerOne = new Player()
    // this.playerTwo = new Player()
    // this.currentPlayer = this.playerOne
    // this.otherPlayer = this.playerTwo
    this.history = []
  }

  // switchPlayers() {
  //   if (this.currentPlayer === this.playerOne) {
  //     this.currentPlayer = this.playerTwo
  //     this.otherPlayer = this.playerOne
  //   } else {
  //     this.currentPlayer = this.playerOne
  //     this.otherPlayer = this.playerTwo
  //   }
  // }

  // play() {
  //   while (!this.isOver) {
  //     let positions = this.currentPlayer.getMove()
  //     this.board.move(positions)
  //
  //     if( board.inCheck(this.currentPlayer.color)) {
  //     }
  //
  //     if ( board.inCheck(this.otherPlayer.color) ) {
  //     }
  //
  //     this.switchPlayers()
  //   }
  // }

  move(start, end) {
    this.grid = this.board.move(start, end)
  }

  history() {

  }

  isOver() {
    return this.board.checkmate("black") || this.board.checkmate("white")
  }
}
