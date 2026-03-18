# EPCA v2 — Ethical Polarity Calibration Axis

**Author:** Serena Wang
**Date:** 2026.03.18
**Status:** Conceptual framework — Orientation Engine module

---

## Overview

The Ethical Polarity Calibration Axis (EPCA) is a parametric evaluation and control framework designed to detect, quantify, and correct drift in relational systems.

Unlike static ethical scales, EPCA models relational behavior as a dynamic system operating between two opposing poles:

- **Manipulation** — Control / Exploitation
- **Over-Accommodation** — Unbounded Empathy / Loss of Agency

The goal is not to enforce a fixed position, but to maintain a stable operational equilibrium under real-world constraints.

---

## Core Concept

```
Neutral ≠ passive
Neutral = dynamic equilibrium under constraints
```

The "center" of the axis is not a fixed value, but the result of multi-variable optimization minimizing relational distortion.

---

## System Representation

### State Vector

```
S = (I, A, G, L)
```

| Variable | Description |
|----------|-------------|
| I | Intent Integrity — absence of manipulative objectives |
| A | Awareness — contextual understanding and non-blind execution |
| G | Agency Balance — balance between control and autonomy |
| L | Load Matching — alignment between output intensity and user capacity |

### Variable Range

```
I, A, G, L ∈ [0, 1]
```

### Derived Metrics

**Agency Balance:**
```
G = 1 - |control - autonomy|
```

**Load Matching:**
```
L = 1 - |output_intensity - user_capacity|
```

---

## Neutral Score Calculation

### Linear Model (MVP)

```
NS = w1·I + w2·A + w3·G + w4·L
```

Where:
```
w1 + w2 + w3 + w4 = 1
```

Default weights:
```
w1 = w2 = w3 = w4 = 0.25
```

### EPCA Score

```
EPCA Score = NS × 100
```

---

## Interpretation

| Score Range | Zone | Meaning |
|-------------|------|---------|
| 0–40 | Manipulation Zone | Control / exploitation dominant |
| 40–45 | Control Bias | Slight manipulation tendency |
| 45–55 | Neutral Zone | Stable operational equilibrium |
| 55–60 | Over-Empathy Bias | Soft boundary drift |
| 60–100 | Accommodation Zone | Loss of agency / over-alignment |

---

## Drift Definition

```
Drift = EPCA Score - 50
```

| Drift | State |
|-------|-------|
| < -10 | High manipulation risk |
| -10 ~ -5 | Control bias |
| -5 ~ +5 | Stable |
| +5 ~ +10 | Over-empathy |
| > +10 | Over-accommodation risk |

---

## Error Function

The system aims to minimize relational distortion:

```
E = α·|manipulation| 
  + β·|over_accommodation| 
  + γ·|misalignment|
```

Where:
- `manipulation` = deviation toward control / exploitation
- `over_accommodation` = loss of boundary
- `misalignment` = mismatch between intent and outcome

---

## Dynamic Calibration Model

### State Evolution

```
S(t+1) = S(t) + ΔS
```

### Calibration Rule

```
ΔS = -k · ∇E
```

System adjusts in the direction of minimal error.

---

## Orientation Gate Integration

EPCA provides state awareness for higher-level control.

```
if |Drift| < 5:
    PROCEED
elif |Drift| < 10:
    ADJUST
else:
    RESTRICT
```

---

## Theoretical Foundations

EPCA integrates concepts from:

**Control Theory**
- Feedback loops
- Stability regions
- Error minimization

**Optimization Theory**
- Multi-objective optimization
- Constraint balancing

**Dynamical Systems**
- State evolution
- Equilibrium points
- Drift detection

---

## Design Philosophy

EPCA is not:
- A moral judgment system
- A static ethical scale

EPCA is:
- A calibration mechanism for maintaining relational integrity under dynamic conditions

---

## Key Insight

```
Systems do not fail because they are unintelligent.
They fail because they optimize within misaligned environments.
```

---

## Future Work

- Non-linear weighting models
- Context-aware parameter tuning
- Real-time drift tracking
- Integration with AI safety pipelines

---

## One-Line Definition

```
EPCA defines a measurable equilibrium in relational systems
and provides a mechanism to detect and correct drift.
```
