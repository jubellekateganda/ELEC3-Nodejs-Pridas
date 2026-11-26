// Full name: Jubelle Kate Pridas
// Section: IV-BSIT C
// Activity code: N2
// Date: November 27, 2026

const path = require("node:path");
const operations = require("./operations");
const { formatResult } = require("./formatter");

function main() {
  const [operation, ...inputs] = process.argv.slice(2);
  const usage = `Usage: node ${path.basename(process.argv[1])} <add|subtract|multiply|divide|average> <numbers>`;

  if (!operation || !Object.hasOwn(operations, operation)) {
    console.error(
      operation ? `Unknown operation: ${operation}` : "Enter an operation.",
    );
    console.error(usage);
    return 1;
  }

  // Average accepts a list. The other operations use exactly two numbers.
  if (operation === "average" ? inputs.length === 0 : inputs.length !== 2) {
    console.error(
      operation === "average"
        ? "Average needs at least one number."
        : "Enter exactly two numbers.",
    );
    return 1;
  }

  const numbers = inputs.map(Number);
  if (
    inputs.some((input) => input.trim() === "") ||
    !numbers.every(Number.isFinite)
  ) {
    console.error("Enter valid finite numbers.");
    return 1;
  }

  try {
    const result = operations[operation](...numbers);
    if (!Number.isFinite(result)) {
      throw new RangeError("The result is outside the supported number range.");
    }
    console.log(formatResult(operation, numbers, result));
    return 0;
  } catch (error) {
    if (!(error instanceof RangeError)) {
      throw error;
    }
    console.error(error.message);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main();
}
