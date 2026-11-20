
/*
Name: Jayden G
Title: Digital Galaxy
Instructions:
Move your mouse to change the size and movement of the pattern.
Click to change the pattern.
Press SPACE to change the colors.
*/

let colors = [];
let patternType = 0;
let rotation = 0;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  colors = [
    color(0, 200, 255),
    color(180, 50, 255),
    color(255, 80, 150),
    color(255, 200, 50)
  ];
}

function draw() {
  background(10, 5, 30, 40);

  translate(width / 2, height / 2);

  // Mouse controls the pattern size
  let patternSize = map(mouseX, 0, width, 30, 180);

  // Mouse controls the rotation speed
  rotation += map(mouseY, 0, height, 0.2, 2);

  rotate(rotation);

  // FOR LOOP creates repeated circular shapes
  for (let i = 0; i < 24; i++) {
    push();

    rotate(i * 15);

    let size = patternSize + sin(rotation + i * 20) * 30;

    // CONDITIONAL changes the shape
    if (patternType === 0) {
      noFill();
      stroke(colors[i % colors.length]);
      strokeWeight(2);
      ellipse(0, 100, size, size);
    } else if (patternType === 1) {
      fill(colors[i % colors.length]);
      noStroke();
      rectMode(CENTER);
      rect(0, 100, size / 3, size / 3);
    } else {
      noFill();
      stroke(colors[i % colors.length]);
      strokeWeight(3);
      triangle(
        0, 100 - size / 2,
        -size / 2, 100 + size / 2,
        size / 2, 100 + size / 2
      );
    }

    pop();
  }

  // WHILE LOOP creates additional orbiting dots
  let count = 0;

  while (count < 40) {
    let angle = count * 9;
    let distance = 200 + sin(rotation + count * 10) * 40;

    let x = cos(angle + rotation) * distance;
    let y = sin(angle + rotation) * distance;

    noStroke();
    fill(colors[count % colors.length]);
    circle(x, y, 5);

    count++;
  }

  // Center decoration
  fill(255);
  noStroke();
  circle(0, 0, 15);
}

// Clicking changes the pattern
function mousePressed() {
  patternType++;

  if (patternType > 2) {
    patternType = 0;
  }
}

// SPACE changes the color palette
function keyPressed() {
  if (key === ' ') {
    colors = [
      color(random(255), random(255), random(255)),
      color(random(255), random(255), random(255)),
      color(random(255), random(255), random(255)),
      color(random(255), random(255), random(255))
    ];
  }
}
