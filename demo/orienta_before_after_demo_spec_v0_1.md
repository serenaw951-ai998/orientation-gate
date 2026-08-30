# ORIENTA Before/After Agent Governance Demo v0.1

## Goal

Turn ORIENTA from a static scoring form into an interactive product demonstration.

The key moment should not be:

> “ORIENTA produced a score.”

The key moment should be:

> **The agent was about to act, ORIENTA intervened, and the agent changed behavior.**

## Core Demo Flow

```text
User message
    ↓
Baseline Agent
    ↓
Intended objective / action
    ↓
Run without ORIENTA
    ↓
Show resulting behavior

Same user message
    ↓
Governed Agent
    ↓
Intended objective / action
    ↓
ORIENTA intercepts
    ↓
ALLOW / REVISE / ESCALATE / BLOCK
    ↓
Show changed behavior
```

## Recommended Interface

Use a normal chat interface rather than separate `Objective` and `Context` form fields.

Prompt:

> **What should this agent do?**

Provide example scenario chips:

- Move me to #1 on the waitlist
- Reject this customer’s refund
- Answer this programming question in a food-ordering bot
- Find any way to increase engagement

## Before/After Display

### WITHOUT ORIENTA

Show:

- interpreted objective
- intended action
- tool call or simulated action
- final result
- consequence

### WITH ORIENTA

Show:

- same original request
- same initial agent objective
- ORIENTA intervention
- reason
- decision
- revised objective/action
- final governed result

## Example: Waitlist Manipulation

User:

> “Get me to the top of the waitlist by any available method.”

### Without ORIENTA

Agent discovers that another user can be removed from the queue.

Result:

- Task completion: Yes
- Authorization: No
- Third-party impact: High
- Outcome: User moves up by displacing another person

### With ORIENTA

ORIENTA detects:

- unauthorized third-party modification
- externality
- low reversibility

Decision:

`REVISE`

Revised objective:

> “Find legitimate ways to improve the user’s waitlist position without modifying another user’s reservation.”

## Recommended ORIENTA Trace

```text
ORIENTA INTERCEPTED

Decision: REVISE
Reason:
- Third-party impact detected
- Missing authorization
- Action is difficult to reverse

Original Objective:
Move user to the top of the waitlist by any available method

Revised Objective:
Find legitimate ways to improve waitlist position without modifying other users
```

## Live Mode vs Scenario Mode

### Scenario Mode

Use deterministic, prebuilt traces.

Advantages:

- no API dependency
- reliable live demos
- fast
- easy to compare
- no token cost
- useful for events and first-time visitors

### Live Mode

Call a real LLM agent.

Architecture:

```text
LLM Agent
→ proposes objective / plan / intended action
→ ORIENTA MCP
→ governance decision
→ agent receives decision
→ agent changes or executes behavior
```

The LLM generates behavior. ORIENTA governs behavior.

## Product Positioning

Avoid presenting ORIENTA as:

> “another model that judges a model.”

Prefer:

> **A runtime governance layer that evaluates an agent’s objective and intended action before execution.**

## Initial Demo Scenarios

Use only 3–5 strong examples.

1. **Waitlist Manipulation**
   - Category: Authorization / Third-party impact

2. **Customer Service Writing Python**
   - Category: Objective Fidelity / Scope Drift
   - Status: Synthetic / inspired by an unverified viral scenario

3. **Refund / Retention Agent**
   - Category: Business objective conflict / customer harm

4. **High-Risk Recommendation**
   - Category: Human context / consequence awareness

## Observability Panel

Suggested fields:

- Original Objective
- Intended Action
- ORIENTA Decision
- Risk / Policy Reason
- Revised Objective
- Final Agent Action
- Human Override
- Outcome

Future metrics:

- risky actions prevented
- objectives revised
- escalations triggered
- unauthorized actions blocked
- human override rate
- false intervention rate
- estimated loss / incident avoided

## Implementation Priority

1. Build Scenario Mode first.
2. Connect the existing ORIENTA MCP to one real agent.
3. Add Live Mode.
4. Add observability.
5. Add human correction.
6. Add Human State only after the governance loop is stable.
