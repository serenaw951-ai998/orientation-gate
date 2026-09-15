# Orienta core v0.3

## Model

The core now emits **PROCEED / MODIFY / ESCALATE / BLOCK**. Existing incentive/goal risk rules remain supporting signals. Independent authority, scope, means, and unresolved-review checks can override a low risk score.

Precedence: established prohibited boundary (BLOCK), unresolved material authority/scope/review (ESCALATE), correctable goal or means distortion (MODIFY), otherwise PROCEED. Escalation pauses execution; it is not an assertion that the action is prohibited.

The existing [core schema](../src/schema.json) is migrated to the canonical result. Legacy risk flags and triggered-rule IDs remain available alongside reason_codes and safer_objective. Scores/confidence remain heuristic.

## Inputs and implementation limits

Keep `objective`, `context`, `proposed_action`, and `constraints` distinct. The evaluation adapter now preserves these fields instead of flattening the action into context.

The [checks module](../src/orientation_checks.js) extracts reusable evidence about action effect, third-party impact, authority, scope, and means. Optional `orientation_evidence` accepts caller-validated facts:

- authority: VERIFIED / UNVERIFIED / DENIED
- scope: IN_SCOPE / UNKNOWN / PROHIBITED
- effect: READ / DRAFT / MUTATE / DISCLOSE / COMMUNICATE / UNKNOWN
- third_party, private_data, important_uncertainty, review_required: booleans
- means: array of DECEPTION / MANIPULATION / PRIVACY_MISUSE / UNAUTHORIZED_ACCESS / DISPROPORTIONATE

These are caller assertions, not permissions verified by Orienta. They must come from a trusted integration. Invalid or contradictory facts pause execution; an established prohibition cannot be erased by a conflicting claim.

Without structured facts, short English patterns provide limited evidence extraction. This is not a general semantic authorization engine: paraphrases, indirect actions, complex negation, resource attribution, purpose limitation, and multilingual action reasoning remain incomplete. Absence of a detected problem is not proof of legitimate authority.

The original goal-risk catalog remains in place. With explicit actions, goal-risk scanning uses objective plus context/action text; policy constraints are not blindly scanned as if their prohibitions were intended behavior. Without an explicit action, the legacy objective-input path remains available. Do not assume legacy flattened calls receive all new action checks.

## Evaluation on the unchanged library

[Full report](evaluation/reports/2026-09-15T02-57-07-054Z-vFwToJ/results.md) · [Raw JSON](evaluation/reports/2026-09-15T02-57-07-054Z-vFwToJ/results.json)

All 14 Node inputs ran: **12 PASS / 2 FAIL / 0 ERROR**. Fourteen browser rows remain **UNSUPPORTED**; no browser execution is claimed.

| Remaining strict mismatch | Original expected | Core actual |
| --- | --- | --- |
| CS-001-RISK | ADJUST | MODIFY |
| REVIEW-001-RISK | REVIEW | ESCALATE |

The library expectations are unchanged. These are canonical-vocabulary differences and are deliberately still counted as failures, not normalized into passes. Refund/incentive distortion remains detected. The ambiguous third-party mutation returns ESCALATE; the explicitly unauthorized operations return BLOCK. All seven SAFE_PROCEED controls still pass.

| Category | PASS | FAIL | Browser unsupported |
| --- | --- | --- | --- |
| GOAL_DRIFT_AND_MEANS_ENDS | 0 | 1 | 1 |
| SAFE_PROCEED | 7 | 0 | 7 |
| AUTHORITY_AND_PERMISSION | 2 | 0 | 2 |
| SCOPE_BOUNDARY | 1 | 0 | 1 |
| PRIVACY_AND_DATA | 1 | 0 | 1 |
| DECEPTION_AND_MANIPULATION | 1 | 0 | 1 |
| HUMAN_REVIEW_AND_AMBIGUITY | 0 | 1 | 1 |

This is decision-label agreement on author-defined fixtures, not safety accuracy or independent validation. Source baseline: `99d3f60450a4c4e47c53d350d41045baf42f6ac0`; hashes of tested files are recorded in the report.

## Verification and boundary of this milestone

```bash
npm run test:core
npm run test:cases
npm run eval:cases -- --suite examples/case-library/library.json
```

19 unit/runner tests pass. The evaluation command intentionally exits 1 for the two preserved label mismatches.

No new library cases, dependencies, UI, web-demo source, MCP, or Skill functionality were added. No case IDs or case-specific entity names enter the decision logic. API/MCP callers that import the core will receive canonical decisions; their adapters and downstream label handling are not migrated in this milestone. In particular, an adapter that flattens proposed actions must be migrated before relying on these action-level checks. Historical reports remain intact.
