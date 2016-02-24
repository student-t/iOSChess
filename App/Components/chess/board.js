import { Piece, Rook, Knight, Bishop, Queen, King, Pawn, SlidingPiece, SteppingPiece } from './pieces/piece'

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
    let opposingPieces = this.coloredPieces(opposingColor)
    let kingPos = this.findKing(color)

    let isInCheck = false
    opposingPieces.forEach( piece  => {
      let possibleMoves = piece.possibleMoves()
      for (var i = 0; i < possibleMoves.length; i++) {
        let move = possibleMoves[i]
        if (kingPos[0] === move[0] && kingPos[1] === move[1]) {
          isInCheck = true
        }
      }
    })

    return isInCheck
  }

  movesIntoCheck(pos, end, color) {
    let testBoard = this.duped()

    testBoard.move(pos, end)
    return (testBoard.inCheck(color)) ? true : false
  }

  findKing(color) {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        let piece = this.grid[i][j]
        if ( piece !== null && piece.constructor.name === "King" && piece.color === color) {
          return piece.pos
        }
      }
    }
  }

  checkmate(color) {
    let board = this
    let pieces = this.coloredPieces(color)

    for (var i = 0; i < pieces.length; i++) {
      let piece = pieces[i]
      let moves = piece.possibleMoves()
      for (var j = 0; j < moves.length; j++) {
        let move = moves[j]
        if (!this.movesIntoCheck(piece.pos, move, piece.color)) {
          return false
        }
      }
    }

    return true
  }

  duped() {
    let dupedBoard = new Board ()
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        let piece = this.grid[i][j]

        if (piece === null) {
          dupedBoard.grid[i][j] = null
        } else {
          let klass = piece.constructor
          dupedBoard.grid[i][j] = new klass([i, j], piece.color, dupedBoard)
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
    if (piece === null) return;
    piece.updatePosition(end)
    this.grid[end[0]][end[1]] = piece
    this.grid[start[0]][start[1]] = null
    return this.grid
  }

  placeStartingPositions() {

    for (var i = 0; i < 8; i++) {
      this.grid[1][i] = new Pawn([1, i], "black", this)
      this.grid[6][i] = new Pawn([6, i], "white", this)
    }

      this.grid[0][0] = new Rook([0, 0], "black", this)
      this.grid[0][1] = new Knight([0, 1], "black", this)
      this.grid[0][2] = new Bishop([0, 2], "black", this)
      this.grid[0][3] = new Queen([0, 3], "black", this)
      this.grid[0][4] = new King([0, 4], "black", this)
      this.grid[0][5] = new Bishop([0, 5], "black", this)
      this.grid[0][6] = new Knight([0, 6], "black", this)
      this.grid[0][7] = new Rook([0, 7], "black", this)

      this.grid[7][0] = new Rook([7, 0], "white", this)
      this.grid[7][1] = new Knight([7, 1], "white", this)
      this.grid[7][2] = new Bishop([7, 2], "white", this)
      this.grid[7][3] = new Queen([7, 3], "white", this)
      this.grid[7][4] = new King([7, 4], "white", this)
      this.grid[7][5] = new Bishop([7, 5], "white", this)
      this.grid[7][6] = new Knight([7, 6], "white", this)
      this.grid[7][7] = new Rook([7, 7], "white", this)
  }
}
