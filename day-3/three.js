const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n');

const wire1 = input[0].split(',');
const wire2 = input[1].split(',');

function readWire(wire) {
  const route = [[0, 0]];
  wire.forEach(coord => {
    const command = coord.slice(0, 1);
    const steps = Number(coord.slice(1));

    switch (command) {
      case 'U':
        for (i = 0; i < steps; i++) {
          const [lastX, lastY] = route[route.length - 1];

          route.push([lastX, lastY + 1]);
        }
        break;
      case 'D':
        for (i = 0; i < steps; i++) {
          const [lastX, lastY] = route[route.length - 1];

          route.push([lastX, lastY - 1]);
        }
        break;
      case 'L':
        for (i = 0; i < steps; i++) {
          const [lastX, lastY] = route[route.length - 1];

          route.push([lastX - 1, lastY]);
        }
        break;
      case 'R':
        for (i = 0; i < steps; i++) {
          const [lastX, lastY] = route[route.length - 1];

          route.push([lastX + 1, lastY]);
        }
        break;
    }
  });

  return route;
}

// This many loops is basically a crime.....
function findCrossPoints(wire1, wire2) {
  const one = wire1.map(el => el.join(','));
  const two = wire2.map(el => el.join(','));

  return one
    .filter(coord => {
      return two.includes(coord);
    })
    .map(el => {
      return [el, one.indexOf(el) + two.indexOf(el)];
    });
}

function findClosest(crossPoints) {
  return crossPoints.sort((a, b) => {
    if (a[1] < b[1]) {
      return -1;
    }
    if (a[1] > b[1]) {
      return +1;
    }
    return 0;
  })[0];
}

const route1 = readWire(wire1);
const route2 = readWire(wire2);

const crossPoints = findCrossPoints(route1, route2);

console.log(findClosest(crossPoints.slice(1)));
