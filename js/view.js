
function renderGameView() {
    renderSnakeView();
    renderBlinkerView();
}

function setupGardenView() {
    $('#gameField').empty();
    $('#gameField')
  .append(
      '<table id=\'gameFieldTable\' cellspacing=0 cellpadding=0></table>');
    var gardenGridDimension = game.garden.getGridDimension();
    var x = gardenGridDimension[0];
    var y = gardenGridDimension[1];
    for ( var i = 0; i < y; i++) {
  $('#gameFieldTable').append('<tr id=row_' + i + '>');
  for ( var j = 0; j < x; j++) {
      $('#row_' + i).append(
    '<td id=cell_'
        + j
        + '_'
        + i
        + '><div class=\'field_block white_field\' id=\'white_field\'></div></td>');
  }
    }
    $('#gameField').append('</table>');
}


function renderSnakeView() {
    $(".snake_body").removeClass("snake_body").addClass("white_field");
    var snakeBody = game.snake.getBody();
    for ( var i = 0; i < snakeBody.length; i++) {
  $('#cell_' + snakeBody[i].x + '_' + snakeBody[i].y).html(
      '<div class=\'field_block snake_body\' id=\'snake_body\'></div>');
    }
}

function renderBlinkerView() {
    $(".snake_prey").removeClass("snake_prey").addClass("white_field");
    var blinker = game.blinker;
    $('#cell_' + blinker.location.x + '_' + blinker.location.y).html(
  '<div class=\'field_block snake_prey\' id=\'snake_prey\'></div>');
}
