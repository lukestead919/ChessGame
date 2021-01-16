class BoardSquare
{
    constructor(whiteSquare)
    {
        this.piece = null
        this.validMove = 0
        this.whiteSquare = whiteSquare
    }

    deselect()
    {
        this.validMove = 0
    }
}