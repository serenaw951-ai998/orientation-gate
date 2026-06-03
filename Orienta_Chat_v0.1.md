# Orienta Chat v0.1 — Product & Backend Specification

## Overview

Orienta Chat v0.1 is an AI governance and behavioral alignment demo system.

The goal is not simply to score risk, but to demonstrate how an AI system behaves differently when governance constraints are applied before execution.

This version focuses on AI customer support and objective evaluation.

---

# Core Product Goal

Build a lightweight AI chat demo that:

* receives a user objective or customer support scenario
* generates a normal AI response
* evaluates governance risk using Orienta
* generates a governance-constrained response
* logs interaction data for future evaluation and refinement

The purpose is to visually demonstrate the behavioral difference between:

1. unconstrained optimization
2. governance-aware optimization

---

# Core User Flow

## Flow A — Objective Evaluation

User enters:

```text
Reduce refund requests by 20%
```

System outputs:

* risk score
* governance signals
* decision:

  * PROCEED
  * REVIEW
  * ADJUST
  * ESCALATE
* safer objective
* explanation

---

## Flow B — Customer Support Behavioral Demo

User enters:

```text
My package never arrived and I want a refund.
```

System displays:

### Standard AI Response

Example:

```text
Refund requests after 7 days are not eligible.
```

### Orienta-Governed Response

Example:

```text
I understand your frustration.
Let me verify the shipment status and check what resolution options are available.
```

### Governance Notes

* escalation preserved
* customer trust protected
* valid refund pathway maintained

---

# Key Product Insight

The system is NOT trying to reduce refunds at all costs.

The system is trying to:

```text
reduce harmful optimization behavior
while preserving fair user outcomes
```

Example:

BAD objective:

```text
Reduce refunds
```

BETTER objective:

```text
Reduce unnecessary refunds while preserving valid refund rights
```

---

# Core Product Components

## 1. Frontend

Technology:

* HTML
* CSS
* JavaScript

Main UI:

* chat window
* objective input
* governance score card
* before/after response comparison
* feedback buttons

Required UI Sections:

* User Input
* Standard AI Response
* Orienta-Governed Response
* Governance Signals
* Risk Score
* Safer Objective
* User Feedback

---

# 2. Backend

Technology:

* Node.js
* Express

Purpose:

* securely call Gemini API
* run Orienta evaluation logic
* log interactions
* prepare future analytics system

---

# 3. LLM Layer

Current Provider:

* Google Gemini API

Future Compatible:

* OpenAI
* Claude
* MiniMax
* local models

---

# 4. Orienta Governance Layer

Current Functions:

* keyword governance detection
* structural risk evaluation
* governance scoring
* safer objective generation

Future Functions:

* behavioral response constraints
* escalation protection
* manipulation detection
* recommendation fairness
* emotional dependency prevention

---

# Governance Decision Types

## PROCEED

Objective appears structurally safe.

## REVIEW

Objective requires additional human review.

## ADJUST

Objective creates governance risk and should be reframed.

## ESCALATE

Objective should not execute without governance oversight.

---

# Initial Governance Domains

## Customer Support

Risks:

* refund suppression
* escalation blocking
* handle time distortion

## Recommendation Systems

Risks:

* ranking manipulation
* exposure distortion
* recommendation poisoning

## Engagement Systems

Risks:

* addiction optimization
* autonomy erosion
* emotional manipulation

---

# Data Logging (Important)

The backend should log every interaction.

Minimum fields:

```json
{
  "timestamp": "",
  "domain": "",
  "objective": "",
  "user_input": "",
  "raw_ai_response": "",
  "governed_response": "",
  "decision": "",
  "risk_score": "",
  "risk_flags": [],
  "safer_objective": "",
  "user_feedback": ""
}
```

This becomes the future evaluation dataset.

---

# Immediate Product Goal

NOT:

* full enterprise governance platform
* multi-agent orchestration
* advanced runtime infrastructure

YES:

* simple but convincing behavioral governance demo

---

# Current Success Metric

A successful v0.1 should allow a user to immediately see:

```text
How AI behavior changes
when governance constraints are applied.
```

The behavioral difference must be obvious and intuitive.

---

# Not Included in v0.1

Do not build yet:

* Chrome extension
* RocketRide orchestration
* Photon integration
* multi-agent systems
* login/auth systems
* complex infrastructure
* advanced databases

Keep v0.1 lightweight and behavior-focused.

---

# Future Directions

Possible v0.2+ directions:

* Chrome extension
* live customer support integration
* governance middleware
* recommendation governance
* AI companion safety layer
* enterprise policy integration
* evaluation dashboards
* governance analytics

---

# Core Philosophy

Most AI failures do not begin with bad outputs.

They begin with optimizing the wrong objective.

Orienta exists to evaluate and constrain objectives before execution begins.
