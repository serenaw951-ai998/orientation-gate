# Known Limitations

This document describes the current repository, not a production safety certification. See [verification scopes](evaluation/current-status.md).

## Decision versus enforcement

Orienta returns a decision and supporting information. It does not intercept tools, verify resource ownership against a permission service, or force an external agent to stop. The calling system must enforce PROCEED / MODIFY / ESCALATE / BLOCK, hold errors/unknown decisions, and bind the reviewed proposal to the action actually executed.

Real external-agent enforcement has not been validated. The MCP caller tests are explicit simulations, not a test of Claude, another agent framework, or real business tools.

## Reference agent

`api/customer-agent.js` and `agent-demo.html` remain experimental:

- All non-PROCEED decisions enter a generic rewrite branch.
- BLOCK has no independent stop branch.
- MODIFY revisions are not re-evaluated.
- ESCALATE returns a human-review status label but implements no real human handoff.
- A final reply is generated/returned even for non-PROCEED results.
- The example does not invoke consequential real-world tools.
- Its own evaluation-input builder still combines the draft with context. The fix to `api/review.js` does not fix this separate reference-agent adapter.

These findings were inspected and reproduced using isolated stubs for Core decisions, model generation, and storage. No production incident or real tool execution is claimed. The reference agent was intentionally not changed during API/MCP boundary fixes.

## Core evidence and coverage

The Core uses deterministic patterns and heuristic risk/confidence values. It can miss paraphrases, misunderstand negation or ownership, and over-flag benign language. Partial Chinese goal patterns do not establish complete multilingual action reasoning.

Optional direct-Core `orientation_evidence` contains caller-validated assertions. Orienta does not authenticate these assertions. The current HTTP/MCP adapters do not expose that complete structured-evidence interface; use their documented fields, not assumed passthrough properties.

A PROCEED decision means no material issue was detected in the supplied input, not that authorization or safety has been proved.

## Evaluation limits

The 14-case suite is small, author-defined, and not an independent benchmark. Expected-label agreement is not safety accuracy, production validation, customer adoption, or explanation quality. Seven safe controls are included in the 14, not additional cases.

Browser evaluation is unsupported in the runner. Existing browser expectations are policy targets, not browser observations; AUTH-001-RISK still has different Node/browser expectations. No expectation was changed in documentation finalization.

## Demos and data handling

`index.html` contains a separate legacy evaluator and uses ALLOW / REVISE / ESCALATE / BLOCK. It has not been aligned with the canonical shared Core. Old preset observations apply only to their recorded surface and date.

On an HTTP host, the workbench attempts an asynchronous request to `/api/review`; a static Pages host does not supply that API. The Vercel handler stores the original request in MongoDB and, when GEMINI_API_KEY is configured, sends input for supplemental model analysis. Opening the HTML as a local file skips that audit request.

Use synthetic inputs. Do not paste credentials, private conversations, or customer data into hosted demos. A clear in-product data notice, retention policy, deployment safeguards, and live service validation remain open work; documentation does not supply those controls.

## Operational limits

Local API tests use stubbed MongoDB; three use a local HTTP wrapper around the handler, not Vercel deployment infrastructure. MCP stdio tests execute the real local server, with temporary audit files.

MCP audit logs contain objective text. A hash chain is not tamper-proof storage against someone controlling the host; the current smoke test does not certify integrity or access controls. The risk-catalog tool lists the goal-risk catalog, not every orientation check.

The repository has no CI workflow or root package lockfile. Package metadata remains v0.1.0 while the Core identifies v0.3; use commit hashes and test scopes for provenance.
