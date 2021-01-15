function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
loadScript("board.js")
loadScript("controller.js")
loadScript("display.js")
loadScript("game.js")
loadScript("pieces.js")
loadScript("player.js")
loadScript("main.js")