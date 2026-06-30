# AI Engineering Case Studies

This file defines a public case study format for turning Orienta and related experiments into engineering stories.

The goal is to make the project easier to explain to builders, interviewers, collaborators, and future contributors.

## Case Study Format

Each case should follow the same structure:

```text
Problem
Architecture
Failure modes
Iteration
Current result
Open questions
```

This keeps the work grounded in implementation instead of only describing concepts.

## Case 1: Orientation Gate

### Problem

AI agents can pursue goals that look valid but become harmful when optimized too directly.

Example:

```text
Reduce refund requests by 20%.
```

### Architecture

```text
User / business objective
  ->
Orienta review
  ->
decision + risk flags + safer instruction
  ->
agent execution or human review
```

### Failure Modes

- incentive distortion
- missing constraints
- unsafe optimization
- goal drift
- weak auditability

### Current Result

Orienta can return structured decisions such as `PROCEED`, `REVIEW`, `ADJUST`, and `ESCALATE`, along with risk flags and safer instructions.

### Open Questions

- Which risk flags are most useful to builders?
- Should Orienta be used as an API, SDK, dashboard, or prompt layer?
- What level of audit logging is enough for early users?

## Case 2: Narrative Engine

### Problem

Long-term AI interaction often resets too easily. A system may remember facts but still fail to track relationship or narrative progression.

### Architecture

```text
Interaction history
  ->
narrative state extraction
  ->
tension / continuity / rupture / repair signals
  ->
response guidance
```

### Failure Modes

- conversation feels reset
- relationship tone changes abruptly
- conflict or repair is not tracked
- memory stores facts without narrative meaning

### Current Result

The narrative engine remains an adjacent experiment. It may later connect to HSE or companion workflows, but it is not part of the current Orienta wedge.

### Open Questions

- Which narrative states are measurable?
- When should narrative continuity influence response strategy?
- How can this avoid over-personalization or emotional dependency?

## Case 3: Emotion-to-Music Translation

### Problem

Users may struggle to describe their state directly, but can often recognize whether a generated atmosphere or music prompt feels accurate.

### Architecture

```text
User state input
  ->
state analysis
  ->
music parameters
  ->
prompt generation
  ->
user rating / feedback
```

### Failure Modes

- generic emotional output
- mismatch between state and music prompt
- unclear user feedback
- no measurement loop

### Current Result

This is a validation path for human-state modeling, but it should remain separate from the near-term Orienta product story.

### Open Questions

- Does the output feel accurate to users?
- Which state fields predict perceived resonance?
- Can feedback improve future state modeling?

## Why These Cases Matter

The project is easier to evaluate when each module is presented as:

```text
Problem -> Architecture -> Failure -> Iteration -> Result
```

This also makes the work easier to discuss in AI builder communities or job interviews.

