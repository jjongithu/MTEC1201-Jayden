// First Name, Last Initial: [Your Name]
// Title: Random Sky
// Concept: My semester theme is nature and the sky. This sketch explores
// clouds and changing weather. The user can create new random clouds
// by clicking on the sky and change the weather by pressing a key.
// Instructions: Click the mouse to create a random cloud.
// Press the "r" key to make it rain.

// Variables
let cloudColor = 255;
let skyColor = 180;
let rain = false;

// This function creates a cloud at a given position
function drawCloud(x, y, size) {
  fill(cloudColor);
  noStroke();

  circle(x, y, size);
  circle(x + size * 0.6, y - size * 0.3, size * 1.3);
  circle(x + size * 1.2, y, size);
  rect(x, y, size * 1.2, size * 0.5);
}

// This function creates rain underneath a cloud
function drawRain(x, y, size) {
  stroke(70, 130, 255);
  strokeWeight(2);

  for (let i = 0; i < 8; i++) {
    let rainX = x + random(size * 1.3);
    let rainY = y + random(20, 50);

    line(rainX, rainY, rainX, rainY + random(10, 25));
  }
}

// Set up the canvas
function setup() {
  createCanvas(600, 400);
  background(135, 206, 235);

  // Create some clouds when the sketch starts
  for (let i = 0; i < 5; i++) {
    let x = random(50, width - 150);
    let y = random(50, 180);
    let size = random(25, 45);

    drawCloud(x, y, size);
  }
}

// Draw the sky and clouds
function draw() {
  background(skyColor);

  // Sun
  fill(255, 220, 80);
  noStroke();
  circle(500, 80, 70);

  // Draw several random clouds
  for (let i = 0; i < 4; i++) {
    let x = 50 + i * 140;
    let y = 100 + sin(frameCount * 0.01 + i) * 10;

    drawCloud(x, y, 35);

    // Add rain when rain mode is turned on
    if (rain) {
      drawRain(x, y + 20, 35);
    }
  }
}

// Clicking creates a new cloud at the mouse position
function mousePressed() {
  let randomSize = random(25, 60);
  drawCloud(mouseX, mouseY, randomSize);

  // Sometimes clicking also creates rain
  if (random(1) > 0.5) {
    drawRain(mouseX, mouseY + 20, randomSize);
  }
}

// Press "r" to turn rain on/off
function keyPressed() {
  if (key === "r" || key === "R") {
    rain = !rain;
  }
}
