class Piece
{
    constructor(board, player, x, y)
    {
        this.player = player

        board.addPiece(this, x, y)

        if (this.constructor == Piece)
        {
            throw new Error("Abstract piece class can not be instantiated")
        }
    }

    getValidMoves(board)
    {
        var position = this.getPosition(board)
        return this.getValidMovesForLocation(board, position[0], position[1])
    }

    getValidMovesForLocation(board, x, y)
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

    get colour()
    {
        return this.player.colour
    }

    getPosition(board)
    {
        return board.getPiecePosition(this)
    }
    getSquare(board)
    {
        const position = board.getPiecePosition(this)
        return board.getSquareAtPosition(position[0], position[1])
    }

    getValidMovesOrthogonal(board)
    {

    }
}

class Pawn extends Piece
{
    getValidMovesForLocation(board, x, y)
    {
        var retval = new Array()
        if (this.colour == Player.COLOUR_WHITE)
        {
            var square = board.getSquareIfUnoccupied(x, y+1)
            if (square != null)
            {
                retval.push(square)
                if (y == 1) // If i create an audit of every move, then I could instead check to see if the piece has moved
                {
                    var square = board.getSquareIfUnoccupied(x, y+2)
                    retval.push(square)
                }
            }

            retval.push(board.getSquareIfOccupiedByAnotherPlayersPiece(this.player, x-1, y+1))
            retval.push(board.getSquareIfOccupiedByAnotherPlayersPiece(this.player, x+1, y+1))

        }
        else if (this.colour == Player.COLOUR_BLACK)
        {
            var square = board.getSquareIfUnoccupied(x, y-1)
            if (square != null)
            {
                retval.push(square)
                if (y == 6) // If i create an audit of every move, then I could instead check to see if the piece has moved
                {
                    var square = board.getSquareIfUnoccupied(x, y-2)
                    retval.push(square)
                }
            }

            retval.push(board.getSquareIfOccupiedByAnotherPlayersPiece(this.player, x-1, y-1))
            retval.push(board.getSquareIfOccupiedByAnotherPlayersPiece(this.player, x+1, y-1))

        }

        return retval
    }

    getName()
    {
        return "Pawn"
    }
}