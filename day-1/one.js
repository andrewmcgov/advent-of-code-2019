const fs = require('fs');

function calculateFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

function getTotalFuel(mass) {
  const fuelMass = calculateFuel(mass);
  return fuelMass > 0 ? fuelMass + getTotalFuel(fuelMass) : 0;
}

const moduleMasses = fs.readFileSync('input.txt', 'utf8').split('\n');

const total = moduleMasses.map(getTotalFuel).reduce((acc, cur) => acc + cur);

console.log(total);
