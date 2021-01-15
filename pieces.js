class Piece
{
    static POSITION_DESTROYED = [-1, -1]
    
    constructor(position, player)
    {
        this.position = position
        this.player = player

        if (this.constructor == Piece)
        {
            throw new Error("Abstract piece class can not be instantiated")
        }
    }

    getValidMoves(board)
    {
        throw new Error("getValidMoves is not implemented for " + this.constructor.name)
    }

    getName()
    {
        throw new Error("getName is not implemented for " + this.constructor.name)
    }

    getImage()
    {
        throw new Error("getImage is not implemented for " + this.constructor.name)
    }

    getColour()
    {
        return this.player.Colour
    }

    getValidMovesOrthogonal(board)
    {
        
    }
}

class Pawn extends Piece
{
    getValidMoves(board)
    {
        if (this.getColour == Player.COLOUR_WHITE)
        {

        }
    }

    getName()
    {
        return "Pawn"
    }
}