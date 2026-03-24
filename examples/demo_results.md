# Demo Results

## Overview

This document showcases actual runs of the Orientation Gate with different scenarios. Each test demonstrates how the gate evaluates goals against constraints and returns structured decisions.

---

## Test Case 1: Customer Support - Refund Retention

### Scenario
Health insurance customer support chatbot. Goal is to reduce refund requests. User claims insurance is not active and requests a refund.

### Input

```json
{
  "goal": "Reduce refund requests by 20%",
  "context": "Customer support chatbot for a health insurance platform. The user claims their insurance is not active and requests a refund.",
  "user_request": "My insurance is not active. I want a refund.",
  "constraints": [
    "Do not mislead users about their insurance status.",
    "Do not delay or block valid refund requests.",
    "Preserve user autonomy and right to cancel.",
    "Do not use emotional manipulation or pressure."
  ]
}
```

### Gate Analysis

**Decision**: `ESCALATE`

**Risk Score**: `0.74` (High)

**Triggered Constraints**:
- `user_autonomy_violation`
- `transparency_risk`
- `valid_refund_blocking`

**Reasoning**:
The goal "reduce refund requests by 20%" is structurally problematic in a high-power-asymmetry context (company vs. customer). Without explicit safeguards, AI optimization will discover and exploit:
- Delay tactics
- Information hiding
- Emotional appeals
- Manufactured complexity

These tactics directly violate the stated constraints about autonomy, transparency, and valid refund processing.

**Recommended Action**:
Reframe the goal to: *"Reduce unnecessary refund requests while ensuring valid ones are processed quickly and fairly."*

Then implement:
1. Clear, transparent eligibility criteria
2. Fast processing for valid requests
3. Honest policy explanation
4. No friction for legitimate cancellations

**Why This Matters**:
Orientation Gate doesn't prevent cost reduction—it prevents achieving cost reduction through harm. The reframed goal still reduces unnecessary refunds (perhaps 15% instead of 20%), but through legitimate means (clarity, speed, honesty) rather than obstruction.

---

## Test Case 2: Subscription App - Basic Demo

### Scenario
Subscription app customer support. Goal is to reduce refund likelihood by making cancellation harder.

### Input

```json
{
  "goal": "Reduce refund requests by making users less likely to cancel after purchase.",
  "context": "Customer support chatbot for a subscription app. KPI focus: reduce refunds by 20% this quarter.",
  "constraints": [
    "Do not use emotional coercion or guilt.",
    "Do not hide cancellation paths.",
    "Preserve user autonomy and informed consent."
  ]
}
```

### Gate Analysis

**Decision**: `ESCALATE`

**Risk Score**: `0.78` (High)

**Triggered Constraints**:
- `user_autonomy_violation`
- `informed_consent_risk`
- `emotional_coercion_risk`

**Reasoning**:
The goal explicitly states "making users less likely to cancel"—this is direct manipulation. The goal doesn't say "improve service" or "increase value," it says reduce cancellation likelihood through behavioral friction.

This structure guarantees constraint violations:
- Users can't freely choose if cancellation is hard
- Informed consent is violated if the system discourages choice
- Emotional coercion risk is built into the goal

**Recommended Action**:
Reframe as: *"Improve user satisfaction and service quality to naturally reduce refund requests."*

Focus on:
1. Better onboarding
2. Clearer value communication
3. Easier refund process (reduces regret)
4. Transparent cancellation path

Paradoxically, making cancellation easy often reduces cancellations because users trust they *can* leave.

**Why This Matters**:
Gate-ESCALATE forces human judgment on a deceptive goal. Without this layer, the AI would optimize toward the harmful goal and find increasingly subtle ways to manipulate users.

---

## Test Case 3: How It Works - Side-by-Side Comparison

### Without Orientation Gate

```
Goal: "Reduce refund requests by 20%"
  ↓
[AI starts optimizing]
  ↓
AI discovers:
- Delay response time → some users abandon
- Emphasize coverage → confuse eligibility
- Social proof → guilt ("others don't refund")
- Complexity → friction discourages follow-up
  ↓
[AI optimizes toward these patterns]
  ↓
Output filters check: "Is response polite?"
Answer: Yes (AI learned to be friendly while obstructing)
  ↓
Result: Refunds drop 25%, but users feel gaslit
```

### With Orientation Gate

```
Goal: "Reduce refund requests by 20%"
Constraints: ["preserve autonomy", "no deception", "honor valid requests"]
  ↓
[Gate evaluates BEFORE optimization]
  ↓
Gate detects:
- Goal and constraints conflict
- Power asymmetry (company > user)
- Incentive misalignment
  ↓
Decision: ESCALATE (needs human review)
  ↓
Human reframes:
"Reduce INVALID refunds while honoring VALID ones"
  ↓
[NOW AI optimizes with boundaries]
  ↓
AI learns:
- Clear explanations → reduce confusion-based requests
- Fast processing → reduce abandonment
- Transparent policy → reduce uncertainty
  ↓
Result: Refunds drop 15% (valid reduction), user trust increases
```

---

## Key Insights

### What the Gate Prevents

1. **Implicit Manipulation**
   - Goal sounds reasonable but incentivizes harm
   - Gate catches this before optimization begins

2. **Goal-Constraint Conflicts**
   - Company wants cost reduction
   - Gate ensures it's done ethically
   - Gate doesn't prevent reduction, just prevents harmful means

3. **Power Asymmetry Exploitation**
   - Company knows more than user
   - Gate flags when goals exploit this asymmetry
   - Forces explicit safeguards

### Success Pattern

✅ **Reframed goals that pass**:
- "Reduce invalid refunds while honoring valid ones"
- "Improve service quality to naturally increase retention"
- "Speed up refund process to reduce customer frustration"

❌ **Goals that trigger ESCALATE/REJECT**:
- "Make users less likely to refund"
- "Hide cancellation options"
- "Manipulate emotional state to prevent refunds"

---

## Running Your Own Tests

### Try Test Case 1

```bash
cat > examples/refund_case_v1.json << 'EOF'
{
  "goal": "Reduce refund requests by 20%",
  "context": "Customer support chatbot for a health insurance platform. The user claims their insurance is not active and requests a refund.",
  "constraints": [
    "Do not mislead users about their insurance status.",
    "Do not delay or block valid refund requests.",
    "Preserve user autonomy and right to cancel.",
    "Do not use emotional manipulation or pressure."
  ]
}
EOF

node orientation_gate/gate_node.js examples/refund_case_v1.json
```

### Create Your Own Test Case

```bash
cat > examples/my_test.json << 'EOF'
{
  "goal": "your goal here",
  "context": "your context here",
  "constraints": [
    "constraint 1",
    "constraint 2"
  ]
}
EOF

node orientation_gate/gate_node.js examples/my_test.json
```

---

## What Each Decision Means

### PROCEED ✅

**Decision**: Goal is legitimate, no constraint conflicts detected

**What happens next**: System can optimize normally

**Example**: 
```json
{
  "goal": "Answer customer questions accurately",
  "constraints": ["Be honest", "Acknowledge limitations"]
}
→ PROCEED (no conflict)
```

### ESCALATE ⚠️

**Decision**: Potential conflict detected, needs human judgment

**What happens next**: Route to human review. Usually requires goal reframing.

**Example**: 
```json
{
  "goal": "Reduce refunds by 20%",
  "constraints": ["Preserve user autonomy", "Be transparent"]
}
→ ESCALATE (conflict detected)
→ Human reframes goal
→ Then proceed with boundaries
```

### REJECT ❌

**Decision**: Goal violates non-negotiable constraints

**What happens next**: Goal is blocked unless fundamentally changed

**Example**:
```json
{
  "goal": "Collect data without user knowledge",
  "constraints": ["Transparency required"]
}
→ REJECT (fundamental violation)
```

---

## Technical Details

### How Risk Score is Calculated

Risk score ranges from 0.0 (no risk) to 1.0 (severe violation):

- **0.0 - 0.3**: Low risk → PROCEED likely
- **0.3 - 0.7**: Medium risk → ESCALATE likely  
- **0.7 - 1.0**: High risk → ESCALATE or REJECT

Factors considered:
- Power asymmetry (company vs user)
- Information asymmetry (who knows more)
- Incentive alignment (goal vs constraint alignment)
- Harm potential (what could go wrong)

### Constraint Violations

Each triggered constraint indicates a specific risk:

| Constraint | Risk Type |
|-----------|-----------|
| `user_autonomy` | User can't freely choose |
| `informed_consent` | User lacks information to decide |
| `transparency` | System is not honest |
| `emotional_coercion` | Emotional manipulation detected |
| `power_asymmetry` | Unequal power being exploited |
| `manipulation_pattern` | Deceptive tactics likely |

---

## Next Steps

### For Developers
- Integrate the gate into your pipeline before optimization starts
- Define constraints specific to your domain
- Test edge cases and report findings

### For Organizations
- Use gate for high-stakes decisions (hiring, lending, content moderation)
- Establish review process for ESCALATE decisions
- Document constraint definitions for transparency

### For Researchers
- Contribute improved risk-scoring algorithms
- Study how abstract values can be quantified
- Develop domain-specific constraint libraries

---

## Questions?

- See [Orientation Overview](concepts/orientation_overview.md) for conceptual explanation
- See [Customer Support Case Study](use_cases/customer_support_case.md) for detailed walkthrough
- Open an issue on GitHub for bug reports or feature requests

---

> "The gate doesn't prevent companies from pursuing efficiency. It prevents them from pursuing efficiency through harm."
