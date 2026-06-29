# HSE: Human State Engine

HSE (Human State Engine) is a draft middleware module for long-term human-AI interaction. It analyzes a user's current state before an LLM responds, then produces structured guidance for response strategy, memory relevance, and relationship continuity.

HSE is designed for builders working on:

- AI companions
- AI tutors
- AI coaches
- Digital humans
- Customer support agents
- Other long-term interactive AI products

## Why It Matters

Many AI products can answer user messages, but struggle to adapt to the user's changing state over time. HSE explores whether a lightweight middleware layer can improve response fit, continuity, and long-term interaction quality.

## Start Here

Read these files in order:

1. [state-aware-ai.md](./state-aware-ai.md)  
   The broader product direction: AI systems that adapt to a user's current state.

2. [hse-concept.md](./hse-concept.md)  
   A short conceptual overview of what HSE is and why it exists.

3. [hse-state-aware-ai-relationship.md](./hse-state-aware-ai-relationship.md)  
   How HSE implements the broader State-Aware AI direction.

4. [hse-api-v0.1.md](./hse-api-v0.1.md)  
   A minimal API draft with request/response fields and validation ideas.

5. [senux-middleware-overview.md](./senux-middleware-overview.md)  
   How HSE fits into the broader Senux middleware architecture alongside Orienta.

## Examples

Example HSE outputs are available in:

- [../../examples/hse/hse_companion_demo.json](../../examples/hse/hse_companion_demo.json)
- [../../examples/hse/hse_tutor_demo.json](../../examples/hse/hse_tutor_demo.json)
- [../../examples/hse/hse_coach_demo.json](../../examples/hse/hse_coach_demo.json)

## Status

This module is currently a draft. The next milestone is to validate whether HSE-enhanced responses are visibly better than baseline LLM responses in companion, tutor, and coach scenarios.
