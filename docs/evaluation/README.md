# Starter Case Evaluation

This adds a small executable layer to the existing [case library](../use_cases/README.md). It does not change the Orienta evaluator or replace the case narratives.

## Run

With Node.js 18 or later, from the repository root:

```bash
npm run test:cases
npm run eval:cases
npm run eval:cases -- --surface node
npm run eval:cases -- --surface browser
```

On Windows PowerShell, use `npm.cmd` instead of `npm` if script execution policy blocks the npm PowerShell wrapper.

No API key, database, package installation, or new dependency is required for these commands. The script imports the existing Node evaluator directly.

The default selects both surfaces. Node rows execute; browser rows are **UNSUPPORTED** because no browser adapter exists. Selecting browser alone does not run a Node substitute.

Outputs go into a new directory under `eval-runs/` on each run. To retain a report elsewhere:

```bash
npm run eval:cases -- --output-dir docs/evaluation/reports
```

Exit codes: **0** = all compared labels match and no errors; **1** = at least one mismatch; **2** = invalid input, execution/reporting error, or no comparable results. Unsupported rows remain visible even when other rows permit exit 0. Read coverage counts as well as the exit code.

## Data and compatibility

- [Starter fixtures](../../examples/case-library/starter.json): four exact inputs, two risky/benign pairs.
- [Case schema](../../examples/case-library/schema.json): an evaluation envelope around inputs and expectations.
- [Runner](../../scripts/evaluate-cases.js): validation, input projection, evaluation, and report generation.
- [Runner tests](../../scripts/evaluate-cases.test.js): malformed data, surface separation, failures, and report persistence.

Existing `examples/*.json` remain unchanged. The older `src/schema.json` describes a historical output format and is not the case schema or the current Node decision contract. No attempt is made to silently reconcile or replace it.

The lightweight validator implements only the JSON Schema keywords present in the bundled case schema (type, properties, required, additionalProperties, enum, minLength, pattern, items, minItems), plus unique IDs and reciprocal counterexample links. Extend its tests if the schema gains new keywords.

## What is executed?

Each fixture stores objective, context, proposed action, domain, and constraints separately. The Node adapter joins context and proposed action with a newline and passes `objective/context/domain/constraints` to `evaluateObjective`. It performs no conversation extraction and no authorization inference.

This is an explicit text projection, not the browser pipeline or an HTTP/MCP integration test. The JSON report includes the exact projected input and the raw evaluator output.

Expectations are defined per surface. For the authorization-risk case, Node's desired policy response is `ESCALATE`, while the browser expectation is `BLOCK`. These are independent author-defined expectations, not a label mapping or an implemented capability guarantee.

## Latest checked-in observation

[Readable report](reports/2026-09-13T21-16-25-641Z-peS32H/results.md) · [Full JSON](reports/2026-09-13T21-16-25-641Z-peS32H/results.json)

Engine source was read from repository commit `57ab12f2116f0d8aef57733f262beffc108c25aa`. Reports also record engine, suite, schema, and runner SHA-256 hashes, Node version, UTC time, and raw outputs with evaluator version.

The run compared four Node cases: **3 PASS, 1 FAIL, 0 ERROR**. Four browser rows were **UNSUPPORTED**.

The authorization-risk fixture returned `PROCEED` rather than the expected `ESCALATE`. This exposes a gap in the current Node text evaluator for that input. It does not contradict the separately observed browser waitlist preset, which uses different extraction and hard constraints.

## Interpretation

PASS means exact decision-label agreement with a draft, author-defined expectation. It does not certify the reasoning, safety, revision quality, customer demand, or independent human agreement. The three matches out of four comparisons are **not a safety accuracy estimate**.

Unsupported rows and execution errors are reported separately and excluded from agreement's denominator. No false-allow or false-block population rates are claimed from this tiny, non-independent set.

The runner intentionally fails on the known mismatch. Do not change expectations or the evaluator simply to turn the report green; investigate and review any change.

## Adding a case

Follow the [narrative template](../use_cases/case_template.md), then add a fixture to `starter.json` or a separate suite passed with `--suite path/to/suite.json`. Use stable IDs, reciprocal risky/benign links, exact evidence, a policy basis, and surface-specific expectations. Do not place observed scores in expected metadata or overwrite past reports.

Before treating this as a benchmark, obtain independently reviewed expectations, broaden examples and counterexamples, and decide how to evaluate explanations and action quality.
