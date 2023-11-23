const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// create context of canvas
const c = canvas.getContext("2d");

// // draw rectangle with position of top-left
// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 200, 200);

// c.fillStyle = "rgba(0, 0, 255, 0.1)";
// c.fillRect(100, 400, 200, 200);

// // line
// c.beginPath();
// c.moveTo(250, 350);
// c.lineTo(550, 350);
// c.lineTo(600, 100);
// c.strokeStyle = "red";
// c.stroke();

// // arc / cicle
// c.beginPath();
// c.arc(400, 400, 50, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// for (let i = 1; i < 800; i++) {
//   const x = Math.random() * 800;
//   const y = Math.random() * 800;
//   c.beginPath();
//   c.arc(x, y, 50, 0, Math.PI * 2, false);
//   c.strokeStyle = "blue";
//   c.stroke();
// }

let mouse = {
  x: undefined,
  y: undefined,
};

let maxRadius = 40;
let minRadius = 2;

const colors = ["#146152", "#44803F", "#B4CF66", "#FFEC5C", "#FF5A33"];

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", function () {
  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) this.radius += 1;
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    // draw after update
    this.draw();
  };
}

const circles = [];

function init() {
  for (let i = 0; i <= 1000; i++) {
    var radius = Math.random() * 5 + 1;
    var x = Math.random() * (innerWidth - radius * 2);
    var y = Math.random() * (innerHeight - radius * 2);
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;
    circles.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
}

init();
animate();
