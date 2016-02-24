class Piece {
  constructor(pos, color, board) {
    this.pos = pos
    this.color = color
    this.board = board
  }

  validMove(endPos) {
    let movesOutOfCheck = [],
        possibleMoves = this.possibleMoves(),
        board = this.board

    for (var i = 0; i < possibleMoves.length; i++) {
      let move = possibleMoves[i]
      if ( endPos[0] === move[0] && endPos[1] === move[1] && !board.movesIntoCheck(this.pos, endPos, this.color)) {
        return true
      }
    }
    return false
  }


  updatePosition(pos) {
    let type = this.constructor.name
    if (type === "Rook" || type === "King") {
      this.moved = true
    }
    this.pos = pos

  }

  validMovePlay(pos) {
    let board = this.board

    return board.inBounds(pos) && ( board.grid[pos[0]][pos[1]] === null || board.grid[pos[0]][pos[1]].color !== this.color )
  }

  attack(pos) {
    let x, y;
    [x, y] = pos
    let piece = this.board.grid[x][y]

    if (piece === null) {
      return false
    } else {
      return this.color !== piece.color
    }
  }

  takeStep(dir) {
    let newX = this.pos[0] + dir[0]
    let newY = this.pos[1] + dir [1]
    return [newX, newY]
  }

  getPositions(movesArr) {
    let that = this
    let posMoves = []
    let mappedMoves = movesArr.map(move => {
      return this.takeStep(move)
    })
    mappedMoves.forEach(move => {
      if (that.validMovePlay(move)) {
        posMoves.push(move)
      }
    })

    return posMoves
  }
}

const ORTHOGONAL_MOVES = [
  [-1,  0],
  [ 0, -1],
  [ 0,  1],
  [ 1,  0]
]

const DIAGONAL_MOVES = [
  [-1, -1],
  [-1,  1],
  [ 1, -1],
  [ 1,  1]
]

class SlidingPiece extends Piece {
  constructor(pos, color, board) {
    super(pos, color, board)
  }

  possibleMoves() {
    let newPositions = [],
        moves = this.moves

        for (var i = 0; i < moves.length; i++) {
          let move = moves[i],
              posMove = this.takeStep(move)
          while (this.validMovePlay(posMove)) {
            newPositions.push(posMove)

            // if (this.attack(posMove)) {
            //   return newPositions
            // }

            let x, y;
            [x, y] = posMove
            posMove = [x + move[0], y + move[1]]
          }

        }

    return newPositions
  }
}

const KNIGHT_MOVES = [
    [-2, -1],
    [-2,  1],
    [-1, -2],
    [-1,  2],
    [ 1, -2],
    [ 1,  2],
    [ 2, -1],
    [ 2,  1]
  ]


class SteppingPiece extends Piece {
  constructor(pos, color, board) {
    super(pos, color, board)
    this.moves = KING_MOVES
  }

  possibleMoves() {
    return this.getPositions(this.moves)
  }
}

class Bishop extends SlidingPiece {
  constructor(pos, color, board) {
    super(pos, color, board)
    this.moves = DIAGONAL_MOVES
  }

  toString() {
    return "♝"
  }
}

class Rook extends SlidingPiece {
  constructor(pos, color, board) {
    super(pos, color, board)
    this.moves = ORTHOGONAL_MOVES
    this.moved = false
  }

  toString() {
    return "♜"
  }
}

class Queen extends SlidingPiece {
  constructor(pos, color, board) {
    super(pos, color, board)
    this.moves = DIAGONAL_MOVES.concat(ORTHOGONAL_MOVES)
  }

  toString() {
    return "♛"
  }
}

class Knight extends SteppingPiece {
  constructor(pos, color, board) {
    super(pos, color, board)
    this.moves = KNIGHT_MOVES
  }

  toString() {
    return "♞"
  }


}

const KING_MOVES = [
    [-1, -1],
    [-1,  0],
    [-1,  1],
    [ 0, -1],
    [ 0,  1],
    [ 1, -1],
    [ 1,  0],
    [ 1,  1]
  ]

class King extends SteppingPiece {
  constructor(pos, color, board) {
    super(pos, color, board)
    this.moves = KING_MOVES
    this.moved = false
  }

  toString() {
    return "♚"
  }

  possibleMoves() {
    return this.getPositions(this.moves).concat(this.castleMoves())
  }

  castleMoves() {
    if (this.moved) return []
    let board = this.board,
        moves = [],
        grid = board.grid,
        pos = this.pos,
        color = this.color


    let x, y, leftOne, leftTwo, leftThree, leftRook, rightOne, rightTwo, rightThree, rightRook;
    [x, y] = pos

    leftOne = grid[x - 1][y]
    leftTwo = grid[x - 2][y]
    leftThree = grid[x - 3][y]
    leftRook = grid[x - 4][y]
    rightOne = grid[x + 1][y]
    rightTwo = grid[x + 2][y]
    rightRook = grid[x + 3][y]

    if (leftRook.constructor.name === "Rook" && !leftRook.moved && !board.moveIntoCheck(pos, leftOne, color) && !board.moveIntoCheck(pos, leftTwo, color) &&
    !board.moveIntoCheck(pos, leftThree, color)) {
      moves.push([x - 3, y])
    }

    if (rightRook.constructor.name === "Rook" && !rightRook.moved && !board.moveIntoCheck(pos, rightOne, color) && !board.moveIntoCheck(pos, rightTwo, color)) {
      moves.push([x - 3, y])
    }
  }
}

const REG_MOVES = [
    [1,  0]
  ]

const  START_MOVES = [
    [1,  0],
    [2,  0]
  ]

const  ATTACK_MOVES = [
    [1, -1],
    [1,  1]
  ]

class Pawn extends Piece {
  constructor(pos, color, board) {
    super(pos, color, board)
    this.moves = [...REG_MOVES, ...START_MOVES, ...ATTACK_MOVES]
  }

  toString() {
    return "♟"
  }

  possibleMoves() {
    let orientStartMoves = this.peacefulPositions(this.orientMoves(START_MOVES))
    let orientRegMoves = this.peacefulPositions(this.orientMoves(REG_MOVES))
    let orientAttackMoves = this.attackPositions(this.orientMoves(ATTACK_MOVES))

    let newPositions = (this.isAtStart) ? orientStartMoves : orientRegMoves
    return [...newPositions, ...orientAttackMoves]
  }

  attackPositions(deltas) {
    let positions = [],
        that = this
    this.getPositions(deltas).forEach(pos => {
      if (that.attack(pos)) {
        positions.push(pos)
      }
    })
    return positions
  }

  peacefulPositions(deltas) {
    let positions = [],
        that = this
    this.getPositions(deltas).forEach(pos => {
      if (!that.attack(pos)) {
        positions.push(pos)
      }
    })
    return positions
  }

  isAtStart() {
    if ( this.color === "black" && this.pos[0] === 1 ) return true;
    else if ( this.color === "white" && this.pos[0] === 6 ) return true;
    else return false;
  }

  orientMoves(moves) {
    if (this.color === "white") {
      return moves.map(move => {
        let x, y
        [x, y] = move
        return [-x, y]
      })
    } else {
      return moves
    }
  }
}

export { King, Pawn, Bishop, Knight, Queen, Rook, Piece, SlidingPiece, SteppingPiece }
