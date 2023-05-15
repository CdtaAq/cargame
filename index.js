document.addEventListener('DOMContentLoaded', () => {
  const road = document.querySelector('.road');
  const cars = document.querySelectorAll('.car');
  const obstacles = [];

  const carPositions = [0, 0];
  const carSpeed = 50;
  const obstacleSpeed = 20;

  let gameInterval;
  let score = 0;

  function updateRoad() {
    road.style.backgroundPositionY = `${score}px`;
  }

  function moveCar(player, direction) {
    if (direction === 'left') {
      carPositions[player] -= carSpeed;
    } else if (direction === 'right') {
      carPositions[player] += carSpeed;
    }

    cars[player].style.left = `${carPositions[player]}px`;
  }

  function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = `${Math.random() * (road.offsetWidth - 40)}px`;
    road.appendChild(obstacle);
    obstacles.push(obstacle);
  }

  function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      obstacle.style.top = `${obstacle.offsetTop + obstacleSpeed}px`;

      if (obstacle.offsetTop > road.offsetHeight) {
        obstacle.remove();
        obstacles.splice(i, 1);
        score += 10;
      }
    }
  }

  function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      for (let j = 0; j < cars.length; j++) {
        const car = cars[j];
        if (
          carPositions[j] + car.offsetWidth >= obstacle.offsetLeft &&
          carPositions[j] <= obstacle.offsetLeft + obstacle.offsetWidth &&
          car.offsetTop <= obstacle.offsetTop + obstacle.offsetHeight &&
          car.offsetTop + car.offsetHeight >= obstacle.offsetTop
        ) {
          gameOver();
          return;
