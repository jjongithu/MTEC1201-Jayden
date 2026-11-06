function setup() {
  createCanvas(600, 600);
  background(0);
}

function draw() {
  stroke(0, 255, 0);
  strokeWeight(3);

  for (let i = 0; i < 600; i += 10) {
    point(i, 300);
    point(300, i);
    point(i, i);
    point(600 - i, i);
  
  }
}