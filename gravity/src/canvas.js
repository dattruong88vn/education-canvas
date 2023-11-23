// Initial Setup
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

var colors = [
  "#2185C5",
  "#7ECEFD",
  "#FFF6E5",
  "#FF7F66",
  "#F25EB0",
  "#B9BF04",
  "#F2B705",
  "#F27405",
  "#F23005",
  "#0CF25D",
  "#038C3E",
  "#02735E",
];
const gravity = 1;
const friction = 0.95;

// Event Listeners
addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

window.addEventListener("click", function () {
  init();
});

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = function () {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };
}

// Implementation
let ball;
let ballArray;
function init() {
  ballArray = [];
  for (let i = 0; i < 1000; i++) {
    const radius = randomIntFromRange(8, 50);
    const dx = randomIntFromRange(-2, 2);
    const dy = randomIntFromRange(-2, 2);
    const x = randomIntFromRange(radius, canvas.width);
    const y = randomIntFromRange(0, canvas.height - radius);
    const color = randomColor(colors);
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);
  //   c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

init();
animate();
