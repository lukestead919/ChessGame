class Board {
    static get BOARD_SIZE_DEFAULT() { return 8 }

    constructor(playerWhite, playerBlack, size = Board.BOARD_SIZE_DEFAULT) {
        this.selectedSquare = null
        this.createBoardSquares(size)
        this.initialiseBoard(playerWhite, playerBlack)
    }

    initialiseBoard(playerWhite, playerBlack) {
        playerWhite.createInitialPieces(this)
        playerBlack.createInitialPieces(this)
    }

    createBoardSquares(size) {
        this.squaresBoard = [...Array(size)].map(e => Array(size));
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var whiteSquare = (x + y) % 2
                this.squaresBoard[x][y] = new BoardSquare(whiteSquare)
            }
        }
    }

    addPiece(piece, x, y) {
        this.getSquareAtPosition(x, y).piece = piece
    }

    getSquareAtPosition(x, y) {
        const row = this.squaresBoard[x]
        if (row != null)
        {
            return row[y]
        }
    }

    getPieceAtPosition(x, y) {
        return this.getSquareAtPosition(x, y).piece
    }

    selectSquare(currentPlayer, x, y) {
        var clickedSquare = this.getSquareAtPosition(x, y)
        var clickedPiece = clickedSquare.piece
        if (this.selectedSquare == null) {
            if (clickedPiece == null) {
                return
            }

            if (clickedPiece.player != currentPlayer) {
                return
            }

            this.selectedSquare = clickedSquare
            this.selectPiece(clickedPiece)
        }
        else {

            //clicking the currently selected square should deselect it
            if (clickedSquare == this.selectedSquare) {
                this.deselectBoard()
                return false
            }

            //clicking another of the current players pieces should select that piece
            if (clickedPiece != null) {
                if (clickedPiece.player == currentPlayer) {
                    this.selectPiece(clickedPiece)
                    return false
                }
            }

            //otherwise, check if 
            return this.movePiece(this.selectedSquare, clickedSquare)
        }
        return false
    }

    movePiece(squareToMove, squareToMoveTo) {
        if (squareToMoveTo.validMove) {
            squareToMoveTo.piece = squareToMove.piece
            squareToMove.piece = null
            this.deselectBoard()
            return true
        }
        else
        {
            this.deselectBoard()
            return false
        }
    }

    validMove(squareToMoveFrom, squareToMoveTo) {
        squareToMoveFrom.piece.getValidMoves(this).contains(squareToMoveTo)
    }

    selectPiece(piece) {
        this.deselectBoard()
        this.selectedSquare = piece.getSquare(this)
        var validMoves = piece.getValidMoves(this)
        validMoves.forEach(element => {
            if (element != null)
            {
                element.validMove = 1
            }
        });
    }

    deselectBoard() {
        this.selectedSquare = null

        for (var x = 0; x < this.squaresBoard.length; x++) {
            var row = this.squaresBoard[x]
            for (var y = 0; y < row.length; y++) {
                this.getSquareAtPosition(x, y).deselect()
            }
        }
    }

    getSquarePosition(square) {
        for (var x = 0; x < this.squaresBoard.length; x++) {
            var row = this.squaresBoard[x]
            for (var y = 0; y < row.length; y++) {
                if (this.getSquareAtPosition(x, y) == square) {
                    return [x, y]
                }
            }
        }
        return null
    }

    getPiecePosition(piece) {
        for (var x = 0; x < this.squaresBoard.length; x++) {
            var row = this.squaresBoard[x]
            for (var y = 0; y < row.length; y++) {
                if (this.getPieceAtPosition(x, y) == piece) {
                    return [x, y]
                }
            }
        }
        return null
    }




    getSquareIfUnoccupied(x, y) {
        if (this.getSquareAtPosition(x, y) != null
            && this.getPieceAtPosition(x, y) == null) {
            return this.getSquareAtPosition(x, y)
        }
    }

    getSquareIfEnemyPiece(currentPlayer, x, y) {
        if (this.getSquareAtPosition(x, y) != null
            && this.getPieceAtPosition(x, y) != null
            && this.getPieceAtPosition(x,y).player != currentPlayer) {
            return this.getSquareAtPosition(x, y)
        }
    }

    getSquareIfUnoccupiedOrEnemyPiece(currentPlayer, x, y) {
        var square = this.getSquareIfUnoccupied(x, y)
        if (square == null)
        {
            square = this.getSquareIfEnemyPiece(currentPlayer, x, y)
        }
        return square
    }
}