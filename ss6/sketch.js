/*
Name: Jayden G
Title: Responsive Rectangle Pattern
Instructions: Move your mouse over rectangles to change their colors.
Click the mouse to add more rectangles.
*/

// First array stores the X positions
let xPositions = [100, 250, 400];

// Second array stores the Y positions
let yPositions = [150, 250, 150];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  // Go through every rectangle in the arrays
  for (let i = 0; i < xPositions.length; i++) {

    // Check if the mouse is over a rectangle
    if (
      mouseX > xPositions[i] - 40 &&
      mouseX < xPositions[i] + 40 &&
      mouseY > yPositions[i] - 40 &&
      mouseY < yPositions[i] + 40
    ) {
      fill(0, 0, 255);
    } else {
      fill(255, 0, 0);
    }

    // Draw each rectangle
    rect(xPositions[i], yPositions[i], 80, 80);
  }
}

// Add another rectangle when the mouse is clicked
function mousePressed() {
  xPositions.push(mouseX);
  yPositions.push(mouseY);
}

// Resize the canvas when the window changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}