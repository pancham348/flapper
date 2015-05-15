var PIPE_DIST_X = 220;
var PIPE_WIDTH = 50;
var GAP_HEIGHT = 120;
var GAME_SPEED = 5;

function defaultPipes(){
  return [ {
    x: 330,
    y: 50
  }, {
    x: 550,
    y: 30
  }, {
    x: 770,
    y: 60
  }];
}
function Level() {
  this.pipes = defaultPipes();
  this.score = new Score();
  this.img = document.getElementById("bg-img");
	this.topPipe = new Image();
	this.bottomPipe = new Image();
	this.topPipe.src = "pipe_top.png";
	this.bottomPipe.src = "pipe_bottom.png";
}

Level.prototype = {
  drawBackground: function(ctx){
    //ctx.fillStyle = "skyblue";
    var pat = ctx.createPattern(this.img, 'repeat');
    ctx.fillStyle = pat;
    ctx.rect(0, 0, 640, 480);

    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },
  movePipes: function(){
    var that = this;
    this.pipes.forEach(function(pipe){
      pipe.x -= GAME_SPEED;
      if (pipe.x <= (-1 * PIPE_WIDTH) ) {
        that.pipes.splice(that.pipes.indexOf(pipe), 1);
        that.pipes.push({x: that.pipes[1].x + PIPE_DIST_X,
          y: Math.floor(Math.random() * 150 + 30) });
          that.score.score += 1;
          //console.log(that.score);
          // var score = document.getElementById("score");
          // score.innerHTML = "Score: " + that.score;
      }
    })
  },
  drawPipes: function(ctx) {
		var that = this;
    this.pipes.forEach(function(pipe) {
      ctx.fillStyle = "green";
      ctx.drawImage(that.topPipe, pipe.x, 0, PIPE_WIDTH, pipe.y);
      ctx.drawImage(that.bottomPipe, pipe.x, pipe.y + GAP_HEIGHT, PIPE_WIDTH, ctx.canvas.height);
			// ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.y);
// 			ctx.fillRect(pipe.x, pipe.y + GAP_HEIGHT, PIPE_WIDTH, ctx.canvas.height);
    });
  },

  tick: function(ctx) {
    this.drawBackground(ctx);
    this.movePipes();
    this.drawPipes(ctx);
    this.score.draw(ctx);
  },

  collidesWith: function(bounds) {
    var collision = false;
    this.pipes.forEach(function(pipe) {
      var topPipe = {topLeft: [pipe.x, 0], bottomRight: [pipe.x + PIPE_WIDTH, pipe.y]};
      var bottomPipe = {topLeft: [pipe.x, pipe.y + GAP_HEIGHT], bottomRight: [pipe.x + PIPE_WIDTH, 480]};

      if (!(bounds.bottomRight[0] < topPipe.topLeft[0] ||
        topPipe.bottomRight[0] < bounds.topLeft[0] ||
        bounds.bottomRight[1] < topPipe.topLeft[1] ||
        topPipe.bottomRight[1] < bounds.topLeft[1]) ||
        !(bounds.bottomRight[0] < bottomPipe.topLeft[0] ||
          bottomPipe.bottomRight[0] < bounds.topLeft[0] ||
          bounds.bottomRight[1] < bottomPipe.topLeft[1] ||
          bottomPipe.bottomRight[1] < bounds.topLeft[1])
        ) {


        collision = true;
        return;
      }
    });
    return collision;
  }
}
