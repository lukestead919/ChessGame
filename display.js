class Display {
    constructor() {

    }

    refreshForGame(game) {
        this.refreshForWinner(game.winner)
        this.refreshForCurrentPlayer(game.currentPlayer)
        this.refreshForBoard(game.board)
        this.refreshForMoveHistory(game.moveHistory)
    }

    buildDisplay(board) {
        //rebuild the table, don't copy the cells
        var boardDisplay = document.getElementById("Board")
        var newBoardDisplay = boardDisplay.cloneNode(false);
        boardDisplay.parentNode.replaceChild(newBoardDisplay, boardDisplay);

        this.buildEmptyBoard(board, newBoardDisplay)
    }

    buildEmptyBoard(board, boardDisplay) {
        for (var y = board.squaresBoard.length - 1; y >= 0; y--) {
            var tr = document.createElement("tr")
            boardDisplay.appendChild(tr)
            for (var x = 0; x < board.squaresBoard.length; x++) {
                var td = this.createSquare(x, y)
                tr.appendChild(td)
            }
        }
    }

    createSquare(x, y) {
        var td = document.createElement("td")
        var id = this.getIdForPosition(x, y)
        td.id = id
        td.setAttribute("onClick", "squareClicked(" + id + ")")
        return td
    }

    refreshForBoard(board) {
        var squares = board.squaresBoard
        for (var x = 0; x < squares.length; x++) {
            var row = squares[x]

            for (var y = 0; y < squares.length; y++) {
                var square = row[y]
                var td = this.getCellForPosition(x, y)
                td.removeAttribute("img")
                td.removeAttribute("class")
                td.innerHTML = ""

                if (square.whiteSquare) {
                    td.className = "WhiteSquare"
                }
                else {
                    td.className = "BlackSquare"
                }

                if (board.selectedPiece == square.piece
                    && square.piece != null) {
                    td.classList.add("Selected")
                }

                if (square.validMove) {
                    td.classList.add("ValidMove")
                }

                if (square.inCheck) {
                    td.classList.add("InCheck")
                }

                var piece = square.piece
                if (piece != null) {
                    const iconName = `${piece.player.colourName}${piece.getName()}`
                    const iconPath = `Sprites/${iconName}.png`

                    var img = new Image()
                    img.src = iconPath
                    img.alt = iconName
                    td.appendChild(img)
                }
            }
        }
    }

    refreshForMoveHistory(moveHistory) {
        const moveHistoryTableOld = document.getElementById("MoveHistory")
        var moveHistoryTable = moveHistoryTableOld.cloneNode(false);
        moveHistoryTableOld.parentNode.replaceChild(moveHistoryTable, moveHistoryTableOld);
        //This should be in order of the moves
        var moveNumber = 0
        var tr

        if (moveHistory == null) {
            return
        }

        moveHistory.forEach(move => {
            if (move.piece.player.colour == Player.COLOUR_WHITE) {
                moveNumber += 1
                tr = document.createElement("tr")
                moveHistoryTable.appendChild(tr)
                const moveNumberCell = document.createElement("td");
                moveNumberCell.innerHTML = moveNumber
                tr.appendChild(moveNumberCell)
            }

            const moveCell = document.createElement("td");
            moveCell.innerHTML = move.piece.getName() + " " + move.positionFrom + " to " + move.positionTo
            tr.appendChild(moveCell)
        });
    }

    refreshForCurrentPlayer(player) {
        if (player != null) {
            document.getElementById("CurrentGameStateMessage").innerHTML = `${player.name}'s turn`
        }
    }

    refreshForWinner(winner) {
        if (winner == null) {
            document.getElementById("RematchButton").style.display = "none"
        }
        else {
            document.getElementById("CurrentGameStateMessage").innerHTML = `${winner.name} has won`
            document.getElementById("RematchButton").style.display = "inline-block"
        }
    }

    getIdForPosition(x, y) {
        return x + "," + y
    }

    getCellForPosition(x, y) {
        return document.getElementById(this.getIdForPosition(x, y))
    }
}