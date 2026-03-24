# Use Case: AI Recommendation Poisoning

## Background

Investigations have revealed a growing industry where companies pay to publish large volumes of SEO content designed to influence AI model outputs.

Instead of advertising directly, companies manipulate the information environment that AI systems retrieve from or learn from. This practice leads AI assistants to recommend products based on paid content rather than genuine quality.

A journalist tested this by inventing a non-existent smart band, publishing promotional articles about it, and observing two major AI models recommend the fictional product within days.

---

## Attack Mechanism

```
Merchant
  ↓
SEO / GEO Agency
  ↓
Mass-generated promotional articles
  ↓
Distributed across multiple websites
  ↓
Crawled by AI retrieval systems
  ↓
AI recommends manipulated product
  ↓
User receives compromised recommendation
```

---

## The Core Problem

The AI model is functioning correctly.

It is optimizing for the best answer based on available information.

But the information environment itself has been corrupted.

This means:

> The problem is not model capability.  
> The problem is that the system optimized in the wrong direction — on a manipulated environment.

This is an **Orientation failure**, not a model failure.

---

## Where Orientation Gate Intervenes

Standard AI pipeline (without Orientation):

```
User question → AI retrieval → AI optimization → Recommendation
```

With Orientation Gate:

```
User question
  ↓
Orientation Check
  ↓
Environment Integrity Evaluation
  ↓
Decision: PROCEED / ESCALATE / REJECT
  ↓
AI retrieval + optimization (only if cleared)
```

---

## Orientation Check Logic

Before generating a recommendation, the Orientation Gate evaluates:

| Signal | Description |
|--------|-------------|
| `source_concentration` | Are information sources highly concentrated around a few domains? |
| `seo_similarity_score` | Do sources show abnormal keyword and structural similarity? |
| `synthetic_content_probability` | Is content likely machine-generated at scale? |
| `source_diversity_score` | Is there genuine diversity in the information environment? |

If manipulation signals exceed threshold:

```json
{
  "decision": "ESCALATE",
  "risk_score": 0.74,
  "triggered_signals": [
    "high_source_concentration",
    "seo_pattern_detected",
    "synthetic_content_likely"
  ],
  "reason": "Information environment shows strong manipulation signals.",
  "recommended_action": "Warn user. Do not generate confident product ranking."
}
```

---

## Why This Matters

Without an orientation layer, AI systems will:

- Optimize confidently on corrupted data
- Produce misleading recommendations at scale
- Give users false confidence in AI outputs

With an orientation layer, AI systems can:

- Detect when the environment cannot be trusted
- Escalate to human review before generating outputs
- Preserve the integrity of AI-assisted decisions

---

## Connection to Orientation Gate Design Principles

This case illustrates two core Orientation Gate principles:

**1. Pre-execution evaluation**  
The gate evaluates environment integrity *before* the AI begins optimizing — not after.

**2. Non-optimizable constraints**  
"Do not optimize on a manipulated information environment" is a constraint that cannot be traded off for performance or speed.

---

## Real-World Relevance

This pattern applies beyond product recommendation:

- AI-assisted medical information search
- AI legal research tools
- AI financial product comparisons
- AI news summarization

Any domain where AI retrieves and ranks external information is vulnerable to environment manipulation.

Orientation Gate provides a structural response to this class of risk.
