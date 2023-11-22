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

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
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

    this.draw();
  };
}

const circles = [];

for (let i = 0; i <= 100; i++) {
  var x = Math.random() * (innerWidth - radius * 2);
  var y = Math.random() * (innerHeight - radius * 2);
  var dx = Math.random() - 0.5;
  var dy = Math.random() - 0.5;
  var radius = 30;
  circles.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
}

animate();
