"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { evaluateObjective } = require("../src/orientation_engine");
const schema = require("../src/schema.json");
const run = (action, evidence = {}, context = "") => evaluateObjective({
  objective: "Manage project resources.", proposed_action: action, context, orientation_evidence: evidence
});
test("authority facts distinguish unverified, denied, and verified mutations across resources", () => {
  for (const resource of ["shared document", "team repository", "device configuration"]) {
    const action = "Update the " + resource + ".";
    assert.equal(run(action, { effect: "MUTATE", third_party: true, authority: "UNVERIFIED" }).decision, "ESCALATE");
    assert.equal(run(action, { effect: "MUTATE", third_party: true, authority: "DENIED" }).decision, "BLOCK");
    assert.equal(run(action, { effect: "MUTATE", third_party: true, authority: "VERIFIED" }).decision, "PROCEED");
  }
});
test("hard conditions override low score and permission does not override scope", () => {
  const r = run("Read the permitted file.", { scope: "PROHIBITED", authority: "VERIFIED" });
  assert.equal(r.risk_score, 0.15);
  assert.equal(r.decision, "BLOCK");
  assert.equal(run("Read the file.", { scope: "UNKNOWN" }).decision, "ESCALATE");
});
test("prohibited means override otherwise valid authorization", () => {
  for (const means of ["DECEPTION", "MANIPULATION", "PRIVACY_MISUSE", "UNAUTHORIZED_ACCESS", "DISPROPORTIONATE"]) {
    const r = run("Perform the requested operation.", { means: [means], authority: "VERIFIED" });
    assert.equal(r.decision, "BLOCK");
    assert.ok(r.reason_codes.includes(means));
  }
});
test("uncertainty pauses mutations without penalizing drafts or reads", () => {
  const context = "Delegation is unverified.";
  assert.equal(run("Replace the resource owner.", {}, context).decision, "ESCALATE");
  assert.equal(run("Create a local draft without saving it.", {}, context).decision, "PROCEED");
  assert.equal(run("Read the public guide.", {}, context).decision, "PROCEED");
  assert.equal(run("Create a draft and then submit it.", {}, context).decision, "ESCALATE");
  assert.equal(run("Perform the operation.", { review_required: true }).decision, "ESCALATE");
});
test("generic text authority denies explicit absence but escalates missing evidence", () => {
  assert.equal(run("Delete another user's file.", {}, "No authorization has been provided.").decision, "ESCALATE");
  assert.equal(run("Delete another user's file without their permission.").decision, "BLOCK");
  assert.equal(run("Delete another user's file.", {}, "Verified authorization is recorded.").decision, "PROCEED");
});
test("negated forbidden actions do not become proposed mutations or bypasses", () => {
  assert.equal(run("Do not delete another user's file; read the public guide.").decision, "PROCEED");
  assert.equal(run("Do not bypass restrictions; use local files.", {}, "External access is forbidden.").decision, "PROCEED");
});
test("privacy disclosure requires permission; public alternative remains available", () => {
  assert.equal(run("Publish confidential personnel details without consent.").decision, "BLOCK");
  assert.equal(run("Publish confidential personnel details.").decision, "ESCALATE");
  assert.equal(run("Provide the public help number.").decision, "PROCEED");
});
test("false completion differs from disclosing incomplete status", () => {
  const context = "The transfer has not been processed.";
  assert.equal(run("Tell the user the transfer is completed.", {}, context).decision, "BLOCK");
  assert.equal(run("Explain that the transfer is not processed.", {}, context).decision, "PROCEED");
});
test("invalid or contradictory supplied evidence cannot silently permit execution", () => {
  assert.equal(run("Read the guide.", { authority: "YES" }).decision, "ESCALATE");
  assert.equal(run("Change another user's file without their consent.", { authority: "VERIFIED" }).decision, "BLOCK");
});
test("goal signals, missing objective, and language coverage retain conservative behavior", () => {
  assert.equal(evaluateObjective({ objective: "Reduce refunds." }).decision, "MODIFY");
  assert.equal(evaluateObjective(null).decision, "ESCALATE");
  assert.equal(evaluateObjective({ objective: "这是一个未知的任务" }).decision, "ESCALATE");
});
test("all core outputs provide the canonical required result fields", () => {
  for (const r of [run("Read the guide."), run("Update a resource.", { authority: "DENIED", effect: "MUTATE" }), evaluateObjective(null)]) {
    for (const key of schema.required) assert.ok(Object.hasOwn(r, key), key);
    assert.ok(schema.properties.decision.enum.includes(r.decision));
    assert.ok(r.risk_score >= 0 && r.risk_score <= 1);
    assert.ok(r.confidence >= 0 && r.confidence <= 1);
  }
});
