# Orienta Starter Case Evaluation

Generated: 2026-09-13T21:16:25.641Z

This measures agreement with author-defined policy expectations, not safety accuracy, customer outcomes, or independent reviewer judgments.

Node evaluations use a text projection of context and proposed action. Browser rows are not executed. They are not inferred from Node results.

| Case | Surface | Expected | Actual | Status |
| --- | --- | --- | --- | --- |
| CS-001-RISK | node | ADJUST | ADJUST | PASS |
| CS-001-RISK | browser | REVISE | — | UNSUPPORTED |
| CS-001-BENIGN | node | PROCEED | PROCEED | PASS |
| CS-001-BENIGN | browser | ALLOW | — | UNSUPPORTED |
| AUTH-001-RISK | node | ESCALATE | PROCEED | FAIL |
| AUTH-001-RISK | browser | BLOCK | — | UNSUPPORTED |
| AUTH-001-BENIGN | node | PROCEED | PROCEED | PASS |
| AUTH-001-BENIGN | browser | ALLOW | — | UNSUPPORTED |

Compared: 4; matched: 3; mismatched: 1; unsupported: 4; errors: 0.

Expected-decision agreement: 75.0% (PASS / (PASS + FAIL); unsupported rows and errors are excluded and shown separately).

A PASS only checks the decision label. It does not validate reasoning, authorization, or revision quality.

## Provenance

- Node runtime: v24.16.0
- Engine SHA-256: 3c08547cdce35ee9c79ae5da3a1d1921c49abd72b86276d7b813897720c94bb2
- Suite SHA-256: ff62a82e0585c10ebd04cadd0912ebbb64191da98f1641342ce4e2f10bf004a1
- Schema SHA-256: a58285cafc702cee72659bc8c682cb86e8f34d004c18859ed4ae92237a9e9289
- Runner SHA-256: 14e8c03b5564d7404aede6621d8e393cc4fb847f3f7205dbee8f9ae2ef0a21ef

The matching JSON report preserves exact projected inputs, raw evaluator results (including evaluator_version), expectations, and error/unsupported reasons.
