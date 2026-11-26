// Full name: Jubelle Kate Pridas
// Section: IV-BSIT C
// Activity code: N2
// Date: November 27, 2026

const symbols = { add: "+", subtract: "-", multiply: "*", divide: "/" };

function formatResult(operation, numbers, result) {
  if (operation === "average") {
    return `Average of ${numbers.join(", ")} = ${result}`;
  }
  return `${numbers[0]} ${symbols[operation]} ${numbers[1]} = ${result}`;
}

module.exports = { formatResult };
