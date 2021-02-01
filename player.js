class Player {
    static get COLOUR_WHITE() { return 0 }
    static get COLOUR_BLACK() { return 1 }


    constructor(name, colour) {
        this.name = name
        this.colour = colour
    }

    createInitialPieces(board) {
        var pieces = new Array()
        if (this.colour == Player.COLOUR_WHITE) {
            for (var i = 0; i < board.squaresBoard.length; i++) {
                new Pawn(board, this, i, 1)
            }
            new Rook(board, this, 0, 0)
            new Rook(board, this, 7, 0)
            new Knight(board, this, 1, 0)
            new Knight(board, this, 6, 0)
            new Bishop(board, this, 2, 0)
            new Bishop(board, this, 5, 0)
            new Queen(board, this, 3, 0)
            new King(board, this, 4, 0)
        }
        else if (this.colour == Player.COLOUR_BLACK) {
            for (var i = 0; i < board.squaresBoard.length; i++) {
                new Pawn(board, this, i, 6)
            }

            new Rook(board, this, 0, 7)
            new Rook(board, this, 7, 7)
            new Knight(board, this, 1, 7)
            new Knight(board, this, 6, 7)
            new Bishop(board, this, 2, 7)
            new Bishop(board, this, 5, 7)
            new Queen(board, this, 3, 7)
            new King(board, this, 4, 7)
        }
        else {
            throw new Error("Unknown colour " + this.colour)
        }
    }

    get colourName() {
        switch (this.colour) {
            case Player.COLOUR_WHITE:
                return "White"
            case Player.COLOUR_BLACK:
                return "Black"
        }
    }
}