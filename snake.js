const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const box = 10;

let snake = [{x: 10, y: 10}];
let food = {x: Math.floor(Math.random() * 39) + 1, y: Math.floor(Math.random() * 39) + 1};
let direction = "right";

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * box, snake[i].y * box, box, box);
  }
}

function drawFood() {
  const img = new Image();
  img.src = "inseto.png";
  ctx.drawImage(img, food.x * box, food.y * box, box, box);
}

function moveSnake() {
  let head = {x: snake[0].x, y: snake[0].y};
  if (direction === "right") {
    head.x++;
  } else if (direction === "left") {
    head.x--;
  } else if (direction === "up") {
    head.y--;
  } else if (direction === "down") {
    head.y++;
  }
  if (head.x === food.x && head.y === food.y) {
    food = {x: Math.floor(Math.random() * 39) + 1, y: Math.floor(Math.random() * 39) + 1};
  } else {
    snake.pop();
  }
  snake.unshift(head);
}

function checkCollision() {
  if (snake[0].x < 0 || snake[0].x > 39 || snake[0].y < 0 || snake[0].y > 39) {
    clearInterval(interval);
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(interval);
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (event.keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (event.keyCode === 39 && direction !== "left") {
    direction = "right";
  } else if (event.keyCode === 40 && direction !== "up") {
    direction = "down";
  }
});

let interval = setInterval(gameLoop, 100);
