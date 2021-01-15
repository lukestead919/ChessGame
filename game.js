class Game 
{
    constructor(playerWhite, playerBlack)
    {
        this.playerWhite = playerWhite
        this.playerBlack = playerBlack
        this.currentPlayer = playerWhite
        this.board = new Board(playerWhite, playerBlack)
    }

}