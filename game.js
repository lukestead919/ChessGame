class Game
{
    constructor(playerWhite, playerBlack)
    {
        this.playerWhite = playerWhite
        this.playerBlack = playerBlack
        this.currentPlayer = playerWhite
        this.board = new Board(playerWhite, playerBlack)
    }

    squareClicked(x, y)
    {
        var moveMade = this.board.selectSquare(this.currentPlayer, x, y)
        if (moveMade)
        {
            this.finishTurn()
        }
    }

    finishTurn()
    {
        if (this.currentPlayer == playerBlack)
        {
            this.currentPlayer = playerWhite
        }
        else
        {
            this.currentPlayer = playerBlack
        }
    }
}