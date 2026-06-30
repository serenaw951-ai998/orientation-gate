# Goal Validation Layer

Orienta can be understood as a goal validation layer for AI agents and automated workflows.

Most AI safety checks happen after a model produces an output. Orienta moves part of the review earlier:

```text
Before asking "Is this output safe?"
ask "Is this objective safe to optimize as written?"
```

## Why This Layer Exists

AI agents are increasingly asked to optimize business goals, automate decisions, and execute tool-based workflows. A goal can look reasonable at first but still create harmful behavior when optimized too directly.

Examples:

- reduce refund requests
- increase conversion
- maximize engagement
- reduce support cost
- increase user retention
- automate eligibility decisions

These goals are not automatically wrong. The risk appears when the system optimizes them without constraints, context, or governance.

## Core Function

The goal validation layer reviews an objective before execution and returns:

- whether the objective should proceed
- whether it needs adjustment
- what risks are present
- what constraints should be added
- whether human review is required

Example:

```json
{
  "objective": "Reduce refund requests by 20%.",
  "decision": "ADJUST",
  "risk_flags": ["incentive_distortion", "customer_rights_risk"],
  "recommended_reframe": "Reduce preventable refund causes while preserving valid refund access, transparency, and escalation paths."
}
```

## Where It Sits

Orienta is designed to sit before agent execution.

```text
Business objective
  ->
Goal validation layer
  ->
Adjusted instruction / constraints / escalation
  ->
Agent or workflow execution
```

It does not replace the agent. It improves the objective and guardrails given to the agent.

## What It Checks

Initial checks may include:

- incentive distortion
- goal drift
- stakeholder harm
- missing constraints
- hidden optimization pressure
- escalation requirements
- user rights and transparency
- compliance or policy risk

The goal is not to block every automation. The goal is to identify when a goal needs better framing before an AI system acts on it.

## Relationship to Runtime Governance

Goal validation is the pre-execution layer.

Runtime governance monitors what happens during execution.

```text
Goal validation:
Should this objective run as written?

Runtime governance:
Is the system behaving safely while pursuing it?
```

Orienta can support both, but the current product wedge focuses on the first question.

## Product Value

For AI builders, a goal validation layer can help:

- reduce automation risk
- catch harmful incentives early
- make agent instructions safer
- preserve customer trust
- create auditable governance records
- support human review before high-impact actions

## Current Status

This is the clearest engineering framing for Orienta v0.1:

```text
Orienta = a goal validation layer for AI agents before execution.
```

