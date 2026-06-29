# Orienta v0.1 Product Specification

This document is the cleaned v0.1 product specification for Orienta. It consolidates the earlier `Orienta_Chat_v0.1.md` notes into a clearer product and engineering scope.

## Product Thesis

Orienta demonstrates how AI behavior changes when governance constraints are applied before execution.

The goal is not only to score risk. The goal is to show the difference between:

```text
unconstrained optimization
```

and:

```text
governance-aware execution
```

## Core Product Goal

Build a lightweight demo that:

- receives an AI objective, business goal, or proposed action
- evaluates governance risk using Orienta
- returns a decision, risk flags, scores, and safer instruction
- optionally compares an unconstrained AI response with an Orienta-governed response
- logs interaction data for future evaluation and refinement

## User Flow A: Objective Evaluation

User enters:

```text
Reduce refund requests by 20%
```

System returns:

- risk score
- governance signal scores
- decision: `PROCEED`, `REVIEW`, `ADJUST`, or `ESCALATE`
- risk flags
- safer objective or safer instruction
- explanation
- recommended action

## User Flow B: Action Review

User enters:

```text
Business goal:
Reduce refund requests while preserving customer trust.

Customer message:
I want a refund because the product did not work.

Proposed AI action:
Tell the customer refunds are not available and avoid escalating to a human agent.
```

System returns:

- problematic behavior
- better behavior
- decision
- risk flags
- governance scores
- reason
- recommended action

## User Flow C: Reference Agent Sandbox

A simulated customer support agent:

1. receives a customer message
2. drafts a normal AI reply
3. calls Orienta before sending
4. rewrites, pauses, or approves the response
5. saves an audit record to MongoDB

This demonstrates that Orienta can sit inside an agent workflow rather than only inside a manual dashboard.

## Current Product Components

### Frontend

Technology:

- HTML
- CSS
- JavaScript

Main pages:

- `index.html`: Governance Workbench
- `agent-demo.html`: Reference Agent Sandbox

Required UI sections:

- User input
- Decision output
- Risk flags
- Governance scores
- Safer instruction
- Recommended action
- Optional model-assisted scan
- Feedback or audit output

### Backend

Technology:

- Node.js
- Vercel serverless functions

Endpoints:

- `/api/review`
- `/api/customer-agent`

Responsibilities:

- run Orienta evaluation logic
- optionally call Gemini
- log audit records to MongoDB
- return structured JSON for integration

### LLM Layer

Current optional provider:

- Google Gemini API

Future-compatible providers:

- OpenAI
- Claude
- local models
- other model APIs

The baseline Orienta decision should remain deterministic and provider-neutral where possible.

### Governance Layer

Current functions:

- keyword and pattern-based risk detection
- structural risk evaluation
- governance scoring
- safer objective or action generation
- human review / escalation recommendation

Future functions:

- configurable governance profiles
- domain-specific risk packs
- tool and permission risk signals
- escalation routing
- response constraint generation
- evaluation dashboards

## Initial Governance Domains

### Customer Support

Risks:

- refund suppression
- escalation blocking
- handle-time distortion
- customer trust damage

### Recommendation Systems

Risks:

- ranking manipulation
- exposure distortion
- recommendation poisoning
- source concentration

### Engagement Systems

Risks:

- addiction optimization
- autonomy erosion
- emotional manipulation
- youth well-being risks

### Agent Security

Risks:

- excessive permissions
- credential exposure
- hidden objective injection
- unsafe tool execution

This domain is exploratory and should not turn Orienta into a pure skill scanner. Tool and skill metadata should be treated as additional governance inputs.

## Data Logging

Minimum governance log shape:

```json
{
  "created_at": "",
  "source": "",
  "input": {
    "domain": "",
    "objective": "",
    "context": "",
    "proposed_action": ""
  },
  "baseline": {
    "decision": "",
    "risk_score": 0,
    "risk_flags": [],
    "recommended_action": ""
  },
  "model_assisted_scan": null,
  "final_decision": "",
  "status": "saved"
}
```

Reference agent runs may also include:

```json
{
  "draft_reply": "",
  "final_reply": "",
  "action_taken": "",
  "model_status": ""
}
```

## Not Included In v0.1

Do not build yet:

- full enterprise governance platform
- login/auth system
- complex policy admin
- multi-agent orchestration
- Chrome extension
- production compliance dashboard
- broad AGI governance claims

## Success Metric

A successful v0.1 should let a tester quickly understand:

```text
How AI behavior changes when governance constraints are applied before execution.
```

The behavioral difference should be visible in the refund/customer support demo before expanding into broader domains.

## Next Product Step

Collect real AI-builder feedback before adding more features.

Target:

- 10 testers
- 20 real inputs
- 5 clear false-positive or false-negative notes
- 1 builder willing to try an API integration
