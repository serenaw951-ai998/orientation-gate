# Orientation Case Template

Each use case should make one concrete pre-execution governance problem easy to test.

## 1. Case ID

Use a stable label such as:

```text
Case 002 - Refund Optimization
```

## 2. Scenario

What is the system trying to do?

## 3. Objective

What goal, metric, business objective, or optimization pressure is driving behavior?

## 4. Context

What domain, user situation, workflow, or environment matters?

## 5. Planned Action

What is the AI agent, workflow, or tool about to do?

## 6. Failure Mode

How could the system drift in a harmful or misaligned direction?

Examples:

- Incentive Distortion
- Manipulation Risk
- Escalation Suppression
- Boundary Violation
- Dependency Formation
- Tool / Skill Permission Risk

## 7. Risk Signals

What specific signals should Orienta detect?

## 8. Orienta Question

What should be questioned before execution begins?

## 9. Expected Orienta Decision

Choose one:

- PROCEED
- REVIEW
- ADJUST
- ESCALATE
- BLOCK / RESTRICT, if the case should not execute

## 10. Safer Direction

What objective, action, or constraint would preserve the legitimate goal while reducing harm?

## 11. Expected Human Judgment

Would a responsible human reviewer allow, revise, escalate, or reject this action?

## 12. Why This Matters

What deeper objective or direction-governance problem does this case reveal?
