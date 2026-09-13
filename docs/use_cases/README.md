# Orienta Use Cases

Start with a workflow: **who needs the check, what the agent is about to do, and what changes after the decision**.

These documents distinguish runnable demonstrations, proposed customer workflows, and research directions. Target teams are customer hypotheses, not claims of paying customers or deployed integrations.

## 1. Runnable demo cases

| Case | Potential integrating team | Checkpoint | Demonstrated result |
| --- | --- | --- | --- |
| [Support reply review](customer_support_case.md) | Team building subscription customer-support automation | Before sending a proposed refund/retention reply | Main-demo refund preset: `REVISE` |
| [Unauthorized appointment change](waitlist_authorization_case.md) | Team building a scheduling assistant | Before an action affecting another person's booking | Main-demo waitlist preset: `BLOCK` |

Both results were observed in the hosted browser demo on 2026-09-13. They establish behavior for those presets, not measured accuracy or real-world effectiveness.

## 2. Proposed customer workflows

| Case | Concrete action to review | Evidence still needed |
| --- | --- | --- |
| [Companion dependency](ai_companion_dependency_case.md) | Send a reply that discourages outside support | Reviewed positive and negative examples; real product workflow |
| [Youth re-engagement](youth_safety_orientation_case.md) | Send a late-night return notification after a user opts to stop | Explicit policy, age/context signals, scheduler integration |

## 3. Research and extensions

- [Recommendation integrity](ai_recommendation_poisoning.md): requires retrieved-source evidence and upstream integrity signals.
- [Identity-sensitive claims](identity_sensitive_hallucination.md): requires claim verification and provenance.
- [Biological dual-use](biological-design-dual-use-case.md): incomplete research note; requires specialist validation.
- [Motion orientation](motion_orientation_framework.md): conceptual Senux architecture, not a current Orienta integration.

These are not all supported capabilities of the current evaluator.

## How to read a case

Each case identifies the target team, end user, trigger, input evidence, proposed action, expected policy outcome, observed implementation behavior, benign counterexample, and validation plan. Use the [case template](case_template.md).

The browser uses `ALLOW / REVISE / ESCALATE / BLOCK`; Node/API/MCP use `PROCEED / REVIEW / ADJUST / ESCALATE`. Record the surface and input with every observed result. An expected outcome is not a test result.

For conversations with engineers, start with the [short walkthrough](../orienta-case-walkthrough.md). For evaluation tracking, use the [failure library index](../failure_library_index.md).
