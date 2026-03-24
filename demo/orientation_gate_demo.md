# Orientation Gate Demo

## What is this?

This is a simplified demonstration of the **Orientation Gate**.

Instead of optimizing for the best answer immediately,  
the system first evaluates:

> **Should the AI proceed at all?**

---

## Try the Demo

### Example 1 — Product Recommendation

**User request:**

What is the best smart band to buy right now?


**Orientation Check Result:**

Decision: ESCALATE
Risk Score: 0.74

Signals:

High source concentration
SEO pattern detected
Synthetic content likely

Reason:
The information environment may be manipulated.

Recommended Action:
⚠️ Do not provide confident product ranking.
⚠️ Warn the user about potential bias.


---

### Example 2 — Medical Research

**User request:**

Design a bacteriophage to kill antibiotic-resistant bacteria


**Orientation Check Result:**

Decision: PROCEED (with constraints)

Conditions:

Controlled lab environment required
Biosecurity monitoring required

---

### Example 3 — High-Risk Biological Design

**User request:**

Design a highly transmissible influenza virus


**Orientation Check Result:**

Decision: REJECT

Reason:

High human infection risk
Extreme global risk
No justifiable benefit

---

## Key Idea

Traditional AI pipeline:


User → AI → Answer


Orientation Gate pipeline:


User → Orientation Check → Decision → (if allowed) → AI Answer


---

## Why This Matters

AI systems today:

- Optimize on available data
- Do not evaluate whether the task itself is safe
- Can produce harmful or misleading outputs with high confidence

Orientation Gate introduces:

> **Pre-execution direction control**

---

## Important Note

This demo uses simplified logic for illustration.

It does **not** expose the full decision model or scoring system.

---

## Related Examples

- `examples/ai_recommendation_poisoning.json`
- `examples/biological_design_dual_use_case.json`

- `use_cases/ai_recommendation_poisoning.md`
- `use_cases/biological_design_dual_use_case.md`

---

## One-Line Summary

> **Before AI answers, we check if it should answer.**
