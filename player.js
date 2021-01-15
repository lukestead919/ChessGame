class Player
{
    static get COLOUR_WHITE() {return 0}
    static get COLOUR_BLACK() {return 1}


    constructor(name, colour)
    {
        this.name = name
        this.colour = colour
    }

    getName()
    {
        return this.name
    }

    getColour()
    {
        return this.colour
    }

    createInitialPieces(board)
    {
        var pieces = new Array()
        if (this.colour == Player.COLOUR_WHITE)
        {
            for (var i=0; i<board.size; i++)
            {
                pieces.push(new Pawn([i, 1], this))
            }
        }
        else if (this.colour == Player.COLOUR_BLACK)
        {

        }
        else
        {
            throw new Error("Unknown colour " + this.colour)
        }

        return pieces
    }
}