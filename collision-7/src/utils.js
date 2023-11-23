// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getDistance(x1, y1, x2, y2) {
  const xDistance = x1 - x2;
  const yDistance = y1 - y2;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function checkCollided(distance, radius) {
  return distance - radius * 2 < 0;
}

module.exports = {
  randomColor,
  randomIntFromRange,
  getDistance,
  checkCollided,
};
