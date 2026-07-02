# HSE API v0.1

This document defines a minimal API draft for the Human State Engine (HSE). The interface is intentionally small so builders can test it inside an existing LLM application.

## Endpoint

```http
POST /hse/analyze
```

## Request

```json
{
  "user_message": "I know what I should do, but I cannot start.",
  "recent_context": [
    {
      "role": "user",
      "content": "I have been feeling tired lately."
    },
    {
      "role": "assistant",
      "content": "It sounds like you have been carrying a lot."
    }
  ],
  "product_context": {
    "type": "coach",
    "relationship_mode": "supportive",
    "locale": "en-US"
  },
  "options": {
    "include_memory_signal": true,
    "include_response_strategy": true
  }
}
```

## Response

```json
{
  "human_state": {
    "primary_state": "activation_block",
    "secondary_states": ["fatigue", "self_pressure"],
    "emotional_intensity": 0.62,
    "self_connection": 0.44,
    "pressure_level": 0.71,
    "future_orientation": 0.48,
    "agency": 0.36,
    "confidence": 0.74
  },
  "memory_signal": {
    "memory_weight": 0.67,
    "recurrence": "possible_repeated_theme",
    "sensitivity": "medium",
    "save_recommendation": true,
    "summary": "User often knows what to do but feels blocked at initiation."
  },
  "response_strategy": {
    "needed_response": "understand_then_small_step",
    "tone": "warm_grounded",
    "suggestion_level": "minimal",
    "boundary_level": "light",
    "avoid": [
      "empty motivation",
      "discipline framing",
      "too many action items"
    ],
    "llm_instruction": "First validate that the user is not lazy but blocked. Then offer one very small next step. Keep the response warm, concrete, and non-judgmental."
  }
}
```

## Field Notes

- `primary_state`: dominant inferred state for this turn.
- `secondary_states`: supporting state signals.
- `emotional_intensity`: estimated strength of the current state.
- `self_connection`: whether the user appears connected to their own needs and feelings.
- `pressure_level`: perceived internal or external pressure.
- `future_orientation`: whether the future feels open, blocked, or unclear.
- `agency`: whether the user appears able to choose or act.
- `memory_weight`: whether this moment may matter for future personalization.
- `needed_response`: recommended interaction pattern for the LLM.
- `llm_instruction`: compact instruction that can be injected into a model call.

## Validation Metrics

Early validation should focus on response quality and integration clarity:

- User-rated fit
- Average conversation turns
- Return rate after first use
- User correction frequency
- Saved memory usefulness
- Builder rating of integration clarity

HSE should not claim retention or revenue improvement until tested with real product data.

