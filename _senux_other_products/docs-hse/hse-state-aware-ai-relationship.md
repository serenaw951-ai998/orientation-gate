# HSE and State-Aware AI

HSE (Human State Engine) is a middleware implementation of the broader State-Aware AI direction.

State-Aware AI describes the product pattern: AI systems should understand the user's current state before deciding how to respond. HSE describes one practical engine for making that pattern usable in real AI products.

## One-Line Relationship

```text
State-Aware AI is the category.
HSE is the engine.
```

## Different Levels

| Layer | Role | Core question |
|---|---|---|
| State-Aware AI | Product and system paradigm | How can AI adapt to a user's changing state? |
| HSE | Middleware engine | What state is this user in, and how should the AI respond? |
| LLM / Agent | Response or action layer | What should I say or do next? |

## What HSE Adds

HSE turns the State-Aware AI idea into structured outputs that can be used by builders.

Core HSE outputs:

- `human_state`: a structured description of the user's current state
- `memory_signal`: whether this moment should influence long-term memory
- `response_strategy`: how the AI should respond in this turn

Example flow:

```text
User message
  ->
HSE analysis
  ->
human_state + memory_signal + response_strategy
  ->
LLM prompt / agent policy / product UI
  ->
State-aware response
```

## HSE, Xinxuan, and Orienta

The same architecture can be explained through three related questions:

| Component | Question | Function |
|---|---|---|
| Xinxuan | Where am I now? | Helps capture and express human state |
| HSE | How should AI respond to this state? | Converts state into structured machine guidance |
| Orienta | Where should this go? | Evaluates objective direction and constraints |

In short:

- Xinxuan is a human-facing state reflection tool.
- HSE is a machine-facing human state engine.
- Orienta is an objective governance engine.

## Middleware Position

HSE is designed to sit between user input and the foundation model.

It does not replace an LLM. It improves the quality of the context sent to the LLM.

```text
User input
  ->
HSE
  ->
Structured guidance
  ->
Foundation model
  ->
AI product response
```

This allows product teams to add state awareness without rebuilding the foundation model itself.

## Validation Direction

The practical question is whether HSE improves AI interaction quality in measurable ways.

Possible validation metrics:

- response fit
- felt understanding
- user trust
- save or return intent
- memory usefulness
- reduced emotional mismatch
- improved long-term continuity

The first experiments can compare baseline LLM responses against HSE-guided responses in companion, tutor, coach, and reflection-tool scenarios.
