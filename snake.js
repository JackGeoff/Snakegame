//gameCanvas
 var blockSize = 25;
 var rows = 20;
 var cols = 20;
 var score = -10;
 var highScore = 0;
 var gameCanvas;
 var context;

 //snakes head
 var snakeX = 5 * blockSize;
 var snakeY = 5 * blockSize;

 var velocityX = 0;
 var velocityY = 0;

 var snakebody = [];

//food
var foodX = blockSize * 10;
var foodY = blockSize * 10;

//gameover
var gameover = false;

 window.onload = function() {
   gameCanvas = document.getElementById("gameCanvas");
   gameCanvas.height = rows * blockSize;
   gameCanvas.width = cols * blockSize;
   context = gameCanvas.getContext("2d"); //used for drawing the gameCanvas


   placefood();
   document.addEventListener("keyup", changeDirection);
   //update();
   setInterval(update, 1000/10);

   highScore = parseInt(localStorage.getItem("snakeHighScore")) || 0;
 }

function update() {
  if (gameover){
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  context.fillStyle = "white";
  context.font ="20px Arial";
  context.fillText("Score: "+score, 0, 30);

  context.fillText("High Score: "+highScore,gameCanvas.width -150,30);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize,blockSize);

  if (snakeX == foodX && snakeY == foodY){
    snakebody.push ([foodX, foodY])
    placefood();
  }

  for(let i = snakebody.length-1; i >0; i--){
    snakebody[i] = snakebody[i-1];
  }
  if (snakebody.length){
    snakebody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "Lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakebody.length; i++ ){
    context.fillRect(snakebody[i][0], snakebody[i][1], blockSize, blockSize);
  }
  //gameover conditions
  if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize ){
    gameover = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakebody.length; i++){
    if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]){
      gameover = true;
      alert("Game Over");
    }
  }


}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1){
    velocityX = 0;
    velocityY = -1;
  }
  else if (e.code == "ArrowDown" && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
  }
  else if (e.code == "ArrowLeft" && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
  }
  else if (e.code == "ArrowRight"  && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
  }

}

function placefood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
  score += 10;

  if (score > highScore){
    highScore = score;

    localStorage.setItem("snakeHighScore", highScore);
  }

}
