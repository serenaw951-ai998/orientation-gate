# HSE: Human State Engine

HSE (Human State Engine) is a middleware layer for long-term human-AI interaction. It analyzes a user's current state before an LLM responds, then produces response guidance that helps the AI become more adaptive, grounded, and relationship-aware.

HSE does not replace a foundation model. It sits before the model and helps answer:

- What state is the user in right now?
- What kind of response is most appropriate?
- Should this moment influence memory?
- What should the model avoid saying?

## Why HSE Exists

Many AI products can answer user messages, but struggle to understand the user's changing state over time. This creates common product problems:

- Users repeat the same context again and again.
- AI replies are technically correct but emotionally mismatched.
- Companion, tutor, or coach products lose continuity.
- Memory systems save facts without knowing which moments matter.
- Retention suffers because the interaction does not feel adaptive.

HSE is designed to make human-facing AI products more responsive to user state, relationship context, and long-term interaction patterns.

## Core Outputs

HSE produces three main outputs:

1. `human_state`: the user's current state profile.
2. `memory_signal`: whether this moment should influence future memory.
3. `response_strategy`: how the LLM should respond in this turn.

Example:

```json
{
  "human_state": {
    "primary_state": "activation_block",
    "secondary_states": ["fatigue", "self_pressure"],
    "agency": 0.36
  },
  "memory_signal": {
    "memory_weight": 0.67,
    "save_recommendation": true
  },
  "response_strategy": {
    "needed_response": "understand_then_small_step",
    "avoid": ["empty motivation", "discipline framing"]
  }
}
```

## HSE and Orienta

HSE and Orienta are both middleware engines, but they analyze different things.

| Engine | Object of analysis | Core question | Product value |
|---|---|---|---|
| HSE | Human state | How should AI respond to this person? | Better interaction quality and retention |
| Orienta | Objective | Should AI pursue this goal? | Lower risk and better direction control |

In short:

- HSE helps AI understand people.
- Orienta helps AI understand objectives.

Together, they support safer and more valuable AI deployment.

## Best-Fit Use Cases

HSE is most useful for products where relationship continuity matters:

- AI companions
- AI tutors
- AI coaches
- Digital humans
- Customer support agents
- Long-term wellness or productivity assistants

## Current Status

HSE is an early draft module. The current goal is to validate whether state-aware middleware can improve visible response quality before optimizing for production metrics.

