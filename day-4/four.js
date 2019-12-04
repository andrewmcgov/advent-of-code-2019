const min = 128392;
const max = 643281;
let current = min;

function hasNoDecreasingDigits(values) {
  let valid = true;

  values.forEach((value, i) => {
    if (i !== 0 && value < values[i - 1]) {
      valid = false;
    }
  });

  return valid;
}

function hasAdjacentEqualDigits(values) {
  let valid = false;

  values.forEach(password => {
    password.forEach((digit, i) => {
      if (
        i !== 0 &&
        digit === password[i - 1] &&
        digit !== password[i - 2] &&
        digit !== password[i + 1]
      ) {
        valid = true;
      }
    });
  });

  return valid;
}

function checkForPasswords() {
  const noDecendingPasswords = [];

  while (current <= max) {
    const values = String(current).split('');
    if (hasNoDecreasingDigits(values)) {
      noDecendingPasswords.push([values]);
    }

    current++;
  }

  const validPasswords = noDecendingPasswords.filter(hasAdjacentEqualDigits);

  console.log(validPasswords.length);
}

checkForPasswords();
