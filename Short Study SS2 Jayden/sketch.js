/*
  First Name, Last Initial: [Jayden, Galarza]
  Title: Peaceful Sky

  Theme:
  My semester theme is peace. I chose to explore peace through
  calming natural scenes. This sketch shows a peaceful blue sky
  with clouds. The clouds slowly move across the sky, and the
  user can click the mouse to create more clouds and make the
  scene feel more peaceful.

  Instructions:
  Move the mouse to control the main cloud.
  Click the mouse to add a peaceful cloud.
*/

let cloudX = 150;
let cloudSpeed = 1;
let cloudCount = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // Blue peaceful sky
  background(135, 206, 235);

  // Sun
  fill(255, 230, 120);
  noStroke();
  circle(500, 80, 70);

  // Main cloud follows the mouse
  cloudX = mouseX;

  drawCloud(cloudX, 150);

  // Moving background cloud
  drawCloud((cloudCount * 0.5) % width, 250);

  // Ground
  fill(120, 190, 120);
  rect(0, 350, width, 50);

  // Incrementing value over time
  cloudCount = cloudCount + cloudSpeed;

  // Title
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Peaceful Sky", width / 2, 40);
}

function drawCloud(x, y) {
  fill(255);
  noStroke();

  circle(x, y, 45);
  circle(x + 30, y - 15, 60);
  circle(x + 65, y, 45);
  rect(x - 5, y, 75, 25);
}

function mousePressed() {
  // Clicking adds a small cloud at the mouse position
  drawCloud(mouseX, mouseY);
}
