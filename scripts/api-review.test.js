"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const http = require("node:http");
const { evaluateObjective } = require("../src/orientation_engine");
const suite = require("../examples/case-library/library.json");

// Run the real handler and Core. Stub only storage; never use production
// credentials, write an audit log, or call a model provider in these tests.
function loadHandler() {
  const records = [];
  const inputs = [];
  class MongoClient {
    async connect() {}
    db() {
      return {
        command: async () => ({ ok: 1 }),
        collection: () => ({
          insertOne: async record => {
            records.push(record);
            return { insertedId: "test-audit-id" };
          }
        })
      };
    }
  }
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../api/review.js"), "utf8"), {
    module,
    process: { env: { MONGODB_URI: "test-storage-stub" } },
    require(id) {
      if (id === "mongodb") return { MongoClient };
      if (id === "../src/orientation_engine") return {
        evaluateObjective(input) {
          inputs.push(JSON.parse(JSON.stringify(input)));
          return evaluateObjective(input);
        }
      };
      throw new Error("Unexpected dependency: " + id);
    },
    fetch() { throw new Error("Model/network calls must not occur"); }
  }, { filename: "api/review.js" });
  return { handler: module.exports, records, inputs };
}
async function review(body) {
  const loaded = loadHandler();
  let status, output;
  await loaded.handler({ method: "POST", body }, {
    setHeader() {},
    status(code) { status = code; return this; },
    json(value) { output = JSON.parse(JSON.stringify(value)); },
    end() {}
  });
  assert.equal(status, 200);
  assert.equal(loaded.records.length, 1);
  return { ...loaded, output };
}

for (const fixture of suite.cases) {
  test("API preserves full direct Core output: " + fixture.case_id, async () => {
    const original = structuredClone(fixture.input);
    const { output, inputs } = await review(original);
    assert.equal(output.decision, fixture.expected_results.node);
    assert.deepEqual(output.baseline, evaluateObjective(fixture.input));
    assert.equal(inputs[0].objective, fixture.input.objective);
    assert.equal(inputs[0].context, fixture.input.context);
    assert.equal(inputs[0].proposed_action, fixture.input.proposed_action);
    assert.deepEqual(original, fixture.input);
  });
}
for (const alias of ["proposed_ai_action", "proposed_reply"]) {
  test("legacy action alias reaches independent Core action: " + alias, async () => {
    const fixture = suite.cases.find(c => c.case_id === "AUTH-002-RISK");
    const { proposed_action, ...input } = fixture.input;
    const { output, inputs } = await review({ ...input, [alias]: proposed_action });
    assert.equal(inputs[0].proposed_action, proposed_action);
    assert.deepEqual(output.baseline, evaluateObjective(fixture.input));
  });
}
test("canonical action takes precedence over legacy aliases without polluting context", async () => {
  const input = {
    objective: "Summarize a public document.",
    context: "Public reference material.",
    customer_message: "Summarize the introduction.",
    user_message: "Use three sentences.",
    proposed_action: "Draft a summary.",
    proposed_ai_action: "Legacy draft.",
    proposed_reply: "Older draft."
  };
  const { inputs } = await review(input);
  assert.equal(inputs[0].proposed_action, input.proposed_action);
  assert.equal(inputs[0].context, [input.context, input.customer_message, input.user_message].join(" "));
});
for (const alias of ["business_goal", "goal"]) {
  test("objective-only legacy request retains direct Core behavior: " + alias, async () => {
    const { output, inputs } = await review({
      [alias]: "Summarize a public document.", customer_message: "Public reference."
    });
    assert.equal(inputs[0].objective, "Summarize a public document.");
    assert.equal(inputs[0].context, "Public reference.");
    assert.deepEqual(output.baseline, evaluateObjective({
      objective: "Summarize a public document.", context: "Public reference.",
      domain: "General", constraints: []
    }));
  });
}
test("client-reported PROCEED cannot override authoritative BLOCK", async () => {
  const fixture = suite.cases.find(c => c.case_id === "AUTH-002-RISK");
  const { output } = await review({
    ...fixture.input, local_orienta_result: { decision: "PROCEED" }
  });
  assert.equal(output.decision, "BLOCK");
  assert.equal(output.baseline.client_backend_divergence, true);
});

for (const id of ["AUTH-001-RISK", "AUTH-002-RISK", "SCOPE-001-RISK"]) {
  test("local HTTP POST /api/review (storage stub): " + id, async t => {
    const fixture = suite.cases.find(c => c.case_id === id);
    const { handler } = loadHandler();
    const server = http.createServer(async (req, res) => {
      try {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        req.body = Buffer.concat(chunks).toString("utf8");
        res.status = code => { res.statusCode = code; return res; };
        res.json = value => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(value));
        };
        await handler(req, res);
      } catch (error) {
        res.statusCode = 500;
        res.end(error.message);
      }
    });
    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    t.after(() => new Promise(resolve => {
      server.close(resolve);
      server.closeAllConnections();
    }));
    const response = await fetch("http://127.0.0.1:" + server.address().port + "/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fixture.input)
    });
    assert.equal(response.status, 200);
    const output = await response.json();
    assert.equal(output.decision, fixture.expected_results.node);
    assert.deepEqual(output.baseline, evaluateObjective(fixture.input));
  });
}
