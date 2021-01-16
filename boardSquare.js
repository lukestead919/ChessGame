class BoardSquare
{
    constructor(whiteSquare)
    {
        this.piece = null
        this.validMove = false
        this.whiteSquare = whiteSquare
    }

    get inCheck()
    {
        if (this.piece != null)
        {
            return this.piece.inCheck
        }
        return false
    }

    getPosition(board)
    {
        return board.getSquarePosition(this)
    }

    deselect()
    {
        this.validMove = false
    }
}