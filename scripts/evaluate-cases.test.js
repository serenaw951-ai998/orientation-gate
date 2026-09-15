"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const suite = require("../examples/case-library/starter.json");
const schema = require("../examples/case-library/schema.json");
const { validateSuite, toNodeInput, evaluateCases, summarize, exitCode, parseArgs } = require("./evaluate-cases");

test("valid suite and invalid vocabulary/metadata are distinguished", () => {
  assert.deepEqual(validateSuite(suite, schema), []);
  const invalid = structuredClone(suite);
  invalid.cases[0].expected_results.node = "INVALID";
  invalid.cases[0].confidence = 0.99;
  assert.ok(validateSuite(invalid, schema).length >= 2);
});
test("duplicate and dangling or nonreciprocal counterexamples are rejected", () => {
  const invalid = structuredClone(suite);
  invalid.cases[1].case_id = invalid.cases[0].case_id;
  assert.ok(validateSuite(invalid, schema).some(e => e.includes("Duplicate")));
  invalid.cases[0].counterexample_id = "MISSING";
  assert.ok(validateSuite(invalid, schema).some(e => e.includes("counterexample")));
});
test("Node projection contains proposed action without mutating source input", () => {
  const input = structuredClone(suite.cases[0].input);
  const copy = structuredClone(input);
  const projected = toNodeInput(input);
  assert.equal(projected.context, input.context + "\n" + input.proposed_action);
  projected.constraints.push("test");
  assert.deepEqual(input, copy);
});
test("unsupported browser never invokes Node; no label mapping", () => {
  const results = evaluateCases(suite, ["browser"], () => { throw new Error("must not run"); });
  assert.ok(results.every(r => r.status === "UNSUPPORTED" && r.actual_decision === null));
  assert.equal(summarize(results).expected_decision_agreement, null);
  assert.equal(exitCode(summarize(results)), 2);
});
test("mismatches and execution errors are kept separate from matches", () => {
  let call = 0;
  const results = evaluateCases(suite, ["node"], () => {
    call++;
    if (call === 3) throw new Error("fixture error");
    if (call === 4) return { decision: "BLOCK" }; // invalid for Node
    return { decision: "PROCEED" };
  });
  assert.deepEqual(results.map(r => r.status), ["FAIL", "PASS", "ERROR", "ERROR"]);
  assert.equal(summarize(results).expected_decision_agreement, 0.5);
  assert.equal(exitCode(summarize(results)), 2);
  assert.equal(exitCode({ ERROR: 0, compared: 2, FAIL: 1 }), 1);
});
test("unknown or incomplete CLI options fail explicitly", () => {
  assert.throws(() => parseArgs(["--surface", "api"]));
  assert.throws(() => parseArgs(["--suite"]));
  assert.throws(() => parseArgs(["--unknown", "value"]));
});
test("CLI writes separate reports on repeated runs and rejects invalid suites", t => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "orienta-eval-test-"));
  t.after(() => fs.rmSync(tmp, { recursive: true, force: true }));
  const script = path.join(__dirname, "evaluate-cases.js");
  const args = [script, "--surface", "node", "--output-dir", tmp];
  const a = spawnSync(process.execPath, args, { encoding: "utf8" });
  const b = spawnSync(process.execPath, args, { encoding: "utf8" });
  assert.ok([0, 1].includes(a.status), a.stderr);
  assert.ok([0, 1].includes(b.status), b.stderr);
  const first = JSON.parse(a.stdout), second = JSON.parse(b.stdout);
  assert.notEqual(first.report_directory, second.report_directory);
  const result = JSON.parse(fs.readFileSync(path.join(first.report_directory, "results.json"), "utf8"));
  assert.equal(result.results.length, 4);
  assert.ok(result.results.every(r => r.actual_result && r.evaluated_input));
  const invalid = path.join(tmp, "invalid.json");
  fs.writeFileSync(invalid, '{"schema_version":"1.0","cases":[]}');
  const c = spawnSync(process.execPath, [script, "--suite", invalid, "--output-dir", tmp], { encoding: "utf8" });
  assert.equal(c.status, 2);
  assert.match(c.stderr, /Invalid case suite/);
});

test("expanded cases validate, preserve original decisions/inputs, and report gaps", () => {
  const expanded = require("../examples/case-library/library.json");
  assert.equal(expanded.cases.length, 14);
  assert.deepEqual(validateSuite(expanded, schema), []);
  for (const old of suite.cases) {
    const current = expanded.cases.find(c => c.case_id === old.case_id);
    assert.deepEqual(current.input, old.input);
    assert.deepEqual(current.expected_results, old.expected_results);
  }
  const invalid = structuredClone(expanded);
  invalid.cases[0].category = "UNKNOWN";
  assert.ok(validateSuite(invalid, schema).length);
  delete invalid.cases[0].input.proposed_action;
  assert.ok(validateSuite(invalid, schema).some(e => e.includes("required")));
  const results = evaluateCases(expanded, ["node", "browser"]);
  assert.equal(results.length, 28);
  assert.equal(results.filter(r => r.status === "UNSUPPORTED").length, 14);
  const missed = results.find(r => r.case_id === "AUTH-001-RISK" && r.evaluator_surface === "node");
  assert.equal(missed.actual_decision, "PROCEED");
  assert.equal(missed.status, "FAIL");
  const scope = results.find(r => r.case_id === "SCOPE-001-RISK" && r.evaluator_surface === "node");
  assert.equal(scope.expected_decision, "BLOCK");
  assert.equal(scope.status, "FAIL");
});
