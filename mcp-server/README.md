# Orienta MCP Server

Pre-execution objective review for AI agents, as an MCP server. Any MCP-capable agent (Claude Desktop, Claude Code, Cursor, custom agents) can call `review_objective` before acting and get a governance verdict: **PROCEED / REVIEW / ADJUST / ESCALATE**.

Wraps the same engine (`src/orientation_engine.js`) that powers the CLI and the [web demo](https://serenaw951-ai998.github.io/orientation-gate/) — one engine, three surfaces.

## Tools

| Tool | What it does |
|---|---|
| `review_objective` | Evaluate an objective (EN + CN) before execution. Returns decision, risk flags, reasoning, suggested reframe. |
| `list_risk_rules` | The 12-rule catalog: id, risk category, severity. |
| `read_audit_log` | Read recent verdicts from the append-only, hash-chained audit log. Read-only by design. |

**Trust boundary:** verdicts are computed server-side and appended to a hash-chained JSONL audit log (`orienta_audit.jsonl`). There is no tool to edit or delete entries — a client cannot override or rewrite history.

## Install (from repo root)

```bash
cd mcp-server
npm install
```

Smoke test:

```bash
node test.mjs
# TOOLS: review_objective, list_risk_rules, read_audit_log
# EN VERDICT: ADJUST [ 'Incentive Distortion' ]
# CN VERDICT: ESCALATE [ 'Manipulation Risk', 'Youth Well-being Risk' ]
```

## Connect to Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "orienta": {
      "command": "node",
      "args": ["/absolute/path/to/orientation-gate/mcp-server/server.js"]
    }
  }
}
```

## Connect to Claude Code

```bash
claude mcp add orienta -- node /absolute/path/to/orientation-gate/mcp-server/server.js
```

Then ask the agent to run a pre-flight check before it adopts a goal:

> Before you start, use orienta's review_objective on: "Minimize refunds issued this quarter"

## Config

- `ORIENTA_AUDIT_LOG` — optional env var to relocate the audit log file.
