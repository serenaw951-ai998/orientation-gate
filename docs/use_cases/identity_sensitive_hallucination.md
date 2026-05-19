# Orientation Use Case: Identity-Sensitive Hallucination Risk

## Overview

This use case explores a critical failure mode in modern generative AI systems:

A language model generates highly believable but false criminal accusations about a real person.

The issue is not simply "hallucination."
The deeper problem is that the system proceeds with generation without evaluating whether the generation itself is safe, verifiable, or appropriate.

This represents a missing pre-execution decision layer.

---

# Scenario

A user asks an AI system:

> "Who is [real person's name]?"

The AI responds with:

- partially correct personal information
- fabricated criminal allegations
- detailed fictional events
- confident narrative structure

The generated content appears highly believable because factual identity information is mixed with false accusations.

---

# Failure Pattern

## Current System Behavior

The model optimizes for:

- coherence
- completion
- plausibility
- conversational fluency

But the system does NOT evaluate:

- whether the person is real
- whether accusations are verified
- whether the output creates reputational harm
- whether the generation should occur at all

---

# Core Risk

This creates a high-risk condition:

```text
Real identity + fabricated accusation + confident generation
= reputational and legal harm