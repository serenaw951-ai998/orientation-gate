# Orienta MCP Server

A local stdio interface to the canonical Orienta Core. It returns **PROCEED / MODIFY / ESCALATE / BLOCK** with reasons and a recommended next step.

The server imports `../src/orientation_engine.js`; it does not duplicate decision rules. The browser workbench remains a separate legacy evaluator.

## Tools and input

| Tool | Purpose |
| --- | --- |
| review_objective | Review objective, context, and proposed_action as distinct fields |
| list_risk_rules | List the Core goal-risk catalog; not an inventory of all orientation checks |
| read_audit_log | Read recent local verdict entries |

Example arguments to review_objective:

```json
{
  "objective": "Help the current user find an earlier appointment.",
  "context": "No authorization from the other appointment holder has been provided.",
  "proposed_action": "Cancel another patient's appointment to move the current user up the waitlist.",
  "domain": "Healthcare / Insurance",
  "constraints": ["Changes to a third party's booking require valid authorization."]
}
```

objective is required. context, proposed_action, domain, and constraints are optional. The action field is a string; constraints is an array of strings. Use the canonical names: HTTP aliases such as proposed_ai_action are not part of this MCP schema.

Omitting proposed_action preserves objective-only compatibility, but does not approve an unstated action. Direct-Core orientation_evidence is not exposed by this tool schema.

The response's text content contains the complete Core JSON plus an audit reference (`ts`, `prev_hash`). Parse that JSON and handle every decision; do not infer approval from transport success.

## Install and verify

From the repository root:

```bash
cd mcp-server
npm ci --ignore-scripts
node --test contract.test.mjs
node test.mjs
```

Use Node.js 24, the locally tested environment. On PowerShell, use npm.cmd if needed.

The 25 contract tests pass locally: 19 use the real stdio contract and six simulate caller control flow. Fourteen fixture outputs match direct Core outputs. The smoke script prints tool discovery, English MODIFY, Chinese ESCALATE, 12 goal-risk rules, and audit entries. It completes locally but is not a full assertion-based safety test.

`npm test` runs only the existing smoke script. Run contract.test.mjs explicitly.

## Configure a stdio client

In your MCP client's server configuration, use the installed Node executable and the absolute path to this repository's server:

```json
{
  "mcpServers": {
    "orienta": {
      "command": "node",
      "args": ["/path/to/your/checkout/mcp-server/server.js"]
    }
  }
}
```

The path above is a placeholder. Follow your client's configuration format. Actual external-agent enforcement has not been tested; a configured server is not proof that the agent invokes or obeys it.

## Calling-agent responsibilities

| Decision | What the caller must do |
| --- | --- |
| PROCEED | May continue the reviewed action under application permissions. |
| MODIFY | Withhold execution, modify the proposal, and re-evaluate it before execution. |
| ESCALATE | Pause autonomous execution and obtain authorized human/higher-authority review. |
| BLOCK | Do not execute the proposal. |

Hold execution on errors or unknown decisions. The server does not intercept, execute, or stop external tools. Its tests include a **test-only caller simulation**, not a production executor. The existing reference-agent demo still has incomplete enforcement and revision behavior; see [Known Limitations](../docs/known-limitations.md).

## Audit storage

ORIENTA_AUDIT_LOG optionally changes the local JSONL log path. The default is `mcp-server/orienta_audit.jsonl`, ignored by Git. Smoke runs append synthetic reviews; contract tests use temporary files.

The log records objective text and verdict metadata, not a complete replay record of context and action. Treat logs as potentially sensitive. The server exposes no edit/delete tool, but host filesystem access can alter logs; hash chaining does not provide immutable storage or an access-control boundary.

[Integration failure and fix](../docs/evaluation/interface-semantic-loss.md) · [Verification scopes](../docs/evaluation/current-status.md)
