class Player
{
    static get COLOUR_WHITE() {return 0}
    static get COLOUR_BLACK() {return 1}


    constructor(name, colour)
    {
        this.name = name
        this.colour = colour
    }

    createInitialPieces(board)
    {
        var pieces = new Array()
        if (this.colour == Player.COLOUR_WHITE)
        {
            for (var i=0; i<board.squaresBoard.length; i++)
            {
                new Pawn(board, this, i, 1)
            }
        }
        else if (this.colour == Player.COLOUR_BLACK)
        {
            for (var i=0; i<board.squaresBoard.length; i++)
            {
                new Pawn(board, this, i, 6)
            }
        }
        else
        {
            throw new Error("Unknown colour " + this.colour)
        }
    }
}