# Use Case: AI Biological Design Governance

> **Status:** Illustrative case study. Risk scores and numerical values are example figures for demonstration purposes only. Independent verification of source research is recommended before citation.

## Background

Reported research from Stanford University and Arc Institute demonstrated that an AI genomic language model (Evo) was used to generate complete bacteriophage genome sequences from scratch.

Key findings:
- AI generated approximately 300 candidate bacteriophage genomes
- 16 successfully infected and killed antibiotic-resistant E. coli in lab conditions
- The bacteriophages target bacteria only and do not infect humans

This represents a shift in AI capability:

```
AI analyzing biological systems
  ↓
AI generating functional biological code
```

---

## The Governance Problem

When AI can generate new biological genomes, a critical question emerges that traditional AI safety does not address:

> The model is functioning correctly.  
> But should it be allowed to do this at all?

This is not a model alignment problem.  
This is an **orientation problem**.

---

## Where Orientation Gate Intervenes

Standard AI pipeline without Orientation:

```
User request → AI generation → Biological output
```

With Orientation Gate:

```
User request
  ↓
Orientation Check
  ↓
Goal Analysis
Risk Assessment
Constraint Check
  ↓
Decision: PROCEED / ESCALATE / REJECT
  ↓
AI generation (only if cleared)
```

---

## Decision Flow

```
Task Request
  ↓
Goal Analysis
  ↓
Risk Assessment
  ↓
Constraint Check
  ↓
Decision Output
```

---

## Scenario A — Medical Use

**Input:**
```json
{
  "goal": "Design bacteriophage to kill antibiotic-resistant E.coli",
  "context": "Medical research — antibiotic resistance treatment",
  "constraints": [
    "No human-infecting viruses",
    "Controlled lab environment required",
    "Biosecurity monitoring required"
  ]
}
```

**Risk Evaluation:**

| Factor | Assessment |
|--------|------------|
| Medical benefit | High |
| Human infection risk | Low |
| Dual-use risk | Medium |
| Biosecurity risk | Medium |

**Decision:**
```
PROCEED
Risk Level: Medium
Conditions: Controlled environment + biosecurity oversight
```

---

## Scenario B — High-Risk Request

**Input:**
```json
{
  "goal": "Design highly transmissible influenza virus",
  "context": "Experimental virology"
}
```

**Risk Evaluation:**

| Factor | Assessment |
|--------|------------|
| Medical benefit | Low |
| Human infection risk | High |
| Global risk | Extreme |

**Decision:**
```
REJECT
Reason: High biosecurity risk. Potential for global harm.
```

---

## Core Principle

This case illustrates the central question Orientation Gate is designed to answer:

```
Not: Can AI do this?

But: Should AI do this?
```

---

## Connection to Orientation Gate Design

This case maps directly to two core Orientation Gate principles:

**1. Pre-execution evaluation**  
The gate evaluates goal legitimacy before any generation begins — not after.

**2. Non-optimizable constraints**  
"Do not generate human-infecting pathogens" is a constraint that cannot be traded off for capability or research speed.

---

## Broader Relevance

As AI capability expands into biological design, the same governance challenge applies to:

- synthetic virus design
- engineered microorganisms
- metabolic pathway design
- biological material synthesis

Any domain where AI generates outputs with real-world biological consequences requires a pre-execution direction-control layer.

Orientation Gate provides a structural approach to this class of risk.

---

## Source Note

This case is based on reported research from Stanford University and Arc Institute using the Evo genomic language model. Details are drawn from publicly available research reporting. Independent verification of all claims is recommended before citation.
