import { Piece, Rook, Knight, Bishop, Queen, King, Pawn, SlidingPiece, SteppingPiece } from './pieces/piece'

// const {
//   Rook,
//   Knight,
//   Bishop,
//   Queen,
//   King,
//   Pawn
// } = Piece

export default class Board {
  constructor() {
    this.grid = this.createGrid()
    this.placeStartingPositions()
  }

  createGrid () {
    let grid = []
    for (var i = 0; i < 8; i++) {
      grid.push([null, null, null, null, null, null, null, null])
    }
    return grid
  }

  inCheck(color) {
    let opposingColor = (color === "white") ? "black" : "white"
    let opposingPieces = coloredPieces(opposingColor)
    let kingPos = findKing(color)

    let inCheck = false
    opposingPieces.forEach( piece  => {
      if ( piece.validMove(kingPos) ) {
        inCheck = true
      }
    })
    return inCheck
  }

  findKing(color) {
    this.grid.forEach(row => {
      row.forEach(piece => {
        if ( piece !== null && piece.color === color && piece.to_s() === "K" ) {
          return piece.pos
        }
      })
    })
  }

  checkmate(color) {
    let board = this
    let pieces = coloredPieces(color)
    let checkmate = true
    pieces.forEach(piece => {
      let pieceMoves = piece.possibleMoves()
      pieceMoves.forEach(move => {
        let testBoard = board.duped
        testBoard.move(piece.pos, move)
        if (!testBoard.inCheck(color)) {
          checkmate = false
        }
      })
    })

    return checkmate
  }

  duped() {
    let dupedBoard = new Board ()
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        let piece = this.grid[i][j]

        if (piece === null) {
          dupedBoard[i][j] = null
        } else {
          let klass = piece.constructor.name
          dupedBoard[i][j] = new klass([i, j], piece.color, dupedBoard)
        }
      }
    }

    return dupedBoard
  }

  coloredPieces(color) {
    let colorArr = []
    this.grid.forEach(row => {
      row.forEach(piece => {
        if (piece !== null && piece.color === color) {
          colorArr.push(piece)
        }
      })
    })

    return colorArr
  }

  inBounds(pos) {
    let x, y;
    [x, y] = pos
    return ( x >= 0 && x <= 7 && y >= 0 && y <= 7 )
  }

  move(start, end) {
    let piece = this.grid[start[0]][start[1]]
    if (piece === null) return; //do something else tho
    if (!piece.validMove(end)) return; //do something else tho

    piece.updatePosition(end)
    this.grid[end[0]][end[1]] = piece
    this.grid[start[0]][start[1]] = null
    return this.grid
  }

  placeStartingPositions() {

    for (var i = 0; i < 8; i++) {
      this.grid[1][i] = new Pawn([1, i], "white", this)
      this.grid[6][i] = new Pawn([6, i], "black", this)
    }

      this.grid[0][0] = new Rook([0, 0], "white", this)
      this.grid[0][1] = new Knight([0, 1], "white", this)
      this.grid[0][2] = new Bishop([0, 2], "white", this)
      this.grid[0][3] = new Queen([0, 3], "white", this)
      this.grid[0][4] = new King([0, 4], "white", this)
      this.grid[0][5] = new Bishop([0, 5], "white", this)
      this.grid[0][6] = new Knight([0, 6], "white", this)
      this.grid[0][7] = new Rook([0, 7], "white", this)

      this.grid[7][0] = new Rook([7, 0], "black", this)
      this.grid[7][1] = new Knight([7, 1], "black", this)
      this.grid[7][2] = new Bishop([7, 2], "black", this)
      this.grid[7][3] = new Queen([7, 3], "black", this)
      this.grid[7][4] = new King([7, 4], "black", this)
      this.grid[7][5] = new Bishop([7, 5], "black", this)
      this.grid[7][6] = new Knight([7, 6], "black", this)
      this.grid[7][7] = new Rook([7, 7], "black", this)
  }
}
