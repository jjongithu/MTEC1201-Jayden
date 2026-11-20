/*
Name: Jayden Galarza
Title: Responsive Rectangle World
Instructions: Move your mouse over the rectangles to change their colors.
Building from: Previous responsive rectangle sketch (add its short study number)
*/

// Create variables for the three rectangles
let box1;
let box2;
let box3;

function setup() {
  // Create a canvas that fits the window
  createCanvas(windowWidth, windowHeight);

  // Create three rectangle objects
  box1 = new Rectangle(0.2, 0.3, 100, 100, 255, 0, 0);
  box2 = new Rectangle(0.5, 0.5, 120, 100, 0, 255, 0);
  box3 = new Rectangle(0.8, 0.3, 100, 100, 255, 255, 0);
}

function draw() {
  background(220);

  // Update and display each rectangle
  box1.updateColor();
  box1.display();

  box2.updateColor();
  box2.display();

  box3.updateColor();
  box3.display();
}

// Create the Rectangle class
class Rectangle {

  // Set up the rectangle's starting information
  constructor(x, y, w, h, r, g, b) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // Store the original color
    this.r = r;
    this.g = g;
    this.b = b;

    this.currentColor = color(r, g, b);
  }

  // Method 1: Check if the mouse is over the rectangle
  updateColor() {
    let actualX = width * this.x;
    let actualY = height * this.y;

    if (
      mouseX > actualX - this.w / 2 &&
      mouseX < actualX + this.w / 2 &&
      mouseY > actualY - this.h / 2 &&
      mouseY < actualY + this.h / 2
    ) {
      this.currentColor = color(0, 0, 255);
    } else {
      this.currentColor = color(this.r, this.g, this.b);
    }
  }

  // Method 2: Draw the rectangle
  display() {
    fill(this.currentColor);

    rectMode(CENTER);
    rect(width * this.x, height * this.y, this.w, this.h);
  }
}

// Resize the canvas when the window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
