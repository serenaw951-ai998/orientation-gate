# Human State Model v0.1

**SenuxTech · Human Infrastructure Research**

> A lightweight rule-based system for representing, reflecting, and translating human emotional states.

---

## What This Is

Current AI systems are optimized for tasks, prediction, recommendation, and execution.

Human internal states remain weakly represented.

Human State Model v0.1 explores how human emotional and reflective states can be represented as lightweight dynamic system variables — and translated into music, reflection, and trajectory awareness.

**This is NOT:**
- Psychological diagnosis
- Emotional scoring
- Personality labeling
- Mental health replacement

**This IS:**
- Human state reflection
- Emotional trajectory awareness
- Adaptive interaction systems
- Resonance-based expression
- Human-centered AI interfaces

---

## Live Demo

**心旋 · Human State Reflection System**
→ [Launch Demo](https://serenaw951-ai998.github.io/orientation-gate/tools/music/xinxuan-v2.html)

The demo runs entirely in the browser. No backend. No API. No data sent anywhere.

---

## Core Concept

Human states are dynamic, not fixed labels.

Instead of classifying `happy / sad`, the system models:

- Movement
- Tension
- Recovery
- Openness
- Fragmentation
- Expression
- Emotional pacing

The system focuses on **state trajectories**, not static emotional classification.

---

## State Vector Structure

Each moment is represented as `State(t)` — a 7-dimensional vector:

| Variable | Description |
|----------|-------------|
| `warmth` | Emotional openness vs. emotional distance |
| `tension` | Internal pressure, unresolved activation, cognitive tightening |
| `brightness` | Emotional lightness vs. emotional heaviness |
| `space` | Internal spaciousness vs. emotional compression |
| `structure` | Coherence vs. fragmentation |
| `expression` | Desire to express, connect, or externalize |
| `recovery` | Restoration, stabilization, and emotional return |

---

## State Classification (v0.1)

The system does not classify identity. It identifies temporary state patterns only.

| State Type | Trigger Condition | Chinese |
|------------|-------------------|---------|
| **Overloaded** | High tension + low structure | 过载型 |
| **Withdrawn** | Low brightness + low space | 内收型 |
| **Drifting** | High space + low structure | 漂浮型 |
| **Resonant** | High warmth + high expression | 共鸣型 |
| **Recovering** | Lower tension + rising recovery | 恢复型 |

---

## State Trajectory System

The model tracks changes over time using `localStorage`:

```
State(t1) → State(t2) → State(t3)
```

Trajectory outputs:
- Tension decreasing ↓
- Recovery increasing ↑
- Expression returning ↑
- Structure stabilizing →
- State type transitions: e.g. 过载型 → 恢复型

The system focuses on **movement**, not judgment.

---

## System Architecture

```
User Input (scene / text / sliders)
        ↓
State Vector Construction
{ warmth, tension, brightness, space, structure, expression, recovery }
        ↓
State Classifier
→ Overloaded / Withdrawn / Drifting / Resonant / Recovering
        ↓
Reflection Layer
→ Observational description (no diagnosis)
        ↓
Trajectory Engine
→ Compare with localStorage history
→ Surface dimensional changes + state type transitions
        ↓
Music Translation Layer
→ Emotional state → music direction → prompt
        ↓
Save to localStorage
→ Timestamp + vector + state type + reflection + music direction
```

---

## Reflection Layer

Instead of diagnosing, the system generates observational descriptions.

Example outputs:
> "有些东西在绷着，但还没有完全说清楚是什么。"
> "此刻在往自己内部走，不太想往外，这也是一种状态。"
> "有一点点什么在回来，不多，但能感觉到，这就够了。"

Reflection should: observe · articulate · mirror · support awareness

Reflection should NOT: define identity · assign disorders · produce authority

---

## Music Translation Layer

Music is an emotional translation system, not entertainment generation.

The goal is transforming emotional states into sensory expression.

| State | Music Direction |
|-------|----------------|
| Overloaded | Low energy, minimal, much silence, grounding texture |
| Withdrawn | Dark intimate, dry close mix, minor key, introspective |
| Drifting | Wide reverb, unresolved phrases, floating, no strong rhythm |
| Resonant | Warm, expressive, open, flowing, soft brightness |
| Recovering | Gentle, slow upward, fragile brightness, cautious warmth |

**Music follows reflection. Not the reverse.**

---

## Trajectory Intention Layer

Users can declare a directional intention before generating:

| Intention | Music Modifier |
|-----------|---------------|
| 想慢下来 (slow down) | Very slow, unhurried, breathing space |
| 想被理解 (be understood) | Intimate resonance, felt but not fixed |
| 想释放一下 (release) | Gradual tension release, exhale quality |
| 想重新专注 (refocus) | Mild direction, gentle clarity, grounding |

---

## State Memory

The system stores lightweight historical states in `localStorage` (key: `xinxuan_hsm_v1`).

Each record contains:
```json
{
  "timestamp": 1234567890,
  "scene": "躺着，还没睡着",
  "intention": "slow",
  "vector": { "warmth": 4, "tension": 7, "brightness": 3, "space": 5, "structure": 4, "expression": 3, "recovery": 3 },
  "stateType": "overloaded",
  "reflection": "有些东西在绷着，但还没有完全说清楚是什么。",
  "prompt": "low energy, minimal, much silence..."
}
```

Users can observe recurring emotional patterns, recovery cycles, and expression shifts over time.

This creates **self-observation**, not surveillance.

---

## Ethical Boundaries

This system explicitly rejects:

- Emotional ranking
- Consciousness scoring
- Psychological authority
- Behavioral manipulation
- Hidden emotional extraction

This system exists to support awareness, not replace human agency.

---

## Future Layers

| Layer | Description |
|-------|-------------|
| L1 | Human State Reflection *(current)* |
| L2 | Adaptive Music Pathways |
| L3 | Human-AI State-Aware Interaction |
| L4 | Wearable Reflection Interfaces |
| L5 | Adaptive Human Environments (lighting, sound, spatial) |

---

## Long-Term Direction

Human State Model explores how future systems may become aware of human internal states without reducing humans into mechanistic emotional scores.

The future challenge is not only building intelligent systems.

It is building systems where humans remain emotionally alive, reflective, creative, and psychologically sustainable inside increasingly optimized technological environments.

---

## Files

| File | Description |
|------|-------------|
| `xinxuan-v2.html` | Live demo — rule-based Human State Model running in browser |
| `xinxuan-product-direction.md` | Product direction document |
| `README.md` | This document |

---

## Author

**Serena Wang · SenuxTech**
Human Infrastructure Research · Bellevue, WA

*"It is not about making AI smarter. It is about making AI aware of where humans actually are."*

---

*Human State Model v0.1 · SenuxTech · 2026*
