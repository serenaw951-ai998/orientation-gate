#!/usr/bin/env node
/**
 * Orienta MCP Server v0.1
 *
 * Exposes the Orienta pre-execution governance gate as an MCP server,
 * so any MCP-capable agent (Claude Desktop, Claude Code, Cursor, custom
 * agents) can run a pre-flight objective review before acting.
 *
 * Tools:
 *   - review_objective : evaluate an objective BEFORE execution
 *   - list_risk_rules  : list the risk rule catalog (id, risk, severity)
 *   - read_audit_log   : read recent verdicts from the append-only audit log
 *
 * Trust boundary: the verdict is computed server-side and every verdict is
 * appended to a hash-chained audit log. Clients cannot override or rewrite
 * past verdicts through this interface.
 *
 * Usage:
 *   node mcp-server/server.js            (stdio transport)
 */

import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// The engine is CommonJS; load it via createRequire so we reuse the exact
// same code that powers the CLI and the web demo — one engine, three surfaces.
const require = createRequire(import.meta.url);
const engineModule = require("../src/orientation_engine.js");
const { evaluateObjective } = engineModule;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Append-only, hash-chained audit log (JSONL)
// Each entry contains the SHA-256 of the previous entry, so any tampering
// with history breaks the chain and is detectable.
// ---------------------------------------------------------------------------
const AUDIT_LOG_PATH =
  process.env.ORIENTA_AUDIT_LOG || path.join(__dirname, "orienta_audit.jsonl");

function lastAuditHash() {
  try {
    const lines = fs
      .readFileSync(AUDIT_LOG_PATH, "utf8")
      .trim()
      .split("\n")
      .filter(Boolean);
    if (!lines.length) return "GENESIS";
    return createHash("sha256").update(lines[lines.length - 1]).digest("hex");
  } catch {
    return "GENESIS";
  }
}

function appendAudit(entry) {
  const record = {
    ts: new Date().toISOString(),
    prev_hash: lastAuditHash(),
    ...entry
  };
  fs.appendFileSync(AUDIT_LOG_PATH, JSON.stringify(record) + "\n", "utf8");
  return record;
}

function readAudit(limit) {
  try {
    const lines = fs
      .readFileSync(AUDIT_LOG_PATH, "utf8")
      .trim()
      .split("\n")
      .filter(Boolean);
    return lines.slice(-limit).map((line) => JSON.parse(line));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// MCP server
// ---------------------------------------------------------------------------
const server = new McpServer({
  name: "orienta",
  version: "0.1.0"
});

server.registerTool(
  "review_objective",
  {
    title: "Orienta pre-flight objective review",
    description:
      "Run this BEFORE executing a task or adopting a goal. Evaluates an AI " +
      "agent objective for structural risk (incentive distortion, manipulation, " +
      "youth safety, dependency formation, etc.) and returns a governance " +
      "decision: PROCEED, REVIEW, ADJUST, or ESCALATE, with reasoning and a " +
      "suggested reframe. Supports English and Chinese objectives. The verdict " +
      "is computed server-side and recorded in an append-only audit log; it " +
      "cannot be overridden by the caller.",
    inputSchema: {
      objective: z
        .string()
        .describe(
          "The objective or goal the agent is about to pursue, as written. " +
            'e.g. "Minimize refunds issued this quarter" or "提高青少年用户的使用时长"'
        ),
      context: z
        .string()
        .optional()
        .describe(
          "Optional surrounding context: who the agent serves, KPIs, deployment setting."
        ),
      domain: z
        .string()
        .optional()
        .describe('Optional domain label, e.g. "Customer Support", "EdTech".'),
      constraints: z
        .array(z.string())
        .optional()
        .describe("Optional list of constraints already attached to the objective.")
    }
  },
  async ({ objective, context, domain, constraints }) => {
    const verdict = evaluateObjective({
      objective,
      context: context || "",
      domain: domain || "General",
      constraints: constraints || []
    });

    const audited = appendAudit({
      type: "verdict",
      objective,
      decision: verdict.decision,
      risk_score: verdict.risk_score,
      risk_flags: verdict.risk_flags,
      evaluator_version: verdict.evaluator_version
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { ...verdict, audit: { ts: audited.ts, prev_hash: audited.prev_hash } },
            null,
            2
          )
        }
      ]
    };
  }
);

server.registerTool(
  "list_risk_rules",
  {
    title: "List Orienta risk rules",
    description:
      "Returns the catalog of risk rules the gate evaluates against: rule id, " +
      "risk category, severity, and whether co-occurrence context is required. " +
      "Useful for understanding what the gate screens for.",
    inputSchema: {}
  },
  async () => {
    // RISK_RULES is internal to the engine; derive the catalog by probing the
    // exported matcher would be brittle, so read it from the source of truth.
    const source = fs.readFileSync(
      path.join(__dirname, "../src/orientation_engine.js"),
      "utf8"
    );
    const rules = [];
    const ruleRegex =
      /id:\s*"([^"]+)"[\s\S]*?risk:\s*"([^"]+)"[\s\S]*?severity:\s*([\d.]+)/g;
    let match;
    while ((match = ruleRegex.exec(source)) !== null) {
      rules.push({
        id: match[1],
        risk: match[2],
        severity: Number(match[3])
      });
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ rule_count: rules.length, rules }, null, 2)
        }
      ]
    };
  }
);

server.registerTool(
  "read_audit_log",
  {
    title: "Read Orienta audit log",
    description:
      "Read the most recent entries from the append-only, hash-chained audit " +
      "log of past verdicts. Read-only: there is no tool to edit or delete entries.",
    inputSchema: {
      limit: z
        .number()
        .int()
        .min(1)
        .max(100)
        .optional()
        .describe("How many recent entries to return (default 10).")
    }
  },
  async ({ limit }) => {
    const entries = readAudit(limit || 10);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ entries: entries.length, log: entries }, null, 2)
        }
      ]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
