const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// create context of canvas
const c = canvas.getContext("2d");

// draw rectangle with position of top-left
c.fillStyle = "rgba(255, 0, 0, 0.5)";
c.fillRect(100, 100, 200, 200);

c.fillStyle = "rgba(0, 0, 255, 0.1)";
c.fillRect(100, 400, 200, 200);

// line
c.beginPath();
c.moveTo(250, 350);
c.lineTo(550, 350);
c.lineTo(600, 100);
c.strokeStyle = "red";
c.stroke();

// arc / cicle
c.beginPath();
c.arc(400, 400, 50, 0, Math.PI * 2, false);
c.strokeStyle = "blue";
c.stroke();

for (let i = 1; i < 800; i++) {
  const x = Math.random() * 800;
  const y = Math.random() * 800;
  c.beginPath();
  c.arc(x, y, 50, 0, Math.PI * 2, false);
  c.strokeStyle = "blue";
  c.stroke();
}
