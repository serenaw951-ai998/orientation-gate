/**
 * Minimal Orienta CLI runner.
 *
 * Usage:
 *   node src/gate_node.js examples/customer_support_demo_input.json
 */

const fs = require("fs");
const { evaluateObjective } = require("./orientation_engine.js");

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node src/gate_node.js <input.json>");
  process.exit(1);
}

try {
  const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const result = evaluateObjective(input);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error("Evaluation failed:", error.message);
  process.exit(1);
}
