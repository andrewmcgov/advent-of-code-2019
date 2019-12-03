const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split(',')
  .map(val => Number(val));

let position = 0;
let running = true;
let arg1 = 0;
let arg2 = 0;

function getValues(program) {
  return {
    a: program[program[position + 1]],
    b: program[program[position + 2]],
    destination: program[position + 3]
  };
}

function processOptcode(program) {
  const opcode = program[position];
  if (opcode === 1) {
    const {a, b, destination} = getValues(program);
    program[destination] = a + b;
  } else if (opcode === 2) {
    const {a, b, destination} = getValues(program);
    program[destination] = a * b;
  } else {
    running = false;
  }

  if (running) {
    position += 4;
    processOptcode(program);
  }

  return program[0];
}

function incrementArgs() {
  if (arg2 >= 99) {
    arg2 = 0;
    arg1++;
  } else {
    arg2++;
  }
}

function findOutput() {
  const program = [...input];
  program[1] = arg1;
  program[2] = arg2;

  const output = processOptcode(program);

  if (output === 19690720) {
    console.log(100 * arg1 + arg2);
  } else {
    incrementArgs();
    position = 0;
    running = true;

    if (arg1 > 99) {
      return null;
    }
    process.nextTick(() => findOutput());
  }
}

findOutput;
