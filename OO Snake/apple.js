function Apple() {
  this.position = [2, 2]

  this.respawn = function(rows, columns) {
    this.position = [Math.floor(Math.random() * rows), Math.floor(Math.random() * columns)]
  }

  this.draw = function(ctx, cellLength) {
    ctx.fillStyle = "red"
    ctx.fillRect(
      this.position[0]*cellLength,
      this.position[1]*cellLength,
      cellLength,
      cellLength)
  }
}
