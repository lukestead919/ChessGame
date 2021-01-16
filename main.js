var display = new Display();
var controller = new Controller();

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

function squareClicked(x, y)
{
    game.squareClicked(x, y)
    refreshDisplay()
}

function refreshDisplay()
{
    display.refreshForBoard(game.board)
}