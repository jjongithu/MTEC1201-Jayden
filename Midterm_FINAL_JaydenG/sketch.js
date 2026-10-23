let gameState = "title";
let player;
let pipes = [];
let countdownStart = 0;
let lastPipeTime = 0;
let score = 0;

let gravity = 0.4;
let flapPower = -7;
let pipeSpeed = 3;
let pipeGap = 180;
let pipeWidth = 70;
let groundY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  groundY = height - 25;
  resetGame();
}

function resetGame() {
  player = {
    x: width * 0.22,
    y: height * 0.45,
    r: 15,
    velocityY: 0
  };

  pipes = [];
  score = 0;
}

function startCountdown() {
  resetGame();
  gameState = "countdown";
  countdownStart = millis();
}

function draw() {
  background(135, 206, 235);

  drawBackgroundClouds();

  if (gameState === "title") {
    drawPlayer();
    drawTitleScreen();
    return;
  }

  if (gameState === "countdown") {
    drawPipes();
    drawPlayer();

    let elapsed = millis() - countdownStart;
    let number = 3 - floor(elapsed / 1000);

    fill(20, 50, 90);
    textAlign(CENTER, CENTER);
    textSize(60);

    if (number > 0) {
      text(number, width / 2, height / 2);
    } else if (elapsed < 4000) {
      text("GO!", width / 2, height / 2);
    } else {
      gameState = "playing";
      lastPipeTime = millis();
    }

    return;
  }

  if (gameState === "playing") {
    updateGame();
  }

  drawPipes();
  drawPlayer();
  drawHUD();

  if (gameState === "gameover") {
    drawOverlay("GAME OVER", "Click to try again");
  }
}

function updateGame() {
  player.velocityY += gravity;
  player.y += player.velocityY;

  if (millis() - lastPipeTime > 1600) {
    addPipePair();
    lastPipeTime = millis();
  }

  for (let p of pipes) {
    p.x -= pipeSpeed;

    if (!p.passed && p.x + pipeWidth < player.x) {
      p.passed = true;
      score++;
    }

    let overlapsX =
      player.x + player.r > p.x &&
      player.x - player.r < p.x + pipeWidth;

    let hitsPipe =
      player.y - player.r < p.gapTop ||
      player.y + player.r > p.gapBottom;

    if (overlapsX && hitsPipe) {
      gameState = "gameover";
    }
  }

  pipes = pipes.filter(p => p.x + pipeWidth > 0);

  if (
    player.y - player.r < 0 ||
    player.y + player.r > groundY
  ) {
    gameState = "gameover";
  }
}

function addPipePair() {
  let margin = 60;
  let gapTop = random(
    margin,
    groundY - pipeGap - margin
  );

  pipes.push({
    x: width + 20,
    gapTop: gapTop,
    gapBottom: gapTop + pipeGap,
    passed: false
  });
}

function drawPipes() {
  for (let p of pipes) {
    fill(115, 130, 150);
    noStroke();

    rect(p.x, 0, pipeWidth, p.gapTop);
    rect(
      p.x,
      p.gapBottom,
      pipeWidth,
      groundY - p.gapBottom
    );

    // Cloud-like bumps on the tubes
    fill(145, 160, 175);

    for (let y = 15; y < p.gapTop; y += 40) {
      circle(p.x + 10, y, 20);
      circle(p.x + pipeWidth - 5, y + 10, 20);
    }

    for (
      let y = p.gapBottom + 20;
      y < groundY;
      y += 40
    ) {
      circle(p.x + 10, y, 20);
      circle(p.x + pipeWidth - 5, y + 10, 20);
    }
  }
}

function drawPlayer() {
  noStroke();
  fill(255, 100, 115);
  circle(player.x, player.y, player.r * 2);

  fill(255);
  circle(player.x + 5, player.y - 4, 7);

  fill(20);
  circle(player.x + 7, player.y - 4, 3);
}

function drawBackgroundClouds() {
  fill(255, 255, 255, 150);
  noStroke();

  for (let i = 0; i < 5; i++) {
    let x =
      (i * width / 4 + frameCount * 0.3) %
      (width + 120) - 60;

    let y = height * (0.15 + (i % 3) * 0.15);

    circle(x, y, 35);
    circle(x + 22, y - 10, 45);
    circle(x + 48, y, 34);
  }
}

function drawHUD() {
  fill(20, 50, 90);
  textAlign(LEFT, TOP);
  textSize(20);
  text("Score: " + score, 20, 20);
}

function drawTitleScreen() {
  fill(20, 50, 90);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(min(60, width * 0.12));

  text("FLAPPY BALL", width / 2, height * 0.35);

  textStyle(NORMAL);
  textSize(24);
  text("Click to play", width / 2, height * 0.48);

  textSize(16);
  text(
    "Click to flap and avoid the clouds!",
    width / 2,
    height * 0.55
  );
}

function drawOverlay(title, subtitle) {
  fill(10, 35, 60, 170);
  noStroke();
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(min(48, width * 0.1));
  text(title, width / 2, height / 2 - 25);

  textStyle(NORMAL);
  textSize(22);
  text(subtitle, width / 2, height / 2 + 25);
}

function mousePressed() {
  if (gameState === "title") {
    startCountdown();
  } else if (gameState === "playing") {
    player.velocityY = flapPower;
  } else if (gameState === "gameover") {
    resetGame();
    gameState = "title";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  groundY = height - 25;
  resetGame();
  gameState = "title";
}


