class Display 
{
    constructor()
    {

    }

    buildDisplay(boardSize)
    {
        //rebuild the table, don't copy the cells
        var boardDisplay = document.getElementById("board")
        var newBoardDisplay = boardDisplay.cloneNode(false);
        boardDisplay.parentNode.replaceChild(newBoardDisplay, boardDisplay);

        this.buildEmptyBoard(boardSize, newBoardDisplay)
    }

    buildEmptyBoard(size, boardDisplay)
    {
        for (var y=size-1; y>=0; y--)
        {
            var tr = document.createElement("tr")
            boardDisplay.appendChild(tr)
            for (var x=0; x<size; x++)
            {
                var td = this.createSquare(x, y)
                tr.appendChild(td)
            }
        }
    }

    createSquare(x, y)
    {
        var td = document.createElement("td")
        var id = this.getIdForPosition(x, y)
        td.id = id
        td.setAttribute("onClick", "squareClicked(" + id +")")
        if ((x + y) % 2 == 0)
        {
            td.className = "WhiteSquare"
        }
        else
        {
            td.className = "BlackSquare"
        }
        return td
    }

    getIdForPosition(x, y)
    {
        return x + "," + y
    }

    refreshForBoard(board)
    {
        var size = board.size
        for (var x=0; x<size; x++)
        {
            for (var y=0; y<size; y++)
            {
                var square = this.getCellForPosition(x, y)
                square.removeAttribute("img")

                var piece = board.getPieceAtPosition([x, y])
                if (piece != null)
                {
                    //square.setAttribute("img", piece.getImage())
                    square.innerHTML = piece.getName()
                }
            }
        }
    }

    getCellForPosition(x, y)
    {
        return document.getElementById(this.getIdForPosition(x, y))
    }
}