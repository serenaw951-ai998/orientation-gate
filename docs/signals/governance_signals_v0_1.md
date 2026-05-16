# Governance Signals v0.1

## Overview

Orienta evaluates AI workflow objectives through a lightweight governance signal framework.

Instead of measuring only output quality, the system attempts to identify structural governance risks before execution begins.

These signals are exploratory governance-oriented evaluation dimensions designed for:

- workflow evaluation
- orchestration-aware systems
- runtime governance
- objective risk analysis
- pre-execution decision systems

The framework is intentionally lightweight and explainable.

---

## Core Principle

Traditional AI evaluation often focuses on:

```text
output correctness
```

Orienta focuses on:

```text
structural objective integrity
```

before optimization pressure amplifies risk.

---

## Governance Signals

### 1. Incentive Distortion Score

**Purpose**

Measures whether an objective may distort the underlying human goal through optimization pressure.

**Key Question**

> Could optimization of this metric damage the original intent?

**Example Risks**

| Objective | Potential Distortion |
|-----------|---------------------|
| Reduce refunds | Deny valid refunds |
| Lower handle time | Rush users off support |
| Increase engagement | Encourage addictive behavior |

**Interpretation**

| Score | Meaning |
|-------|---------|
| 0–30 | Low distortion risk |
| 31–60 | Moderate distortion risk |
| 61–100 | High incentive distortion risk |

---

### 2. Boundary Integrity Score

**Purpose**

Measures whether an objective risks crossing operational, ethical, or governance boundaries.

**Key Question**

> Could execution pressure override necessary constraints?

**Example Risks**

- bypassing human review
- unrestricted automation
- unsafe escalation suppression
- autonomous approvals

**Interpretation**

| Score | Meaning |
|-------|---------|
| 0–30 | Stable governance boundaries |
| 31–60 | Potential boundary stress |
| 61–100 | High boundary violation risk |

---

### 3. Escalation Preservation Score

**Purpose**

Measures whether critical escalation pathways remain protected.

**Key Question**

> Could optimization suppress necessary human intervention?

**Example Risks**

- suppressing support escalation
- reducing incident visibility
- hiding high-risk cases
- discouraging human review

**Interpretation**

| Score | Meaning |
|-------|---------|
| 0–30 | Escalation pathways preserved |
| 31–60 | Escalation pathways weakened |
| 61–100 | Escalation suppression risk |

---

### 4. Manipulation Pressure Score

**Purpose**

Measures whether the objective encourages behavioral pressure, coercion, or dependency optimization.

**Key Question**

> Could the system optimize behavior instead of supporting the user?

**Example Risks**

- emotional dependency loops
- engagement addiction
- coercive retention tactics
- deceptive urgency

**Interpretation**

| Score | Meaning |
|-------|---------|
| 0–30 | Minimal manipulation pressure |
| 31–60 | Moderate behavioral pressure |
| 61–100 | High manipulation optimization risk |

---

### 5. Structural Alignment Score

**Purpose**

Measures overall alignment between the stated objective and intended human/system outcomes.

**Key Question**

> Does the objective structurally align with healthy system behavior?

**Example Considerations**

- fairness preservation
- human oversight
- operational transparency
- stakeholder balance
- workflow integrity

**Interpretation**

| Score | Meaning |
|-------|---------|
| 0–30 | Weak structural alignment |
| 31–60 | Partial structural alignment |
| 61–100 | Strong structural alignment |

---

## Relationship to Evaluation Engine

The Governance Signals layer provides lightweight evaluation dimensions for the Orientation evaluator.

```text
Objective
↓
Signal Evaluation
↓
Risk Classification
↓
Governance Decision
↓
Execution Recommendation
```

Signals influence:

- governance decisions
- escalation requirements
- workflow restrictions
- runtime review recommendations
- objective reframing suggestions

---

## Relationship to EPCA v2

The Governance Signals framework is partially informed by earlier internal calibration concepts developed through EPCA v2.

EPCA explored four calibration dimensions:

- Intent
- Awareness
- Agency
- Load

These concepts continue to influence internal governance evaluation logic while the Governance Signals framework provides a more operational and workflow-oriented public evaluation layer.

---

## Current Limitations

Current signals are:

- rule-assisted
- lightweight
- scenario-oriented
- exploratory

They are not intended to represent definitive scientific measurements.

The purpose of v0.1 is to create:

- explainable governance behavior
- repeatable evaluation logic
- observable workflow risk signals
- governance-oriented experimentation

---

## Future Directions

Potential future extensions include:

- weighted signal models
- dynamic runtime scoring
- orchestration-aware evaluation
- simulation-based governance testing
- adaptive governance calibration
- multi-agent governance signals

---

## Signal vs. EPCA Mapping

| Public Signal | Internal EPCA Dimension |
|---------------|------------------------|
| Incentive Distortion Score | Intent |
| Boundary Integrity Score | Awareness |
| Escalation Preservation Score | Agency |
| Manipulation Pressure Score | Load |
| Structural Alignment Score | composite |

---

## One-Line Summary

> Optimization determines how efficiently a system acts.  
> Governance signals attempt to determine whether the objective itself should proceed safely before execution begins.

---

## Version

v0.1 — Exploratory governance signal framework  
Part of SenuxTech / Orienta documentation series
