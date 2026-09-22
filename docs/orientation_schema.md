# Current Core Input and Output

The canonical vocabulary is **PROCEED / MODIFY / ESCALATE / BLOCK**. The machine-readable [output schema](../src/schema.json) is authoritative for result structure; the [case schema](../examples/case-library/schema.json) is a separate evaluation envelope.

## Inputs

| Field | Intended use |
| --- | --- |
| objective | The objective as written |
| context | Relevant surrounding facts and policy context |
| proposed_action | The specific proposed action or reply, independently supplied |
| domain | Optional domain label |
| constraints | Optional list of applicable constraints |

HTTP and MCP guides document their accepted types, aliases, and defaults. Do not fold the action into context or assume a review of an objective authorizes an unstated action.

Direct Core optionally accepts orientation_evidence containing caller-validated facts; see [Core details](orienta-core-v0.3.md). These assertions are not authenticated permissions, and the current HTTP/MCP adapters do not expose the whole direct-Core input surface.

## Output

| Field | Meaning |
| --- | --- |
| decision | PROCEED, MODIFY, ESCALATE, or BLOCK |
| risk_score | Supporting heuristic risk signal |
| confidence | Heuristic evaluator confidence |
| reason_codes | Machine-readable reasons |
| reasoning | Explanatory strings |
| recommended_action | Suggested next step |
| safer_objective | Returned safer direction where applicable |

Existing fields such as objective, domain, risk_flags, triggered_rules, evaluator_version, and orientation_evidence remain part of current Core output. No second schema is introduced by this guide.

PROCEED permits continuation of the reviewed action under application permissions. MODIFY requires correction and review before execution. ESCALATE pauses for authorized review. BLOCK prohibits the proposed action. The caller enforces these outcomes.

## Surface wrappers and history

The HTTP response places Core output in baseline and exposes its decision at the top level. MCP returns JSON text containing Core output plus audit metadata. Neither wrapper's metadata is a new decision algorithm.

Earlier conceptual documents included fields such as stakeholders, execution_mode, and escalation_threshold; do not assume those proposed fields are current adapter inputs. Legacy decision labels remain in historical reports and explicit migration metadata, not the current Core vocabulary.
