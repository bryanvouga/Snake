/* GLOBAL */
const ROWS = COLS = 20

/* MAIN */
let state = intialState()

function main(action) {
  state = transition(state, action)
  render(document.querySelector('#canvas').getContext('2d'), state)
}

main({type: "INITALIZE"})

/* INPUTS */
setInterval(()=>main({type:"TICK"}), 1000/15)
document.addEventListener("keydown",()=>{main({type:"KEYDOWN", value: event})})

/* TRANSITION FUNCTIONS */
function transition(state, action) {
  switch (action.type) {
    case "INTIALIZE":
      return intialState()
    case "TICK":
      return tick(state)
    case "KEYDOWN":
      return keydown(state, action.value)
    default:
      return state
  }
}

function intialState() {
  return {
    snake: [[2, 2]],
    apple: [1, 1],
    direction: [0, 1],
    length: 1,
  }
}

function tick(state) {
  return (
    R.pipe(
      growSnake,
      R.when(snakeTooLong, shrinkSnake),
      R.when(snakeEatApple, R.pipe(increaseLength, spawnNewApple)),
      R.when(R.either(snakeEatItself, snakeOutOfBounds), intialState))
      (state)
  )
}

function keydown(state, event) {
  const newDirection =
    R.propOr(state.direction, event.key, {
      ArrowRight: [ 1,  0],
      ArrowLeft:  [-1,  0],
      ArrowUp:    [ 0, -1],
      ArrowDown:  [ 0,  1],
    })
  const isOppositeDirection = R.equals(addv(state.direction, newDirection), [0, 0])
  return {
    ...state,
    direction: isOppositeDirection ? state.direction : newDirection
  }
 }

/* RENDER FUNCTIONS */
function render(ctx, state){
  const
    WIDTH = 600,
    HEIGHT = 600,
    CELLWIDTH = WIDTH/ROWS,
    CELLHEIGHT = WIDTH/COLS
  ctx.canvas.width = WIDTH
  ctx.canvas.height = HEIGHT
  const drawCell = ([i, j]) => ctx.fillRect(i*CELLWIDTH, j*CELLHEIGHT, CELLWIDTH, CELLHEIGHT)

  ctx.beginPath()
  //draw snake
  ctx.fillStyle = "green"
  R.forEach((index) => drawCell(index), state.snake)
  //draw apple
  ctx.fillStyle = "red"
  drawCell(state.apple)

  ctx.closePath()
}

/* HELPER FUNCTIONS */
function addv(v1, v2) {
  return R.zipWith(R.add, v1, v2)
}

function snakeTooLong(state) {
  return R.lt(state.length, state.snake.length)
}

function snakeEatApple(state) {
  return R.equals(R.head(state.snake), state.apple)
}

function snakeEatItself(state) {
  return R.contains(R.head(state.snake), R.tail(state.snake))
}

function snakeOutOfBounds(state) {
  const
    x = state.snake[0][0],
    y = state.snake[0][1]
  return x > ROWS || y > COLS || x < 0 || y < 0
}

function shrinkSnake(state) {
  return {
    ...state,
    snake: R.dropLast(1, state.snake)
  }
}

function growSnake(state) {
  return {
    ...state,
    snake: R.prepend(addv(state.direction, R.head(state.snake)), state.snake)
  }
}

function increaseLength(state) {
  return {
    ...state,
    length: R.add(3, state.length)
  }
}

function spawnNewApple(state) {
  return {
    ...state,
    apple: [Math.floor(Math.random()*ROWS), Math.floor(Math.random()*COLS)]
  }
}
