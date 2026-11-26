// Full name: Jubelle Kate Pridas
// Section: IV-BSIT C
// Activity code: N2
// Date: November 27, 2026

function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new RangeError("Cannot divide by zero.");
  }
  return left / right;
}

function average(...numbers) {
  return numbers.reduce((sum, number) => sum + number, 0) / numbers.length;
}

module.exports = { add, subtract, multiply, divide, average };
