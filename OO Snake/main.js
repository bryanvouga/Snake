//canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = canvas.height = 600

//inputs
document.addEventListener("keydown", (evt) => game.keyDown(evt))

//game
const game = new Game(ctx)
game.run()
