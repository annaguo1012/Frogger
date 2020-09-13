// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global keyIsDown, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let backgroundColor,
  frogX,
  frogY,
  frogV,
  score,
  lives,
  gameIsOver,
  car1X,
  car1Y,
  car1V,
  time,
  frameTime,
    won;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = width / 2;
  frogY = height * 0.9;
  frogV = 5;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  frameTime = 1200;
  time = frameTime / 60;
  won = false;
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
  if (!gameIsOver && !won) {
    handleTime();
    moveCars();
    //allows to continue moving if hold down arrows
    if (keyIsDown(UP_ARROW) && frameTime % 2 == 0) {
      frogY -= frogV;
    } else if (keyIsDown(DOWN_ARROW) && frameTime % 2 == 0) {
      frogY += frogV;
    } else if (keyIsDown(LEFT_ARROW) && frameTime % 2 == 0) {
      frogX -= frogV;
    } else if (keyIsDown(RIGHT_ARROW) && frameTime % 2 == 0) {
      frogX += frogV;
    }
  }
}

function keyPressed() {
  if (!gameIsOver) {
    if (keyCode === UP_ARROW) {
      frogY -= frogV;
    } else if (keyCode === DOWN_ARROW) {
      frogY += frogV;
    } else if (keyCode === LEFT_ARROW) {
      frogX -= frogV;
    } else if (keyCode === RIGHT_ARROW) {
      frogX += frogV;
    }
  }
}

function moveCars() {
  // Move the car
  car1X += car1V;
  // Reset if it moves off screen
  if (car1X > width) {
    car1X = -30;
    car1Y = random(100, height * 0.8);
  }
}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  if (collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20)) {
    console.log("Collided with car 1");
    resetFrog();
    lives--;
    if (lives <= 0) {
      gameIsOver = true;
    }
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY <= 30) {
    score++;
    car1V *= 1.2;
    resetFrog();
  }
}

function resetFrog() {
  frogX = width / 2;
  frogY = height * 0.9;
}
function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 38);
  // Display Time
  text(`Time: ${time}`, width * 0.85, height * 0.95);
  //instructions
  text('Score 5 points in 20 seconds to win the game', 5, height*0.98)
  // Display game over message if the game is over
  if (score === 5){
    won = true;
    textSize(35);
    text("YOU WON THE GAME :)", 70, height / 2);
  }
  if (gameIsOver) {
    textSize(60);
    text("GAME OVER", 70, height / 2);
  }
}

function handleTime() {
  // We'll write code to handle the time.
  //adjust the time variable
  if (time > 0) {
    frameTime--;
    if (frameTime % 60 == 0) {
      time--;
    }
  } else {
    gameIsOver = true;
  }
}

/*
class Car{
  constructor(){
    this.x = -30;
    this.y = random(100, height * 0.8);
  }
  
  draw(){
    fill(random(360), 80, 80);
    rect(this.x, this.y, 40, 30);
  }
}
  */
