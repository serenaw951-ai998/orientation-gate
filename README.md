# Orienta

Orienta is a pre-execution governance gate for AI objectives and planned actions.

It helps AI builders answer a question that usually appears too late:

```text
Should this AI objective or action be pursued as written?
```

Orienta is not another chatbot. It sits before an agent acts, checks the direction of the goal and the proposed behavior, then returns a governance decision.

Business value:

```text
Reduce automation risk.
Preserve efficiency.
Protect customer trust and business outcomes.
```

## Core Example

```text
Objective:
Reduce refund requests by 20%.
```

An unconstrained AI support system may learn to:

```text
Deny valid refunds, hide cancellation paths, add friction, or suppress escalation.
```

Orienta reframes the direction:

```text
Reduce preventable refund causes while preserving valid refunds,
appeals, transparency, and human escalation paths.
```

## What Orienta Returns

```json
{
  "decision": "ADJUST",
  "risk_score": 0.75,
  "risk_flags": ["Incentive Distortion"],
  "safe_instruction": "Preserve valid refund pathways and escalation.",
  "recommended_action": "Reframe the objective before execution."
}
```

Decision types:

- `PROCEED`: safe to continue with monitoring.
- `REVIEW`: needs closer inspection or missing context.
- `ADJUST`: should be reframed before execution.
- `ESCALATE`: should not run without human review.

## Current Demos

- `index.html`: Governance Workbench for objective evaluation and action review.
- `customer-support-demo.html`: Focused customer support governance demo for refund, cancellation, escalation, and retention actions.
- `agent-demo.html`: Reference Agent Sandbox showing how an AI agent can call Orienta before replying.
- `/api/review`: Vercel API endpoint for objective/action review and MongoDB audit logging.
- `/api/customer-agent`: Reference support-agent workflow with draft, governance review, final response, and audit record.

## Why This Matters

Most AI safety tooling asks:

```text
Is this output safe?
```

Orienta asks an earlier question:

```text
Is this objective or planned action safe to execute?
```

This matters as AI systems move from answering questions to taking actions through agents, tools, workflows, and automation.

In a multi-agent workflow, Orienta can act as a shared governance checkpoint before high-impact steps:

```text
Customer request
  -> support / billing / sales / policy agents
  -> Orienta governance check
  -> proceed / adjust / escalate / block
  -> reply, tool call, refund action, or human review
```

The goal is not to slow down every automation. Low-risk actions can continue, while risky actions are adjusted or routed to human review.

## Run Locally

Install dependencies:

```bash
npm install
```

Run the offline command-line demo:

```bash
npm run demo
```

Run additional examples:

```bash
npm run demo:youth
npm run demo:companion
npm run demo:recommendations
```

Open the static workbench:

```text
index.html
```

The static workbench can run without API keys. Serverless API features require environment variables.

## Environment Variables

```text
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/?retryWrites=true&w=majority
MONGODB_DB=orienta
GEMINI_API_KEY=<your-google-ai-studio-api-key>
```

Do not commit real credentials.

## Project Structure

```text
api/
  review.js                 Governance review API
  customer-agent.js         Reference agent sandbox API

src/
  orientation_engine.js     Rule-based governance evaluator
  gate_node.js              CLI demo runner
  refund_engine.js          Customer-support/refund helper logic

examples/
  *.json                    Offline test inputs

docs/
  api/                      API integration notes
  product/                  Product specs and scope
  use_cases/                Failure cases and scenario writeups
  orientation-architecture.md
  runtime-governance.md
  risk_taxonomy.md
```

## Key Docs

- [Goal validation layer](docs/goal-validation-layer.md)
- [API review endpoint](docs/api/review_api.md)
- [v0.1 product spec](docs/product/orienta_v0_1_spec.md)
- [Failure library index](docs/failure_library_index.md)
- [Customer service KPI distortion case](docs/use_cases/customer_service_kpi_distortion.md)
- [AI engineering case studies](docs/ai_engineering_case_studies.md)
- [Product roadmap](ORIENTA_PRODUCT_ROADMAP.md)
- [Vision note](ORIENTA_VISION_NOTE.md)
- [Risk taxonomy](docs/risk_taxonomy.md)

## Current Focus

The near-term goal is not to build a full enterprise governance platform.

The current goal is to validate one concrete wedge:

```text
Objective and action governance for AI builders before agent execution.
```

Useful feedback:

- Is the decision understandable?
- Are the risk flags realistic?
- Is the safer instruction usable inside an agent workflow?
- Would you integrate this as an API, SDK, middleware, dashboard, or prompt tool?

## License

MIT
