# Repository Navigation

Start at the [README](../README.md). This map separates runtime code, integration boundaries, evidence, and historical ideas; it does not imply every file is a current capability.

## A — Current implementation

- `src/orientation_engine.js`: canonical deterministic evaluator.
- `src/orientation_checks.js`: reusable orientation checks.
- `src/schema.json`: canonical result schema.
- `src/gate_node.js`: offline CLI.

## B — Current review interfaces

- `api/review.js`: HTTP review wrapper with independent action field.
- `mcp-server/server.js`: shared-Core stdio tools.
- `api/feedback.js`: experimental feedback-storage endpoint, not a Core decision interface.

Both review interfaces return decisions. The caller is responsible for execution, revision review, and human handoff.

## C — Evaluation evidence

- `examples/case-library/library.json`: 14 cases.
- `examples/case-library/starter.json`: four-case subset.
- `examples/case-library/schema.json`: fixture validation and migration metadata.
- `scripts/evaluate-cases.js`: runner.
- `scripts/orientation-core.test.js`, `scripts/evaluate-cases.test.js`, `scripts/api-review.test.js`: tests by scope.
- `mcp-server/contract.test.mjs`: stdio and explicitly simulated caller tests.
- `mcp-server/test.mjs`: smoke script.
- `docs/evaluation/reports/`: historical reports; preserve original contents.

[Current result and scope](evaluation/current-status.md) · [Integration lesson](evaluation/interface-semantic-loss.md).

## D — Current documentation

[Architecture](orientation-architecture.md) · [Core input/output](orientation_schema.md) · [Core v0.3 history](orienta-core-v0.3.md) · [API](api/review_api.md) · [MCP](../mcp-server/README.md) · [Limitations](known-limitations.md) · [Experiments](open-experiments.md) · [Cases](use_cases/README.md).

[CONTRIBUTING.md](../CONTRIBUTING.md) and [SECURITY.md](../SECURITY.md) provide collaboration and sensitive-reporting guidance.

## E — Historical material

- `archive/`: earlier HTML demos.
- `demo/`: early specifications and demo concepts.
- `README_Hackathon.md`, `HACKATHON_PROJECT_NARRATIVE.md`, `HACKATHON_NEXT_STEPS.md`, `DEVPOST_MCP_SECTION.md`: event-specific material.
- `Orienta_Chat_v0.1.md`, `docs/product/orienta_v0_1_spec.md`: earlier specifications.
- `docs/demo_results.md`: historical/illustrative narrative; not a reproducible current test report.
- Conceptual capability, runtime, taxonomy, and signal notes are labeled where they exceed current implementation.

Legacy vocabulary in these notes is retained as history, not the current interface. Do not use old numerical illustrations as measured outcomes.

## F — Experimental and legacy implementation

- `index.html`: legacy browser evaluator; separate from shared Core.
- `agent-demo.html` + `api/customer-agent.js`: reference-agent demonstration with known enforcement gaps.
- `customer-support-demo.html`: focused experimental support UI.
- `src/refund_engine.js` + `modules/refund_retention_v0_2.json`: standalone legacy refund module with a different contract.
- Other `examples/*.json` and research case notes: older inputs, snapshots, or hypotheses outside the 14-case suite.

There is no packaged Agent Skill, real consequential-tool executor, or validated human-handoff implementation in this repository.

## Root configuration and entry files

`README.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `LICENSE` are the primary entry files. `package.json`, `vercel.json`, `.env.example`, and `.gitignore` configure the existing project. `project_links.md` lists experimental demos.

No directory rename or file move was needed. `src/`, `scripts/`, and `mcp-server/` remain stable so existing imports and configurations continue to resolve. Removed internal roadmap files are not current navigation targets.
