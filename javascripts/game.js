var BIRD_X = 50;
var BIRD_Y = 50;

function Game(canvas) {
  this.ctx = canvas.getContext("2d");
  this.restart();
  this.ctx.canvas.addEventListener("mousedown", function() {
    if(this.running){
      this.bird.flap()
    } else {
      this.running = true;
    }
  }.bind(this));

  setInterval(function (){
    if(this.running){
      this.tick();
    }
  }.bind(this), 1000/60);

}

Game.prototype = {
  restart: function(){
    this.running = false;
    this.gameOver = false;
    this.bird = new Bird(BIRD_X, BIRD_Y);
    this.level = new Level();
    this.tick();
  },
  tick: function() {
    if  (this.gameOver) {
			this.ctx.fillStyle = "yellow";
      this.ctx.font="50px Verdana";
  		this.ctx.fillText("GAME OVER!",100,200);
			this.ctx.font="25px Verdana";
  		this.ctx.fillText("Press start to play again!",100,300);
      this.running = false;
  		return;
    } else {
      this.level.tick(this.ctx);
      this.bird.tick(this.ctx);
      this.checkCollision();
    }
  },
  checkCollision: function() {
    //console.log(this.level.collidesWith(this.bird.getBounds()));
    if (this.level.collidesWith(this.bird.getBounds())) {
      this.gameOver = true;
    }
  },
}
