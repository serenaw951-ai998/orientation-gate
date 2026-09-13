# Orienta Failure Library and Validation Index

The [use case library](use_cases/README.md) separates runnable demo evidence, proposed customer workflows, and research. Customer roles are hypotheses unless explicitly supported by deployment evidence.

## Evidence register

| ID | Case | Status | Evidence |
| --- | --- | --- | --- |
| CS-001 | [Support reply review](use_cases/customer_support_case.md) | Observed browser preset | Refund preset returned REVISE on 2026-09-13 |
| AUTH-001 | [Appointment authorization](use_cases/waitlist_authorization_case.md) | Observed browser preset | Waitlist preset returned BLOCK on 2026-09-13 |
| COMP-001 | [Companion reply](use_cases/ai_companion_dependency_case.md) | Proposed workflow | Exact paired inputs not yet tested |
| YOUTH-001 | [Re-engagement notification](use_cases/youth_safety_orientation_case.md) | Proposed workflow | Exact policy/scheduler case not yet tested |

These observations are not a benchmark. Benign counterexamples in the case documents remain validation tasks, not passing tests.

## Research backlog

Recommendation integrity, identity-sensitive claims, biological dual-use, and motion orientation are listed in the [research section](use_cases/README.md#3-research-and-extensions). They require additional evidence or components.

A possible future malicious-skill case would require permission, data-access, tool-call, and authentication-flow evidence. A user objective alone cannot reveal hidden skill behavior.

## Next evaluation work

1. Test each risky input alongside a nearby acceptable action.
2. Record exact input, evaluator surface/version, result, and date.
3. Obtain independent reviewer judgments and record disagreements.
4. Compare against current prompts, permissions, and review processes.
5. Evaluate misses, false positives, revision usefulness, latency, and review burden.
6. Re-run after changes to the evaluator; do not treat old observations as current guarantees.

Use the [case template](use_cases/case_template.md). Browser and backend decisions differ; see [Decision Interfaces](../README.md#decision-interfaces).

## Executable starter evaluation

Four machine-readable fixtures now complement the narrative cases. See [evaluation instructions and actual results](evaluation/README.md). The Node run has three matching decisions and one authorization-case mismatch; the four browser rows are not automated and are marked UNSUPPORTED. These are text-projected fixtures, not re-runs of the full browser presets.
