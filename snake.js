const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoretext = document.querySelector("#score");
const resetbtn = document.querySelector("#btn");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const boardbackground = "white";
const snakecolor = "aqua";
const snakeborder = "black";
const foodcolor = "red";
const unitsize = 25;

let running = false;
let Xvelocity = unitsize;
let Yvelocity = 0;
let foodX;
let foodY;
let score = 0;

let snake = [
  { x: unitsize * 4, y: 0 },
  { x: unitsize * 3, y: 0 },
  { x: unitsize * 2, y: 0 },
  { x: unitsize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetbtn.addEventListener("click", resetgame);

gamestart();

function gamestart() {
  running = true;
  scoretext.textContent = score;
  createfood();
  drawfood();
  nexttick();
}
function nexttick() {
  if (running) {
    setTimeout(() => {
      clearboard();
      drawfood();
      movesnake();
      drawsnake();
      checkgameover();
      nexttick();
    }, 75);
  } else {
    displaygameover();
  }
}
function clearboard() {
  ctx.fillStyle = boardbackground;
  ctx.fillRect(0, 0, gamewidth, gameheight);
}
function createfood() {
  function randomfood(min, max) {
    const randnum =
      Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize;
    return randnum;
  }
  foodX = randomfood(0, gamewidth - unitsize);
  foodY = randomfood(0, gamewidth - unitsize);
}
function drawfood() {
  ctx.fillStyle = foodcolor;
  ctx.fillRect(foodX, foodY, unitsize, unitsize);
}
function movesnake() {
  const head = { x: snake[0].x + Xvelocity, y: snake[0].y + Yvelocity };

  snake.unshift(head);

  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoretext.textContent = score;
    createfood();
  } else {
    snake.pop();
  }
}
function drawsnake() {
  ctx.fillStyle = snakecolor;
  ctx.strokeStyle = snakeborder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitsize, unitsize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitsize, unitsize);
  });
}
function changeDirection(e) {
  const keypressed = e.keyCode;
  const LEFT = 37;
  const LEFT1 = 65;
  const UP = 38;
  const UP1 = 87;
  const RIGHT = 39;
  const RIGHT1 = 68;
  const DOWN = 40;
  const DOWN1 = 83;

  const goingUp = Yvelocity == -unitsize;
  const goingDown = Yvelocity == unitsize;
  const goingRight = Xvelocity == unitsize;
  const goingLeft = Xvelocity == -unitsize;

  switch (true) {
    case keypressed == LEFT||keypressed==LEFT1 && !goingRight:
      Xvelocity = -unitsize;
      Yvelocity = 0;
      break;
    case keypressed == UP||keypressed==UP1 && !goingDown:
      Xvelocity = 0;
      Yvelocity = -unitsize;
      break;
    case keypressed == RIGHT||keypressed==RIGHT1 && !goingLeft:
      Xvelocity = unitsize;
      Yvelocity = 0;
      break;
    case keypressed == DOWN||keypressed==DOWN1 && !goingUp:
      Xvelocity = 0;
      Yvelocity = unitsize;
      break;
  }
}
function checkgameover() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gamewidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameheight:
      running = false;
      break;
  }

  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displaygameover() {
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", gamewidth / 2, gameheight / 2);
  running = false;
}
function resetgame() {
  score = 0;
  Xvelocity = unitsize;
  Yvelocity = 0;
  snake = [
    { x: unitsize * 4, y: 0 },
    { x: unitsize * 3, y: 0 },
    { x: unitsize * 2, y: 0 },
    { x: unitsize, y: 0 },
    { x: 0, y: 0 },
  ];
  gamestart();
}
