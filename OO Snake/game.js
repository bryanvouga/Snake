function Game(ctx, rows = 20, columns = 20) {
  this.rows = rows
  this.columns = columns
  this.tickRate = 1000/15
  this.snake = new Snake()
  this.apple = new Apple()
  this.ctx = ctx

  this.update = function() {
    this.snake.move()

    if (this.snake.didEat(this.apple)) {
      this.snake.length += 3
      this.apple.respawn(this.rows, this.columns)
    }
  }

  this.isGameOver = function() {
    return this.snake.outOfBounds(this.rows, this.columns) || this.snake.ateTail()
  }

  this.keyDown = function(evt) {
    const keyToDirection = {
      ArrowDown : [0, 1],
      ArrowUp   : [0,-1],
      ArrowLeft : [-1,0],
      ArrowRight: [ 1,0],
    }
    if(direction = keyToDirection[evt.code]) {
      this.snake.setDirection(direction)
    }
  }

  this.draw = function() {
    this.ctx.fillStyle = "white"
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.strokeRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.apple.draw(this.ctx, this.ctx.canvas.width/this.columns)
    this.snake.draw(this.ctx, this.ctx.canvas.width/this.columns)
  }

  this.run = function() {
    this.update()
    this.draw()
    if(!this.isGameOver()) {
      setTimeout(() => requestAnimationFrame(() => this.run()), this.tickRate);
    } else {
      this.snake.color = "grey"
      this.draw()
      setTimeout(() => this.gameOverAnimation(), 600)
    }
  }

  this.gameOverAnimation = function() {
    this.snake.shrink()
    this.draw()
    if(this.snake.body.length !== 0) {
      setTimeout(() => requestAnimationFrame(() => this.gameOverAnimation()), this.tickRate)
    }
  }
}
