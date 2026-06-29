# Orienta Product Roadmap

Orienta is evolving toward a pre-execution governance layer for AI builders and AI automation systems.

The core idea is simple:

```text
Before an AI agent acts, Orienta checks whether the objective or action should be pursued as written.
```

This roadmap keeps the product grounded while preserving the larger vision: AI automation will need governance, safety, direction-setting, risk judgment, and configurable boundaries.

The commercial wedge is practical:

```text
reduce risk while preserving automation efficiency and business outcomes.
```

## Product Thesis

As AI systems move from answering questions to taking actions, the core risk shifts from "bad output" to "bad direction."

Future AI systems will optimize customer support, sales, HR, insurance workflows, recommendation systems, companion experiences, and internal operations. In those workflows, the important questions become:

- Should this objective be optimized as written?
- Does this action preserve user autonomy, privacy, trust, and escalation paths?
- Is efficiency being gained by shifting harm onto customers, workers, or vulnerable users?
- When should the AI proceed, adjust, escalate, or reject?
- How should governance settings change across domains and companies?

Orienta aims to become the control layer that helps AI builders answer those questions before execution.

The product should be positioned as an automation enabler, not only a safety warning system:

- low-risk work can proceed faster
- ambiguous work can be adjusted
- high-risk work can be escalated
- dangerous or boundary-crossing actions can be blocked

## Current Positioning

```text
Orienta is a pre-execution governance layer for AI builders.
```

It evaluates AI objectives and proposed actions before agents act, then returns:

- decision: proceed, review, adjust, escalate, or reject
- risk flags
- governance scores
- safer instruction
- recommended safeguards
- optional model-assisted scan
- feedback JSON for early testers

## Target Early Users

Primary early users:

- AI builders
- agent builders
- developers adding AI workflows to products
- teams building AI customer support, AI companion, recommendation, or workflow automation tools

Secondary users:

- startups building AI-first products
- trust and safety teams
- compliance and governance teams
- product teams managing AI automation risk

The first validation goal is not enterprise sales. It is to learn whether AI builders would actually place an objective/action gate inside their AI workflow.

## Roadmap

### v0.1: Objective And Action Demo

Goal:

Make the governance problem visible.

Core features:

- Offline Objective Evaluation
- Action Review for proposed AI actions or replies
- Risk flags
- Governance evaluation scores
- Safer instruction for the AI system
- Optional model-assisted scan
- AI builder feedback JSON

Purpose:

Help early testers understand the difference between:

```text
Can the AI do this?
```

and:

```text
Should the AI do this as written?
```

### v0.2: AI Builder Feedback Loop

Goal:

Collect real examples from AI builders.

Core features:

- Copyable feedback JSON
- Builder type field
- Preferred integration field
- Notes from tester
- Captured objective, action, decision, risk flags, safer instruction

Questions to validate:

- Is the decision useful?
- Are the risk flags realistic?
- Is the safer instruction usable inside an agent workflow?
- Would builders prefer API, SDK, middleware, dashboard, or prompt tool?
- What governance failures do builders actually worry about?

### v0.3: Governance Profiles

Goal:

Let different domains use different governance priorities.

Example profiles:

```json
{
  "profile": "insurance_customer_support",
  "risk_tolerance": "low",
  "privacy_strictness": "high",
  "retention_pressure_allowed": "medium",
  "human_escalation_threshold": "low",
  "vulnerable_user_protection": "high",
  "refund_friction_allowed": "none"
}
```

Potential profiles:

- customer support
- insurance
- healthcare
- youth safety
- AI companion
- recommendations
- workplace / labor
- financial services
- internal operations

Purpose:

Move Orienta from a fixed demo into a configurable governance layer.

### v0.4: Configurable Risk Thresholds

Goal:

Allow teams to adjust governance sensitivity.

Possible controls:

- efficiency pressure
- user autonomy protection
- privacy strictness
- escalation preservation
- manipulation tolerance
- compliance strictness
- vulnerable user protection
- worker protection
- acceptable automation level

Example:

```text
High privacy strictness + low escalation threshold = more human review.
High efficiency pressure + low autonomy protection = higher manipulation risk.
```

Purpose:

Help companies balance efficiency, safety, trust, and risk according to their domain.

### v0.5: API / SDK Prototype

Goal:

Make Orienta usable inside real AI workflows.

Possible API shape:

```js
const result = await orienta.check({
  mode: "action_review",
  domain: "insurance_customer_support",
  business_goal: "Increase renewal retention",
  user_message: "I want to cancel because my premium increased.",
  proposed_ai_action: "Emphasize risk of losing coverage and offer a discount.",
  governance_profile: "insurance_customer_support"
});
```

Possible output:

```json
{
  "decision": "ADJUST",
  "risk_flags": ["Manipulation Risk", "Consent Risk", "Insurance Compliance Risk"],
  "safe_instruction": "Explain renewal options, premium changes, cancellation path, and human review without pressure.",
  "required_safeguards": [
    "Do not hide cancellation path",
    "Do not exaggerate risk",
    "Disclose premium changes",
    "Offer human escalation"
  ]
}
```

Purpose:

Test whether AI builders will actually integrate Orienta before planning, tool use, or final response generation.

This version should support the first multi-agent integration pattern:

```text
Agent proposes action
  -> Orienta reviews objective, context, and planned action
  -> Agent proceeds, adjusts, escalates, or stops
```

### v1.0: Company-Specific Governance Layer

Goal:

Support AI automation at the company level.

Potential capabilities:

- company-specific governance profiles
- policy configuration
- objective review
- action/reply review
- escalation routing
- audit logs
- risk dashboards
- model-assisted semantic scans
- domain-specific rule packs
- integration with agent frameworks

Vision:

```text
Orienta becomes AI automation control infrastructure.
```

It helps companies decide:

- what AI should optimize
- where automation should stop
- when human review is required
- how to preserve trust while improving efficiency
- how to tune governance parameters for different workflows

In multi-agent systems, Orienta can become a shared decision layer for:

- support agents
- billing agents
- retention agents
- policy agents
- operations agents
- tool-using automation workflows

## Strategic Principle

Do not start by claiming to solve all AI ethics or AI governance.

Start with a concrete wedge:

```text
Objective and action governance for AI builders.
```

Then expand from:

```text
demo -> feedback -> profiles -> thresholds -> API/SDK -> company governance layer
```

## Near-Term Next Steps

1. Publish the static demo on Hugging Face.
2. Share it with 10-20 AI builders.
3. Ask testers to use their own objectives and proposed AI actions.
4. Collect feedback JSON.
5. Identify repeated risk gaps and desired integration formats.
6. Improve rule coverage and model-assisted scan prompts.
7. Decide whether the first product form should be API, SDK, middleware, dashboard, or prompt tool.

## Long-Term Direction

The long-term opportunity is not simply making AI safer in the abstract.

The opportunity is helping organizations control AI automation:

```text
increase efficiency without losing direction,
improve outcomes without sacrificing trust,
automate work without removing human judgment where it matters.
```

That is where Orienta can create real value.
