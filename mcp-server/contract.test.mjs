import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const require = createRequire(import.meta.url);
const { evaluateObjective } = require("../src/orientation_engine.js");
const suite = require("../examples/case-library/library.json");
const directory = path.dirname(fileURLToPath(import.meta.url));
let client, temporary, auditPath;
before(async () => {
  temporary = fs.mkdtempSync(path.join(os.tmpdir(), "orienta-mcp-contract-"));
  auditPath = path.join(temporary, "audit.jsonl");
  client = new Client({ name: "orienta-contract-test", version: "1.0.0" });
  await client.connect(new StdioClientTransport({
    command: process.execPath,
    args: [path.join(directory, "server.js")],
    env: { ...process.env, ORIENTA_AUDIT_LOG: auditPath }
  }));
});
after(async () => {
  await client?.close();
  if (auditPath && fs.existsSync(auditPath)) fs.unlinkSync(auditPath);
  if (temporary) fs.rmdirSync(temporary);
});
async function review(input) {
  const response = await client.callTool({ name: "review_objective", arguments: input });
  assert.notEqual(response.isError, true);
  const result = JSON.parse(response.content[0].text);
  const { audit, ...core } = result;
  assert.equal(typeof audit.ts, "string");
  return core;
}
const inputFor = id => structuredClone(suite.cases.find(c => c.case_id === id).input);

test("advertised MCP contract includes an optional independent action and canonical semantics", async () => {
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map(t => t.name).sort(), ["list_risk_rules", "read_audit_log", "review_objective"]);
  const tool = tools.find(t => t.name === "review_objective");
  assert.equal(tool.inputSchema.properties.proposed_action?.type, "string");
  assert.ok(!tool.inputSchema.required.includes("proposed_action"));
  for (const decision of ["PROCEED", "MODIFY", "ESCALATE", "BLOCK"]) {
    assert.ok(tool.description.includes(decision));
  }
  assert.doesNotMatch(tool.description, /\b(?:ADJUST|REVIEW)\b/);
  assert.match(tool.description, /calling agent/i);
});
for (const fixture of suite.cases) {
  test("real MCP transport preserves complete Core output: " + fixture.case_id, async () => {
    const actual = await review(fixture.input);
    assert.equal(actual.decision, fixture.expected_results.node);
    assert.deepEqual(actual, evaluateObjective(fixture.input));
  });
}
test("objective-only clients keep the same Core result", async () => {
  const input = { objective: "Summarize a public document." };
  assert.deepEqual(await review(input), evaluateObjective(input));
});
test("invalid action type is rejected by MCP schema", async () => {
  const input = { objective: "Summarize a public document.", proposed_action: 42 };
  try {
    const result = await client.callTool({ name: "review_objective", arguments: input });
    assert.equal(result.isError, true);
  } catch (error) {
    assert.match(error.message, /proposed_action|validation|invalid/i);
  }
});
test("a caller-supplied decision cannot override BLOCK", async () => {
  const actual = await review({ ...inputFor("AUTH-002-RISK"), decision: "PROCEED" });
  assert.equal(actual.decision, "BLOCK");
});
test("risk catalog and audit-log tools still work", async () => {
  const catalog = await client.callTool({ name: "list_risk_rules", arguments: {} });
  const rules = JSON.parse(catalog.content[0].text);
  assert.ok(rules.rule_count > 0);
  const log = await client.callTool({ name: "read_audit_log", arguments: { limit: 2 } });
  const data = JSON.parse(log.content[0].text);
  assert.equal(data.entries, 2);
  assert.ok(data.log.every(entry => ["PROCEED", "MODIFY", "ESCALATE", "BLOCK"].includes(entry.decision)));
});

// TEST-ONLY calling-agent simulation. The MCP server supplies decisions and has
// no execution callback. These tests do not validate an external agent or the
// API customer-agent demo. Only the spy below represents consequential execution.
async function simulateCaller(initial, revise) {
  let proposal = initial;
  const decisions = [];
  const executed = [];
  for (let attempt = 0; attempt < 2; attempt++) {
    const verdict = await review(proposal);
    decisions.push(verdict.decision);
    if (verdict.decision === "PROCEED") {
      executed.push(structuredClone(proposal));
      break;
    }
    if (verdict.decision !== "MODIFY" || !revise || attempt === 1) break;
    proposal = await revise(proposal, verdict);
  }
  return { decisions, executed };
}
test("simulated caller executes a PROCEED proposal once", async () => {
  const input = inputFor("AUTH-002-BENIGN");
  const result = await simulateCaller(input);
  assert.deepEqual(result.decisions, ["PROCEED"]);
  assert.deepEqual(result.executed, [input]);
});
test("simulated caller re-reviews a modified proposal before execution", async () => {
  const corrected = inputFor("CS-001-BENIGN");
  const result = await simulateCaller(inputFor("CS-001-RISK"), async () => corrected);
  assert.deepEqual(result.decisions, ["MODIFY", "PROCEED"]);
  assert.deepEqual(result.executed, [corrected]);
});
test("simulated caller does not execute an unchanged MODIFY proposal", async () => {
  const result = await simulateCaller(inputFor("CS-001-RISK"), async input => input);
  assert.deepEqual(result.decisions, ["MODIFY", "MODIFY"]);
  assert.deepEqual(result.executed, []);
});
for (const [id, decision] of [["AUTH-001-RISK", "ESCALATE"], ["AUTH-002-RISK", "BLOCK"]]) {
  test("simulated caller executes nothing for " + decision, async () => {
    const result = await simulateCaller(inputFor(id), async () => {
      assert.fail("Must not rewrite an escalation or a blocked action");
    });
    assert.deepEqual(result.decisions, [decision]);
    assert.deepEqual(result.executed, []);
  });
}
test("simulated caller does not execute a revision that becomes BLOCK", async () => {
  const result = await simulateCaller(inputFor("CS-001-RISK"), async () => inputFor("AUTH-002-RISK"));
  assert.deepEqual(result.decisions, ["MODIFY", "BLOCK"]);
  assert.deepEqual(result.executed, []);
});
