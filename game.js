class Game {
    constructor(playerWhite, playerBlack) {
        this.playerWhite = playerWhite
        this.playerBlack = playerBlack
        this.currentPlayer = playerWhite
        this.board = new Board()
        this.board.initialise(playerWhite, playerBlack)
    }

    squareClicked(x, y) {
        var moveMade = this.board.selectSquare(this.currentPlayer, x, y)
        if (moveMade) {
            this.addMoveToHistory(moveMade)
            this.finishTurn()
        }
    }

    addMoveToHistory(move) {
        if (this.moveHistory == null) {
            this.moveHistory = new Array()
        }
        this.moveHistory.push(move)
    }

    finishTurn() {
        //if pawn moved to end, offer option to change to queen/etc...
        
        this.board.deselectBoard()
        this.board.setPlayersKingInCheck(this.currentPlayer, false)
        this.startNewTurn()
    }

    startNewTurn() {
        this.changePlayer()

        const kingInCheck = this.getIsCurrentPlayersKingInCheck()
        const noValidMoves = this.doesCurrentPlayerHaveNoValidMoves()

        this.board.setPlayersKingInCheck(this.currentPlayer, kingInCheck)

        if (noValidMoves) {
            //game over
            if (kingInCheck) {
                this.winner = this.getOpponent(this.currentPlayer)
            }
            this.endGame()
        }
    }

    endGame() {
        this.currentPlayer = null
    }

    changePlayer() {
        this.currentPlayer = this.getOpponent(this.currentPlayer)
    }

    getOpponent(player) {
        if (player == this.playerBlack) {
            return this.playerWhite
        }
        else {
            return this.playerBlack
        }
    }

    getIsCurrentPlayersKingInCheck() {
        return this.board.getIsPlayersKingInCheck(this.currentPlayer)
    }

    doesCurrentPlayerHaveNoValidMoves() {
        return !this.board.doesPlayerHaveAValidMove(this.currentPlayer)
    }

    get currentGameStateMessage() {
        if (this.winner != null) {
            return `${this.winner.name} has won!`
        }

        return `${this.currentPlayer.name}'s turn`
    }
}