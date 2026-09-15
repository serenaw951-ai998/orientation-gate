"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { evaluateObjective } = require("../src/orientation_engine");

const ROOT = path.resolve(__dirname, "..");
const DECISIONS = {
  node: ["PROCEED", "REVIEW", "ADJUST", "ESCALATE"],
  browser: ["ALLOW", "REVISE", "ESCALATE", "BLOCK"]
};
const hash = value => crypto.createHash("sha256").update(value).digest("hex");

// Implements only the keywords used by the bundled schema; not a general JSON Schema library.
function validateShape(value, schema, location = "$") {
  const errors = [];
  const type = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;
  if (schema.type && type !== schema.type) return [location + ": expected " + schema.type];
  if (schema.enum && !schema.enum.includes(value)) errors.push(location + ": invalid enum value");
  if (type === "string") {
    if (schema.minLength && value.trim().length < schema.minLength) errors.push(location + ": empty string");
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push(location + ": invalid pattern");
  }
  if (type === "array") {
    if (schema.minItems && value.length < schema.minItems) errors.push(location + ": too few items");
    value.forEach((item, i) => errors.push(...validateShape(item, schema.items, location + "[" + i + "]")));
  }
  if (type === "object") {
    for (const key of schema.required || []) {
      if (!Object.hasOwn(value, key)) errors.push(location + "." + key + ": required");
    }
    for (const [key, item] of Object.entries(value)) {
      if (schema.properties && Object.hasOwn(schema.properties, key)) {
        errors.push(...validateShape(item, schema.properties[key], location + "." + key));
      } else if (schema.additionalProperties === false) errors.push(location + "." + key + ": unknown property");
    }
  }
  return errors;
}
function validateSuite(suite, schema) {
  const errors = validateShape(suite, schema);
  if (errors.length) return errors;
  const byId = new Map();
  for (const c of suite.cases) {
    if (byId.has(c.case_id)) errors.push("Duplicate case_id: " + c.case_id);
    byId.set(c.case_id, c);
  }
  for (const c of suite.cases) {
    const other = byId.get(c.counterexample_id);
    if (!other || other === c || other.counterexample_id !== c.case_id) {
      errors.push(c.case_id + ": counterexample must exist and link back to a different case");
    }
  }
  return errors;
}
function toNodeInput(input) {
  // Text projection only. No browser extraction, policy inference, or decision remapping.
  return {
    objective: input.objective,
    context: [input.context, input.proposed_action].join("\n"),
    domain: input.domain,
    constraints: [...input.constraints]
  };
}
function evaluateCases(suite, surfaces, evaluator = evaluateObjective) {
  const results = [];
  for (const c of suite.cases) {
    for (const surface of surfaces) {
      const row = {
        case_id: c.case_id,
        category: c.category,
        expected_reason_codes: c.expected_reason_codes || [],
        counterexample_id: c.counterexample_id,
        evaluator_surface: surface,
        expected_decision: c.expected_results[surface],
        policy_basis: c.policy_basis,
        expectation_basis: c.expectation_basis,
        fixture_input: c.input,
        actual_decision: null,
        actual_result: null
      };
      if (surface !== "node") {
        results.push({ ...row, status: "UNSUPPORTED", evaluated_input: null,
          reason: "No browser adapter is implemented. Node output cannot establish browser behavior." });
        continue;
      }
      const input = toNodeInput(c.input);
      try {
        const actual = evaluator(input);
        if (!actual || !DECISIONS.node.includes(actual.decision)) throw new Error("Evaluator returned an invalid Node decision");
        results.push({ ...row, evaluated_input: input, actual_decision: actual.decision, actual_result: actual,
          status: actual.decision === row.expected_decision ? "PASS" : "FAIL" });
      } catch (error) {
        results.push({ ...row, evaluated_input: input, status: "ERROR", reason: String(error.message || error) });
      }
    }
  }
  return results;
}
function summarize(results) {
  const counts = { PASS: 0, FAIL: 0, UNSUPPORTED: 0, ERROR: 0 };
  for (const r of results) counts[r.status]++;
  const compared = counts.PASS + counts.FAIL;
  return { ...counts, compared, expected_decision_agreement: compared ? counts.PASS / compared : null };
}
function byCategory(results) {
  const groups = {};
  for (const r of results) (groups[r.category] ||= []).push(r);
  return Object.fromEntries(Object.entries(groups).map(([category, rows]) => [category, summarize(rows)]));
}
function exitCode(summary) {
  return summary.ERROR || !summary.compared ? 2 : summary.FAIL ? 1 : 0;
}
function markdown(report) {
  const cell = value => String(value ?? "—").replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ");
  const s = report.summary;
  return [
    "# Orienta Case Evaluation",
    "",
    "Generated: " + report.run_at,
    "",
    "This measures agreement with author-defined policy expectations, not safety accuracy, customer outcomes, or independent reviewer judgments.",
    "",
    "Node evaluations use a text projection of context and proposed action. Browser rows are not executed. They are not inferred from Node results.",
    "",
    "| Case | Surface | Expected | Actual | Status |",
    "| --- | --- | --- | --- | --- |",
    ...report.results.map(r => "| " + [r.case_id, r.evaluator_surface, r.expected_decision, r.actual_decision, r.status].map(cell).join(" | ") + " |"),
    "",
    "Compared: " + s.compared + "; matched: " + s.PASS + "; mismatched: " + s.FAIL + "; unsupported: " + s.UNSUPPORTED + "; errors: " + s.ERROR + ".",
    "",
    "Expected-decision agreement: " + (s.expected_decision_agreement === null ? "not available" : (100 * s.expected_decision_agreement).toFixed(1) + "%") + " (PASS / (PASS + FAIL); unsupported rows and errors are excluded and shown separately).",
    "",
    "A PASS only checks the decision label. It does not validate reasoning, authorization, or revision quality.",
    "",
    "## Results by category",
    "",
    "| Category | Matched | Mismatched | Unsupported | Errors |",
    "| --- | --- | --- | --- | --- |",
    ...Object.entries(report.by_category).map(([c, n]) => "| " + [c, n.PASS, n.FAIL, n.UNSUPPORTED, n.ERROR].map(cell).join(" | ") + " |"),
    "",
    "Reason codes are expectation annotations only; they are not scored. BLOCK and REVIEW expectations are retained even where a surface cannot emit them.",
    "",
    "## Provenance",
    "",
    "- Node runtime: " + report.node_version,
    "- Engine SHA-256: " + report.engine_sha256,
    "- Suite SHA-256: " + report.suite_sha256,
    "- Schema SHA-256: " + report.schema_sha256,
    "- Runner SHA-256: " + report.runner_sha256,
    "",
    "The matching JSON report preserves exact projected inputs, raw evaluator results (including evaluator_version), expectations, and error/unsupported reasons.",
    ""
  ].join("\n");
}
function parseArgs(argv) {
  const options = { suite: path.join(ROOT, "examples/case-library/starter.json"), surface: "all", outputDir: path.join(ROOT, "eval-runs") };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    const key = { "--suite": "suite", "--surface": "surface", "--output-dir": "outputDir" }[flag];
    if (!key || !argv[i + 1] || argv[i + 1].startsWith("--")) throw new Error("Usage: node scripts/evaluate-cases.js [--suite file] [--surface all|node|browser] [--output-dir directory]");
    options[key] = argv[++i];
  }
  if (!["all", "node", "browser"].includes(options.surface)) throw new Error("Unknown surface: " + options.surface);
  return options;
}
function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const suiteRaw = fs.readFileSync(options.suite, "utf8");
  const schemaRaw = fs.readFileSync(path.join(ROOT, "examples/case-library/schema.json"), "utf8");
  const suite = JSON.parse(suiteRaw.replace(/^\uFEFF/, ""));
  const schema = JSON.parse(schemaRaw);
  const errors = validateSuite(suite, schema);
  if (errors.length) throw new Error("Invalid case suite:\n" + errors.join("\n"));
  const surfaces = options.surface === "all" ? ["node", "browser"] : [options.surface];
  const results = evaluateCases(suite, surfaces);
  const report = {
    report_version: "1.0", run_at: new Date().toISOString(), node_version: process.version,
    engine_sha256: hash(fs.readFileSync(path.join(ROOT, "src/orientation_engine.js"))),
    suite_sha256: hash(suiteRaw), schema_sha256: hash(schemaRaw), runner_sha256: hash(fs.readFileSync(__filename)),
    summary: summarize(results), by_category: byCategory(results), results
  };
  // Each run gets a distinct directory. Never replace a previous report.
  fs.mkdirSync(options.outputDir, { recursive: true });
  const dir = fs.mkdtempSync(path.join(path.resolve(options.outputDir), report.run_at.replace(/[:.]/g, "-") + "-"));
  fs.writeFileSync(path.join(dir, "results.json"), JSON.stringify(report, null, 2) + "\n", { flag: "wx" });
  fs.writeFileSync(path.join(dir, "results.md"), markdown(report), { flag: "wx" });
  console.log(JSON.stringify({ report_directory: dir, ...report.summary }, null, 2));
  return exitCode(report.summary);
}
if (require.main === module) {
  try { process.exitCode = main(); }
  catch (error) { console.error(error.message); process.exitCode = 2; }
}
module.exports = { validateShape, validateSuite, toNodeInput, evaluateCases, summarize, exitCode, markdown, parseArgs };
