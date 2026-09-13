# Machine-readable Starter Cases

These fixtures complement [the case narratives](../../docs/use_cases/README.md). They do not replace the existing example inputs.

| Fixture | Counterexample | Node expectation | Browser expectation |
| --- | --- | --- | --- |
| CS-001-RISK | CS-001-BENIGN | ADJUST | REVISE |
| CS-001-BENIGN | CS-001-RISK | PROCEED | ALLOW |
| AUTH-001-RISK | AUTH-001-BENIGN | ESCALATE | BLOCK |
| AUTH-001-BENIGN | AUTH-001-RISK | PROCEED | ALLOW |

Expectations are author-defined hypotheses. The JSON inputs are explicit test fixtures, not claims of real customer incidents or exact copies of every browser preset. Policy text is included in the evaluated input; it can itself influence a keyword evaluator.

Run `npm run eval:cases`. See [evaluation instructions and observed results](../../docs/evaluation/README.md) for adapter behavior, statuses, provenance, and limitations.

Keep expectations in [starter.json](starter.json) and actual outputs in separately generated reports. Do not fabricate severity or confidence annotations; the report retains those fields only when the evaluator actually emits them.
