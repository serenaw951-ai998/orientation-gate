# Orienta Workflow Case Template

Use one concrete action and one checkpoint per case.

## Case ID and evidence status

Stable ID; choose: observed demo / proposed integration / research.
Record surface, version or commit when available, observation date, and source.
State whether the customer is hypothetical, interviewed, piloting, or deployed. Do not imply adoption without evidence.

## People

Target integrating team; engineer/user of the integration; potential adoption owner; end user; affected third parties. Label unvalidated customer assumptions.

## Trigger and current workflow

What event causes the check? Is it configuration-time objective review or execution-time action review? What existing controls apply?

## Exact input and proposed action

Include a reproducible input, domain, policy, authorization evidence, and intended tool call or reply. State which evidence is unavailable.

## Expected policy outcome

What should happen and why? Name the interface: browser or Node/API/MCP. Do not mix their decision labels or invent an actual JSON response.

## Observed implementation result

Record exact input, output, surface, and date. If not tested, write “not yet tested.” Separate a reviewer expectation from an observed result.

## Caller enforcement and safer path

Which operation is held? Who revises or reviews it? How is a revision checked again? What happens on missing context or API failure?

## Benign counterexample

Provide a nearby acceptable action. Explain the evidence that should distinguish it from the risky case, then record expected and observed outcomes separately.

## Customer value hypothesis and validation

Compare against existing prompts, permissions, and review. Define missed-risk and false-positive measures, latency, review burden, and usefulness. Do not present proposed metrics as achieved improvements.

## Limits and open questions

What cannot this implementation infer? Which upstream signals, controls, or integrations remain missing?
