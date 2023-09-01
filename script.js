const bat = document.getElementById("bat");
const ball = document.getElementById("ball");
const gameContainer = document.querySelector(".game-container");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");

const batWidth = 80;
const ballRadius = 20;
const ballSpeed = 2;
const batSpeed = 5;

let ballX = Math.random() * (gameContainer.clientWidth - ballRadius * 2);
let ballY = 10;
let ballDirectionX = 1;
let ballDirectionY = 1;

let batX = (gameContainer.clientWidth - batWidth) / 2;

let score = 0;
let isPlaying = false;
let isGameOver = false;
let animationFrame;

function updateBatPosition(x) {
  bat.style.left = x + "px";
}

function updateScore() {
  scoreDisplay.textContent = "Score: " + score;
}

function gameLoop() {
  if (!isPlaying) return;

  // Move the ball
  ballX += ballSpeed * ballDirectionX;
  ballY += ballSpeed * ballDirectionY;

  // Check collision with walls
  if (ballX < 0 || ballX > gameContainer.clientWidth - ballRadius) {
    ballDirectionX *= -1;
  }

  if (ballY < 0) {
    ballDirectionY *= -1;
  }

  // Check collision with the bat
  if (
    ballY + ballRadius * 2 >= gameContainer.clientHeight - 10 &&
    ballX + ballRadius * 2 >= batX &&
    ballX <= batX + batWidth
  ) {
    ballDirectionY *= -1;
    score++;
    updateScore();
  }

  // Check if the ball missed the bat
  if (ballY > gameContainer.clientHeight) {
    isGameOver = true;
    message.textContent = "Game Over 😵 Your Score: " + score;
    setTimeout(() => {
      isGameOver = false;
      message.textContent = "";
    }, 3000); // Blink for 5 seconds
    setTimeout(() => {
      reset();
    }, 3000);
    isPlaying = false;
    cancelAnimationFrame(animationFrame);
  }

  // Update the ball's position
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  animationFrame = requestAnimationFrame(gameLoop);
}

playButton.addEventListener("click", () => {
  message.textContent = "";
  if (!isPlaying) {
    isPlaying = true;
    gameLoop();
  }
});

pauseButton.addEventListener("click", () => {
  message.textContent = "Game Paused";
  isPlaying = false;
  cancelAnimationFrame(animationFrame);
});

const reset = () => {
  isPlaying = false;
  cancelAnimationFrame(animationFrame);
  score = 0;
  updateScore();
  ballX = Math.random() * (gameContainer.clientWidth - ballRadius * 2);
  ballY = 10;
  updateBatPosition((gameContainer.clientWidth - batWidth) / 2);
  ballDirectionX = 1;
  ballDirectionY = 1;
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
  if (isGameOver) {
    isGameOver = false;
    message.textContent = "";
  }
};

resetButton.addEventListener("click", reset);

gameContainer.addEventListener("mousemove", (e) => {
  const mouseX =
    e.clientX - gameContainer.getBoundingClientRect().left - batWidth / 2;
  if (mouseX >= 0 && mouseX <= gameContainer.clientWidth - batWidth) {
    batX = mouseX;
    updateBatPosition(batX);
  }
});
