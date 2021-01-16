class Display {
    constructor() {

    }

    buildDisplay(board) {
        //rebuild the table, don't copy the cells
        var boardDisplay = document.getElementById("board")
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
                    if (piece.player.colour == Player.COLOUR_WHITE) {
                        td.classList.add("WhitePiece")
                    }
                    else {
                        td.classList.add("BlackPiece")
                    }
                    //td.setAttribute("img", piece.getImage())
                    td.innerHTML = piece.getName() + piece.colour
                }
            }
        }
    }

    getIdForPosition(x, y) {
        return x + "," + y
    }

    getCellForPosition(x, y) {
        return document.getElementById(this.getIdForPosition(x, y))
    }
}