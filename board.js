class Board
{
    static get BOARD_SIZE_DEFAULT() {return 8}

    constructor(playerWhite, playerBlack)
    {
        this.size = Board.BOARD_SIZE_DEFAULT
        this.initialiseBoard(playerWhite, playerBlack)
    }

    initialiseBoard(playerWhite, playerBlack)
    {
        var whitePieces = playerWhite.createInitialPieces(this)
        var blackPieces = playerBlack.createInitialPieces(this)

        this.pieces = whitePieces.concat(blackPieces)
    }

    getPieceAtPosition(position)
    {
        for (var i=0; i<this.pieces.length; i++)
        {
            var piece = this.pieces[i]
            if (piece.position.toString() == position.toString())
            {
                return this.pieces[i]
            }
        }
        return null
    }

    
}