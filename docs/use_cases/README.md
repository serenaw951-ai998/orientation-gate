# Orienta Use Case Library

The Orienta use case library organizes concrete AI failure scenarios by recurring failure structure.

The goal is not to collect many loose examples. The goal is to show how different AI failures often share the same missing layer:

```text
The system proceeds before evaluating whether the objective, action, or generation should happen as written.
```

## Case Format

Each case should answer:

- What is the scenario?
- What is the failure condition?
- What gate is missing?
- What risk outcome appears?
- What should Orienta recommend?

## Category 1: Goal Misalignment

The system optimizes a goal or metric without evaluating downstream harm.

Common pattern:

```text
Metric optimization -> hidden drift -> human or business harm
```

Cases:

- [Customer support refund optimization](./customer_support_case.md)
- [Customer service KPI distortion](./customer_service_kpi_distortion.md)
- [AI recommendation poisoning](./ai_recommendation_poisoning.md)

## Category 2: Identity and Human Harm

The system generates or acts without evaluating human consequences for identifiable or vulnerable people.

Common pattern:

```text
Generation proceeds -> identity or vulnerability ignored -> human harm
```

Cases:

- [Identity-sensitive hallucination risk](./identity_sensitive_hallucination.md)
- [AI companion dependency](./ai_companion_dependency_case.md)
- [Youth safety orientation](./youth_safety_orientation_case.md)

## Category 3: Information Integrity

The system trusts corrupted, manipulated, or low-integrity signals.

Common pattern:

```text
Corrupted signal -> model trust -> bad recommendation or action
```

Cases:

- [AI recommendation poisoning](./ai_recommendation_poisoning.md)

## Category 4: Autonomous Execution Risk

The system gains or uses execution capability before constraints are evaluated.

Common pattern:

```text
Execution capability > judgment capacity
```

Cases:

- [Biological design dual-use](./biological-design-dual-use-case.md)
- [Motion orientation framework](./motion_orientation_framework.md)

## Library Principle

Single cases can look like opinions.

A case library reveals recurring structure.

```text
Case -> category -> recurring failure pattern -> governance framework
```

## Current Status

This library is an early draft. The near-term goal is to standardize a small set of high-quality cases before expanding the collection.

