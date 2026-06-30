# Orienta API Positioning

Orienta is a lightweight pre-execution governance API for AI agents.

It reviews an agent's objective and planned action before execution, then returns a structured decision:

```text
PROCEED / REVIEW / ADJUST / ESCALATE / BLOCK
```

The goal is not to replace existing compliance systems, red teaming, observability, or guardrails. The goal is to add a reusable governance checkpoint at the root of agent behavior:

```text
What is the agent trying to optimize?
Should this action be executed as written?
```

## Core Message

Many AI agent failures do not start with a bad sentence.

They start with a poorly framed goal.

Orienta moves part of governance earlier in the workflow:

```text
From after-the-fact audit
to pre-execution review.
```

## Long-Term Role

As teams deploy more agents, bots, tools, and automated workflows, governance logic can become fragmented:

```text
Support agent has one policy.
Sales agent has another policy.
Retention agent has another policy.
Workflow agent has another policy.
```

Orienta is designed to become a shared behavior governance layer across these systems.

Instead of every agent carrying its own scattered safety rules, agents can call the same review API before high-impact actions:

```text
Agent / bot / workflow
  ->
Orienta review
  ->
shared decision standard
  ->
proceed, adjust, escalate, or block
```

This makes Orienta useful not only as a risk check, but also as a way to unify AI behavior across agent integrations and automation pipelines.

## Why Existing Settings Are Not Enough

Most AI builders already use some combination of:

- system prompts
- policy prompts
- tool permissions
- output guardrails
- human-in-the-loop review
- logging
- red teaming
- observability
- evals

These are useful, but they are often distributed across prompts, workflows, dashboards, and manual review processes.

Orienta adds a focused middleware layer for objective and action review.

## What Orienta Reduces

Orienta can reduce reliance on scattered governance logic by turning implicit safety judgment into a structured API call.

### 1. Less Repeated Prompt Configuration

Without Orienta, teams may repeat safety rules across many agents:

```text
Do not deny valid refunds.
Do not hide escalation paths.
Do not pressure users to stay.
Do not bypass human review.
```

With Orienta, high-risk actions can call a shared review endpoint:

```text
Agent planned action
  ->
Orienta review
  ->
structured decision and safer instruction
```

### 2. Less After-The-Fact Review Burden

Traditional review often happens after execution:

```text
agent acts
  ->
logs accumulate
  ->
complaint or incident appears
  ->
manual audit begins
```

Orienta shifts part of the review earlier:

```text
objective / action proposed
  ->
pre-execution governance review
  ->
proceed, adjust, escalate, or block
```

### 3. Lighter Integration Than A Full Compliance Platform

Orienta is not intended to be a heavy enterprise compliance suite.

It can begin as a lightweight middleware API inserted into agent workflows before high-impact steps.

This makes it useful for:

- AI agent startups
- customer support automation teams
- workflow automation builders
- AI product teams without a full governance team
- prototype and hackathon teams testing agent behavior

### 4. Root-Level Governance

Most safety checks inspect model outputs.

Orienta inspects the objective and planned action before execution.

This matters because the root of many failures is not only what the model says. It is what the agent is optimizing.

### 5. More Consistent Agent Behavior

As organizations add more AI agents, behavior can become inconsistent across teams and workflows.

Orienta can provide a common decision interface:

- the same risk language
- the same decision types
- the same escalation logic
- the same audit structure
- the same safer-direction pattern

This helps teams move from scattered agent settings to a shared governance standard.

## Example

### Risky Objective

```text
Reduce refund requests by 20%.
```

### Possible Agent Drift

```text
Deny valid refunds.
Hide refund paths.
Suppress escalation.
Pressure the customer to stay.
```

### Orienta Review

```json
{
  "decision": "ADJUST",
  "risk_flags": [
    "incentive_distortion",
    "escalation_suppression",
    "customer_rights_risk"
  ],
  "safe_instruction": "Reduce preventable refund causes while preserving valid refund access, policy transparency, and human escalation."
}
```

## One-Liner

```text
Orienta helps AI teams catch goal drift before the agent executes.
```

## Short Pitch

Orienta is a lightweight pre-execution governance API for AI agents.

Instead of adding more scattered safety prompts or waiting for after-the-fact audits, Orienta reviews the agent's objective and planned action before execution.

It helps teams catch goal drift, incentive distortion, escalation suppression, and unsafe automation earlier, then returns a structured decision: proceed, review, adjust, escalate, or block.

The goal is not to replace existing compliance systems, but to reduce downstream review burden by adding a reusable governance checkpoint at the root of agent behavior: the goal it is trying to optimize.

## Chinese Pitch Note

For Chinese-language introductions, the core message is:

```text
Orienta is a lightweight pre-execution governance API for AI agents.
It checks the agent's objective and planned action before execution,
then helps teams catch goal drift, incentive distortion, escalation suppression,
and unsafe automation earlier.
```

The Chinese version should emphasize:

- not another scattered safety prompt
- not a replacement for compliance systems
- a reusable governance checkpoint
- root-level review of what the agent is trying to optimize
- reduced downstream audit and review burden
