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
        this.board.deselectBoard()
        if (this.board.getPawnReadyToUpgrade() != null) {
            //wait for the upgrade
            return
        }
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

    upgradePawnTo(pieceName) {
        const pawn = this.board.getPawnReadyToUpgrade()
        const position = pawn.getPosition(this.board)
        const player = pawn.player
        const x = position[0]
        const y = position[1]
        switch (pieceName) {
            case "Queen":
                new Queen(game.board, player, x, y)
                break
            case "Rook":
                new Rook(game.board, player, x, y)
                break
            case "Knight":
                new Knight(game.board, player, x, y)
                break
            case "Bishop":
                new Bishop(game.board, player, x, y)
                break
        }
        this.finishTurn()
    }
}