function Snake() {
  this.length = 1
  this.body = [[0,3]]
  this.direction = [1,0]
  this.color = "green"

  this.didEat =  function(apple) {
    const snakeHead = this.body[0]
    return snakeHead[0] === apple.position[0] &&
           snakeHead[1] === apple.position[1]
  }

  this.setDirection = function(direction) {
    if (this.direction[0] + direction[0] !== 0 &&
        this.direction[1] + direction[1] !== 0) {
      this.direction = direction
    }
  }

  this.grow = function() {
    this.body.unshift(
      [this.body[0][0] + this.direction[0],
      this.body[0][1] + this.direction[1]])
  }

  this.shrink = function() {
    this.body.splice(-1, 1)
  }

  this.ateTail = function() {
    for (let i = 1; i < this.body.length; i++) {
      if(this.body[0][0] === this.body[i][0] && this.body[0][1] === this.body[i][1]){
        return true
      }
    }
    return false
  }

  this.outOfBounds = function(rows, cols) {
    return this.body[0][0] > rows-1 ||
           this.body[0][1] > cols-1 ||
           this.body[0][0] < 0      ||
           this.body[0][1] < 0
  }

  this.draw = function(ctx, cellLength) {
    for (let i = 0; i < this.body.length; i++) {
      ctx.fillStyle = this.color
      ctx.fillRect(
        this.body[i][0]*cellLength,
        this.body[i][1]*cellLength,
        cellLength,
        cellLength)
    }
  }

  this.move = function() {
    this.grow()
    if (this.body.length > this.length) {
      this.shrink()
    }
  }
}
