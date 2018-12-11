var game;
var viewRenderer;
var gameAdvancer;

function launchGame() {
    game = new Game();
    game.setUp();

    setupGardenView();
    renderGameView();
    viewRenderer = setInterval("renderGameView()", 50);
    gameAdvancer = setInterval("game.advance()", 100);
}

function endGame() {
    clearInterval(viewRenderer);
    clearInterval(gameAdvancer);
}

function actionListener(key) {
    // 37 LEFT
    // 38 UP
    // 39 RIGHT
    // 40 DOWN
    switch (key.which) {
    case 37:
  game.snake.setDirection("LEFT");
  break;
    case 38:
  game.snake.setDirection("UP");
  break;
    case 39:
  game.snake.setDirection("RIGHT");
  break;
    case 40:
  game.snake.setDirection("DOWN");
  break;
    }
}
