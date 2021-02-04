var display = new Display();

var playerWhite = new Player("Luke", Player.COLOUR_WHITE)
var playerBlack = new Player("Andreea", Player.COLOUR_BLACK)

var game = new Game(playerWhite, playerBlack);

display.buildDisplay(game.board)
refreshDisplay()


var nightMode = false
function toggleNightMode() {
    var A = document.documentElement
    if (nightMode == false) {
        nightMode = true
        A.setAttribute('class', 'inversed')
    }
    else {
        nightMode = false
        A.setAttribute('class', '')
    }
}

function refreshDisplay() {
    display.refreshForGame(game)
}


//controller functions (should probably move to new class)
function squareClicked(x, y) {
    if (this.game.board.getPawnReadyToUpgrade() != null) //make this a more generic method
    {
        return;
    }
    game.squareClicked(x, y)
    refreshDisplay()
}

function startNewGameSamePlayers() {
    game = new Game(playerWhite, playerBlack);

    display.buildDisplay(game.board)
    refreshDisplay()
}

function upgradePawnTo(pieceName) {
    game.upgradePawnTo(pieceName)
}