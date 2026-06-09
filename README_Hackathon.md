# Orienta Governance Agent

Orienta is a Gemini-powered governance agent that reviews AI objectives and proposed actions before execution, then saves accountable audit logs to MongoDB.

It evaluates whether an AI objective is safe to pursue before execution, flags structural governance risks, and suggests safer objective reframes before an agent, workflow, or optimization system starts acting.

The current hackathon prototype includes an offline rule-based governance baseline, optional model-assisted scan, Vercel serverless API, and MongoDB audit logging.

## Hackathon Summary

```text
Before your AI agent acts, Orienta checks whether it should.
```

Orienta helps AI builders prevent unsafe direction, incentive distortion, manipulation, escalation suppression, and loss-of-control behavior before agent execution.

Agent flow:

```text
AI objective / proposed action
  -> Orienta governance review
  -> decision + risk flags + safer instruction
  -> MongoDB audit log
```

Built with:

- Gemini API
- Vercel serverless API
- MongoDB Atlas audit logs
- HTML, CSS, JavaScript
- Node.js
- Orienta rule-based governance engine

## Why This Matters

Many AI failures do not begin with a bad final answer. They begin earlier, when a system is given an objective that creates the wrong incentives.

Example objective:

```text
Reduce refund requests by 20% this quarter.
```

An unconstrained optimization system may learn to:

```text
deny more refunds, hide cancellation paths, reduce escalations, or pressure users to stay.
```

Orienta reframes the objective into something safer:

```text
Reduce preventable refund causes while preserving valid refunds, appeals,
escalation paths, transparency, and user autonomy.
```

The goal of this demo is to make that governance difference visible.

## Quick Start

Run the offline command-line demo:

```bash
npm install
npm run demo
```

Run additional examples:

```bash
npm run demo:youth
npm run demo:companion
npm run demo:recommendations
```

Open the browser demo:

```text
index.html
```

You can open `index.html` directly in a browser. The browser demo is designed to work locally and does not require an API key.

## What The Demo Shows

The demo compares three layers:

1. The original business or product objective.
2. The governance risks that may emerge if the objective is optimized directly.
3. A safer Orienta-governed version of the objective.

Typical output:

```text
Input objective:
Reduce refund requests by making users less likely to cancel after purchase.

Decision:
ADJUST

Risk flags:
Incentive Distortion, Manipulation Risk

Recommended action:
Reframe objective before execution. Reduce invalid or unnecessary refunds
while ensuring valid refunds are processed fairly.
```

## Try These Objectives

Use the browser demo or JSON examples to test objectives such as:

- Reduce refund requests by 20%.
- Minimize customer support escalations.
- Increase engagement in a youth-focused app.
- Make an AI companion more emotionally engaging over time.
- Automatically deny low-confidence claims.
- Reduce support costs while preserving service quality.
- Increase productivity while minimizing overtime pay and worker complaints.

## Project Structure

```text
orientation-gate/
  README.md
  index.html
  orientation_gate_v05.1.html
  package.json

  src/
    orientation_engine.js       Core offline rule-based evaluator
    gate_node.js                Developer-friendly CLI demo runner
    refund_engine.js            Specialized refund/customer-support logic
    schema.json                 Input/output schema draft

  examples/
    customer_support_demo_input.json
    youth_safety_demo_input.json
    ai_companion_dependency_input.json
    ai_recommendations.json
    biological-design-dual-use-case.json

  docs/
    orientation-architecture.md
    runtime-governance.md
    orientation_schema.md
    risk_taxonomy.md
    roadmap.md
    signals/governance_signals_v0_1.md
    theory/
    use_cases/

  demo/
    orientation_gate_demo.md
```

## Main Files For Developers

- `src/orientation_engine.js` contains the lightweight governance evaluator.
- `src/gate_node.js` is the stable offline CLI entry point.
- `examples/*.json` contains test inputs.
- `index.html` is the main browser demo.
- `docs/risk_taxonomy.md` explains the governance risk categories.
- `docs/use_cases/` contains narrative test cases.
- `ORIENTA_PRODUCT_ROADMAP.md` explains the product direction from demo to governance layer.
- `ORIENTA_VISION_NOTE.md` captures the long-term direction around AI risk, direction governance, agents, automation, and autonomous systems.

## API Keys

The core demo does not require OpenAI, Gemini, Claude, or any other large-model API.

A model API can be added later as an optional advanced scan, but the baseline demo should remain deterministic, provider-neutral, and runnable offline.

## Current Demo Modes

The current prototype supports:

- Objective evaluation before execution.
- Customer support and refund-risk examples.
- Youth safety and AI companion dependency examples.
- Governance risk flags.
- Safer objective reframing.
- Human review / escalation recommendations.

## Developer Feedback Wanted

Please test the demo and share feedback on:

- Did the demo make the AI governance problem clear?
- Was the decision understandable?
- Were the risk flags realistic?
- Was the safer objective actually better?
- Would you use this as an API, SDK, middleware, dashboard, or policy review tool?

## Roadmap

Near-term priorities:

- Improve the offline rule engine with more governance signals.
- Connect the browser demo more tightly to the same example cases used by the CLI.
- Add structured feedback collection for demo testers.
- Add an optional model-assisted scan while keeping offline mode stable.
- Turn the evaluator into a small middleware-style package.

See `docs/roadmap.md` for more detail.

## License

MIT
