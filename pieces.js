class Piece {
    static get DIRECTION_N() { return 0 }
    static get DIRECTION_NE() { return 1 }
    static get DIRECTION_E() { return 2 }
    static get DIRECTION_SE() { return 3 }
    static get DIRECTION_S() { return 4 }
    static get DIRECTION_SW() { return 5 }
    static get DIRECTION_W() { return 6 }
    static get DIRECTION_NW() { return 7 }

    constructor(board, player, x, y) {
        this.player = player

        board.addPiece(this, x, y)

        if (this.constructor == Piece) {
            throw new Error("Abstract piece class can not be instantiated")
        }
    }

    getSquaresICanMoveTo(board) {
        var position = this.getPosition(board)
        return this.getValidMovesForLocation(board, position[0], position[1])
    }

    getValidMoves(board) {

        //for debugging
        if (this.colour == Player.COLOUR_WHITE)
            return board.getAllSquares()

        //save the current positions
        var originalBoardState = board.getCurrentBoardState()

        var potentialMoves = this.getSquaresICanMoveTo(board)
        var validMoves = new Array()
        potentialMoves.forEach(move => {
            board.setFromBoardState(originalBoardState)
            if (move != null) {
                // var boardCopy = board.createDeepCopyExperimental()

                // //this feels like it could break at any moment, but not sure on what else I can do
                // // I only want to copy the current state of the board, alternatively, I can just use the board, but I don't want to accidentally change the state of the board.
                // //I've created a deep copy, so need to get the corresponding piece and move for the copied board
                // const movePos = move.getPosition(board)
                // const moveCopy = Object.assign(boardCopy.getSquareAtPosition(movePos[0], movePos[1]), move)

                // const piecePos = this.getPosition(board)
                // const pieceCopy = Object.assign(boardCopy.getSquareAtPosition(piecePos[0], piecePos[1]).piece, this)

                // boardCopy.movePiece(pieceCopy, moveCopy)
                // if (!boardCopy.getIsPlayersKingInCheck(pieceCopy.player))
                // {
                //     validMoves.push(move)
                // }
                board.movePiece(this, move)
                if (!board.getIsPlayersKingInCheck(this.player)) {
                    validMoves.push(move)
                }

                //and move it back
                board.setFromBoardState(originalBoardState)
            }
        });

        return validMoves
    }

    getValidMovesForLocation(board, x, y) {
        throw new Error("getValidMoves is not implemented for " + this.constructor.name)
    }

    getName() {
        throw new Error("getName is not implemented for " + this.constructor.name)
    }

    get colour() {
        return this.player.colour
    }

    getPosition(board) {
        return board.getPiecePosition(this)
    }
    getSquare(board) {
        const position = board.getPiecePosition(this)
        return board.getSquareAtPosition(position[0], position[1])
    }

    getValidMovesOrthogonal(board, x, y) {
        var validMoves = new Array()
        this.getValidMovesInDirection(validMoves, Piece.DIRECTION_N, board, x, y)
        this.getValidMovesInDirection(validMoves, Piece.DIRECTION_E, board, x, y)
        this.getValidMovesInDirection(validMoves, Piece.DIRECTION_S, board, x, y)
        this.getValidMovesInDirection(validMoves, Piece.DIRECTION_W, board, x, y)
        return validMoves
    }
    getValidMovesDiagonal(board, x, y) {
        var validMoves = new Array()
        this.getValidMovesInDirection(validMoves, Piece.DIRECTION_NE, board, x, y)
        this.getValidMovesInDirection(validMoves, Piece.DIRECTION_SE, board, x, y)
        this.getValidMovesInDirection(validMoves, Piece.DIRECTION_SW, board, x, y)
        this.getValidMovesInDirection(validMoves, Piece.DIRECTION_NW, board, x, y)
        return validMoves
    }

    getValidMovesInDirection(validMoves, direction, board, x, y) {
        var distance = 0
        while (true) {
            distance += 1
            var square = this.getSquareAtPositionInDirection(board, x, y, direction, distance)
            if (square == null) {
                return
            }

            const piece = square.piece
            if (piece == null) {
                validMoves.push(square)
            }
            else {
                if ((piece.player != this.player)) {
                    validMoves.push(square)
                }
                return
            }
        }
    }

    getSquareAtPositionInDirection(board, x, y, direction, distance) {
        if (direction == Piece.DIRECTION_N) {
            y += distance
        }
        else if (direction == Piece.DIRECTION_NE) {
            x += distance
            y += distance
        }
        else if (direction == Piece.DIRECTION_E) {
            x += distance
        }
        else if (direction == Piece.DIRECTION_SE) {
            x += distance
            y -= distance
        }
        else if (direction == Piece.DIRECTION_S) {
            y -= distance
        }
        else if (direction == Piece.DIRECTION_SW) {
            x -= distance
            y -= distance
        }
        else if (direction == Piece.DIRECTION_W) {
            x -= distance
        }
        else if (direction == Piece.DIRECTION_NW) {
            x -= distance
            y += distance
        }

        return board.getSquareAtPosition(x, y)
    }
}

class Pawn extends Piece {
    getValidMovesForLocation(board, x, y) {
        var retval = new Array()
        if (this.colour == Player.COLOUR_WHITE) {
            var square = board.getSquareIfUnoccupied(x, y + 1)
            if (square != null) {
                retval.push(square)
                if (y == 1) // If i create an audit of every move, then I could instead check to see if the piece has moved
                {
                    var square = board.getSquareIfUnoccupied(x, y + 2)
                    retval.push(square)
                }
            }

            retval.push(board.getSquareIfEnemyPiece(this.player, x - 1, y + 1))
            retval.push(board.getSquareIfEnemyPiece(this.player, x + 1, y + 1))

        }
        else if (this.colour == Player.COLOUR_BLACK) {
            var square = board.getSquareIfUnoccupied(x, y - 1)
            if (square != null) {
                retval.push(square)
                if (y == 6) // If i create an audit of every move, then I could instead check to see if the piece has moved
                {
                    var square = board.getSquareIfUnoccupied(x, y - 2)
                    retval.push(square)
                }
            }

            retval.push(board.getSquareIfEnemyPiece(this.player, x - 1, y - 1))
            retval.push(board.getSquareIfEnemyPiece(this.player, x + 1, y - 1))

        }

        return retval
    }

    getName() {
        return "Pawn"
    }
}

class Rook extends Piece {
    getValidMovesForLocation(board, x, y) {
        return this.getValidMovesOrthogonal(board, x, y)
    }

    getName() {
        return "Rook"
    }
}

class Bishop extends Piece {
    getValidMovesForLocation(board, x, y) {
        return this.getValidMovesDiagonal(board, x, y)
    }

    getName() {
        return "Bishop"
    }
}

class Knight extends Piece {
    getValidMovesForLocation(board, x, y) {
        var validMoves = new Array()
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x + 2, y + 1))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x + 2, y - 1))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x - 2, y + 1))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x - 2, y - 1))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x + 1, y + 2))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x - 1, y + 2))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x + 1, y - 2))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x - 1, y - 2))
        return validMoves
    }

    getName() {
        return "Knight"
    }
}

class Queen extends Piece {
    getValidMovesForLocation(board, x, y) {
        var validMoves = this.getValidMovesDiagonal(board, x, y)
        validMoves = validMoves.concat(this.getValidMovesOrthogonal(board, x, y))
        return validMoves
    }

    getName() {
        return "Queen"
    }
}

class King extends Piece {
    getValidMovesForLocation(board, x, y) {
        var validMoves = new Array()
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x + 1, y))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x + 1, y + 1))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x + 1, y - 1))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x, y + 1))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x, y - 1))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x - 1, y))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x - 1, y + 1))
        validMoves.push(board.getSquareIfUnoccupiedOrEnemyPiece(this.player, x - 1, y - 1))
        return validMoves
    }

    getName() {
        return "King"
    }
}