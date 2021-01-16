class Board {
    static get BOARD_SIZE_DEFAULT() { return 8 }

    constructor() {
    }

    initialise(playerWhite, playerBlack, size = Board.BOARD_SIZE_DEFAULT) {
        this.selectedPiece = null
        this.createBoardSquares(size)
        this.initialiseBoard(playerWhite, playerBlack)
    }

    initialiseBoard(playerWhite, playerBlack) {
        playerWhite.createInitialPieces(this)
        playerBlack.createInitialPieces(this)
    }

    getCurrentBoardState() {
        var map = new Map()
        for (var x = 0; x < this.squaresBoard.length; x++) {
            var row = this.squaresBoard[x]
            for (var y = 0; y < row.length; y++) {
                const piece = this.getPieceAtPosition(x, y)
                if (piece != null) {
                    map.set([x, y], piece)
                }
            }
        }
        return map
    }

    setFromBoardState(map) {
        this.getAllSquares().forEach(square => square.piece = null)
        for (const [position, piece] of map.entries()) {
            this.getSquareAtPosition(position[0], position[1]).piece = piece
        }
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
        if (row != null) {
            return row[y]
        }
    }

    getPieceAtPosition(x, y) {
        return this.getSquareAtPosition(x, y).piece
    }

    selectSquare(currentPlayer, x, y) {
        var clickedSquare = this.getSquareAtPosition(x, y)
        var clickedPiece = clickedSquare.piece
        if (this.selectedPiece == null) {
            if (clickedPiece == null) {
                return
            }

            if (clickedPiece.player != currentPlayer) {
                return
            }

            this.selectPiece(clickedPiece)
        }
        else {

            //clicking the currently selected square should deselect it
            if (clickedPiece == this.selectedPiece) {
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

            //if have a selected square, and clicked a valid move, then move
            if (clickedSquare.validMove) {
                this.movePiece(this.selectedPiece, clickedSquare)
                return true
            }

            //Otherwise, selected a non valid move
            this.deselectBoard()
        }
        return false
    }

    movePiece(piece, squareToMoveTo) {
        piece.getSquare(this).piece = null
        squareToMoveTo.piece = piece
    }

    // validMove(squareToMoveFrom, squareToMoveTo) {
    //     squareToMoveFrom.piece.getValidMoves(this).contains(squareToMoveTo)
    // }

    selectPiece(piece) {
        this.deselectBoard()
        this.selectedPiece = piece
        var validMoves = piece.getValidMoves(this)
        validMoves.forEach(square => {
            if (square != null) {
                square.validMove = 1
            }
        });
    }

    deselectBoard() {
        this.selectedPiece = null

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

    doesPlayerHaveAValidMove(player) {
        var playersPieces = this.getAllPiecesForPlayer(player)
        for (var i=0; i<playersPieces.length; i++) {
            var piece = playersPieces[i]
            if (piece.getValidMoves(this).length > 0)
            {
                return true
            }
        }

        return false
    }

    getPlayersKing(player) {
        return this.getAllPiecesForPlayer(player).filter(piece => piece instanceof King)[0]
    }

    getIsPlayersKingInCheck(player) {
        var king = this.getPlayersKing(player)
        var kingSquare = king.getSquare(this)
        return this.getAllSquaresCoveredByEnemyPlayers(player).includes(kingSquare)
    }

    getAllSquares() {
        var allSquares = new Array()
        this.squaresBoard.forEach(element => {
            allSquares = allSquares.concat(element)
        });
        return allSquares
    }

    getAllPieces() {
        var pieces = new Array()
        this.getAllSquares().forEach(square => {
            if (square.piece != null) {
                pieces.push(square.piece)
            }
        });
        return pieces
    }

    getAllPiecesForPlayer(player) {
        var pieces = new Array()
        this.getAllPieces().forEach(piece => {
            if (piece.player == player) {
                pieces.push(piece)
            }
        });
        return pieces
    }

    getAllPiecesForEnemyPlayers(player) {
        const playersPieces = this.getAllPiecesForPlayer(player)
        return this.getAllPieces().filter(piece => !playersPieces.includes(piece))
    }

    getAllSquaresCoveredByEnemyPlayers(player) {
        var squares = new Array()
        this.getAllPiecesForEnemyPlayers(player).forEach(piece => {
            squares = squares.concat(piece.getSquaresICanMoveTo(this)) //only add unique? or not worth it
        });
        return squares
    }

    setPlayersKingInCheck(player, inCheck) {
        this.getPlayersKing(player).inCheck = inCheck
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
            && this.getPieceAtPosition(x, y).player != currentPlayer) {
            return this.getSquareAtPosition(x, y)
        }
    }

    getSquareIfUnoccupiedOrEnemyPiece(currentPlayer, x, y) {
        var square = this.getSquareIfUnoccupied(x, y)
        if (square == null) {
            square = this.getSquareIfEnemyPiece(currentPlayer, x, y)
        }
        return square
    }
}