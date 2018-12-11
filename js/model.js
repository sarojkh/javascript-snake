
//Coordinate Model
function Coordinate(x, y) {
  this.x = x;
  this.y = y;
}

// Snake Model
function Snake() {
  this.body = [];
    this.direction = "LEFT"; // default

    this.setBody = function(bodyArr) {
      this.body = bodyArr;
    };
    this.getBody = function() {
      return this.body;
    };
    this.collapseTail = function() {
      this.body.pop();
    };
    this.protrudeHead = function(coordinate) {
      this.body.unshift(coordinate);
    };
    this.setDirection = function(direction) {
      if (!this.areOppositeDirections(this.getDirection(), direction)) {
        this.direction = direction;
      }
    };
    this.getDirection = function() {
      return this.direction;
    };
    this.advance = function() {
      this.collapseTail();
      var newHeadCoordinate = this.getNewHeadCoordinate();
      this.protrudeHead(newHeadCoordinate);
    };
    this.getNewHeadCoordinate = function() {
      var currentHeadCoordinate = this.body[0];
      var newHeadCoordinate = new Coordinate(-1, -1);
      switch (this.getDirection()) {
        case "UP":
        newHeadCoordinate = new Coordinate(currentHeadCoordinate.x,
          currentHeadCoordinate.y - 1);
        break;
        case "DOWN":
        newHeadCoordinate = new Coordinate(currentHeadCoordinate.x,
          currentHeadCoordinate.y + 1);
        break;
        case "LEFT":
        newHeadCoordinate = new Coordinate(currentHeadCoordinate.x - 1,
          currentHeadCoordinate.y);
        break;
        case "RIGHT":
        newHeadCoordinate = new Coordinate(currentHeadCoordinate.x + 1,
          currentHeadCoordinate.y);
        break;
      }
      return newHeadCoordinate;
    };
    this.areOppositeDirections = function(directionA, directionB) {
      return (directionA == "LEFT" && directionB == "RIGHT")
      || (directionA == "DOWN" && directionB == "UP")
      || (directionA == "UP" && directionB == "DOWN")
      || (directionA == "RIGHT" && directionB == "LEFT");
    };
    this.metCoordinate = function(coordinate) {
      return coordinate.equals(this.body[0]);

    };
}

/*
 * Garden Model 
 * The grid layout is similar to the standard coordinate graphing.
 * The origin is in the right-most top corner. The x coordinate 
 * increases towards the right direction. The y coordinate increases
 * towards the down direction.
 */
 function Garden() {
  this.grid    = [];
  this.setGrid = function(x, y) {
    this.grid = new Array(x);
    for ( var i = 0; i < x; i++) {
      this.grid[i] = new Array(y);
      for ( var j = 0; j < y; j++) {
        this.grid[i][j] = new Coordinate(i, j);
      }
    }
  };
  this.getGrid = function() {
    return this.grid;
  };
    // returns an array with length of x and y, in index 0 and 1, respectively
    this.getGridDimension = function() {
      var gridLengthX = this.grid.length;
      var gridLengthY = this.grid[0].length;
      var dimensionArray = new Array(gridLengthX, gridLengthY);
      return dimensionArray;
    };
}

// Blinker Model
function Blinker() {
  this.location;
  this.setLocation = function(coordinate) {
    this.location = new Coordinate(coordinate.x, coordinate.y);
  };
  this.getLocation = function() {
    return this.location;
  };
}

// Game Model
function Game() {
  this.snake;
  this.garden;
  this.blinker;
  this.speed;
  this.gameTimer;

  this.setGarden = function() {
    this.garden = new Garden();
    this.garden.setGrid(50, 50);
  };
  this.setSnake = function() {
    this.snake = new Snake();
    this.snake.setBody(this.getStartingSnakeBody());
    this.snake.setDirection("LEFT");
  };
  this.randomizeBlinker = function() {
    this.blinker = new Blinker();
    this.blinker.setLocation(this.getRandomCoordinate());
  };
  this.getStartingSnakeBody = function() {
    snakeLength = 3;
    var snakeBody = new Array(snakeLength);
    var gridDimensionArr = this.garden.getGridDimension();
    var gridLengthX = gridDimensionArr[0];
    var gridLengthY = gridDimensionArr[1];
    var midPointX = Math.floor(gridLengthX / 2);
    var midPointY = Math.floor(gridLengthY / 2);
    var snakeMouth = new Coordinate(midPointX, midPointY);
    for ( var i = 0; i < snakeBody.length; i++) {
      if (i == 0)
        snakeBody[i] = snakeMouth;
      else {
        snakeBody[i] = new Coordinate(snakeBody[0].x + i,
          snakeBody[0].y);
      }
    }
    return snakeBody;
  };

  this.getRandomCoordinate = function() {
    var gridDimensionArr = this.garden.getGridDimension();
    var gridLengthX = gridDimensionArr[0];
    var gridLengthY = gridDimensionArr[1];
    do {
      var randomNumberX = Math.floor(Math.random() * gridLengthX);
      var randomNumberY = Math.floor(Math.random() * gridLengthY);
      var randomCoordinate = new Coordinate(randomNumberX, randomNumberY);
    } while ($.inArray(randomCoordinate, this.snake.getBody()) != -1);
    return randomCoordinate;
  };
  this.snakeMetBlinker = function() {
    return (this.snake.metCoordinate(this.blinker.getLocation()));
  };
  this.setSpeed = function(speed) {
  // speed in milliseconds
  this.speed = speed;
};
this.getSpeed = function() {
  return this.speed;
};
this.snakeBitItself = function() {
  var bodyArr = this.snake.body;
  var head = this.snake.head;
  /*
   * Snake of length 4 or smaller can't bite itself.
   * Therefore, the index starts from 4(i.e. snake must
   * atleast be of length 5 before it can bite itself)
*/
for ( var i = 4; i < bodyArr.length; i++) {
  if (this.snake.metCoordinate(bodyArr[i])) {
    return true;
  }
}
return false;
};
this.snakeHitWall = function() {
  var gridDimension = this.garden.getGridDimension();
  var maxX = gridDimension[0];
  var maxY = gridDimension[1];
  var snakeHead = this.snake.body[0];
  return (snakeHead.x < 0 || snakeHead.x > maxX || snakeHead.y < 0 || snakeHead.y > maxY);
};
this.advance = function() {
  this.snake.advance();
  if (this.snakeMetBlinker()) {
    this.snake.protrudeHead(this.blinker.getLocation());
    this.randomizeBlinker();
  }
  if (this.snakeBitItself() || this.snakeHitWall()) {
    endGame();
  }
};
this.setUp = function() {
  this.setGarden();
  this.setSnake();
  this.randomizeBlinker();
  this.setSpeed(100);
};

}
