# Orientation Gate (v0.1)

A pre-execution decision layer for AI agents.

Before an AI system optimizes a goal, Orientation Gate evaluates whether that goal should exist at all.

---

## Quick Start

```bash
node orientation_gate/gate_node.js examples/demo_input.json
```

This returns a structured JSON decision:

- PROCEED  
- ESCALATE  
- REJECT  

with quantified structural risk scores.

The Orientation Gate is designed to be invoked **before** any optimization, reward loop, or deployment step.

---

## What Problem Does This Solve?

Most AI systems focus on alignment:

> "Is the system doing what we asked?"

Orientation asks:

> "Should the system be asked to do this at all?"

Without a pre-execution decision layer, alignment mechanisms may optimize systems toward directions that should never scale.

---

## Core Design Principles

- Pre-alignment decision gating  
- Objective legitimacy validation  
- Non-optimizable value constraints  
- Escalation to human-in-the-loop  
- Structural risk scoring  

---

## How It Works

### Inputs
- Goal definition (human-provided)  
- Value constraints (non-optimizable)  
- Context boundaries (affected parties, scale, power asymmetry)  

### Process
1. Validate goal against value constraints  
2. Detect structural conflict between optimization and protected values  
3. If conflict detected → halt optimization  
4. Escalate decision to human review  

### Outputs
- PROCEED  
- ESCALATE  
- REJECT  

---

## Minimal Control Loop (Conceptual)

```pseudo
while system_is_running:
    decision = orientation_gate(goal, context)

    if decision != "PROCEED":
        halt()
        escalate_to_human()
```

---

## Example Use Case

See `/examples/demo_input.json` for a customer support refund-risk scenario.

---

## Status

Draft v0.1 — seeking feedback from AI agent developers, safety researchers, and governance practitioners.

---

## License

MIT License
