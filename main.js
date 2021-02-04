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
function startGame() {
    const form = document.forms["GameSetup"]
    const whiteName = document.getElementById("WhiteName").value
    const BlackName = document.getElementById("BlackName").value

    var playerWhite = new Player(whiteName, Player.COLOUR_WHITE)
    var playerBlack = new Player(BlackName, Player.COLOUR_BLACK)

    game = new Game(playerWhite, playerBlack);

    display = new Display();
    display.buildDisplay(game.board)
    refreshDisplay()

    form.style.display = "none"
    document.getElementById("MainDisplay").style.display = "block"
}

function squareClicked(x, y) {
    if (this.game.board.getPawnReadyToUpgrade() != null) //make this a more generic method
    {
        return;
    }
    game.squareClicked(x, y)
    refreshDisplay()
}

function startNewGameSamePlayers() {
    game = new Game(game.playerWhite, game.playerBlack);

    display.buildDisplay(game.board)
    refreshDisplay()
}

function upgradePawnTo(pieceName) {
    game.upgradePawnTo(pieceName)
}