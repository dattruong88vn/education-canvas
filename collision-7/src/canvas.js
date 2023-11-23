import utils from "./utils";
import utilElastic from "./util-elastic-collision";
const { randomColor, randomIntFromRange, getDistance, checkCollided } = utils;
const { resolveCollision, rotate } = utilElastic;

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

var colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

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

// Objects
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.velocity = {
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 10,
  };
  this.radius = radius;
  this.color = color;
  this.mass = 1;
  this.opacity = 0;

  this.update = function (particles) {
    this.draw();

    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;
      for (let j = 0; j < particles.length; j++) {
        if (
          checkCollided(
            getDistance(this.x, this.y, particles[i].x, particles[i].y),
            this.radius
          )
        ) {
          resolveCollision(this, particles[i]);
        }
      }
    }

    if (this.x - this.radius <= 0 || this.x + this.radius > innerWidth) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius > innerHeight) {
      this.velocity.y = -this.velocity.y;
    }

    // mouse collision detection
    if (
      getDistance(mouse.x, mouse.y, this.x, this.y) < 80 &&
      this.opacity < 0.2
    ) {
      this.opacity += 0.02;
    } else if (this.opacity > 0) {
      this.opacity -= 0.02;
      this.opacity = Math.max(0, this.opacity);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  };
}

// Implementation
let paricles;
function init() {
  paricles = [];
  for (let i = 0; i < 150; i++) {
    const radius = 20;
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    const color = randomColor(colors);

    if (i !== 0) {
      for (let j = 0; j < paricles.length; j++) {
        if (
          checkCollided(getDistance(x, y, paricles[j].x, paricles[j].y), radius)
        ) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);
          j = -1;
        }
      }
    }
    paricles.push(new Particle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);
  //   c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
  paricles.forEach((particle) => {
    particle.update(paricles);
  });
}

init();
animate();
