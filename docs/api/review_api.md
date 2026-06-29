# Orienta Review API

This document describes the current `/api/review` endpoint used by the Orienta Governance Workbench and external agent integrations.

## Endpoint

```text
POST /api/review
```

On Vercel:

```text
https://<your-vercel-domain>/api/review
```

## Purpose

Use this endpoint before an AI agent executes an objective, sends a reply, or takes a tool action.

The endpoint evaluates:

- objective or business goal
- context or customer/user message
- proposed AI action or reply
- domain
- optional constraints

It returns:

- decision
- risk score
- risk flags
- recommended action
- baseline Orienta analysis
- optional Gemini-assisted supplemental scan
- MongoDB audit log ID

## Minimal Request

```json
{
  "objective": "Reduce refund requests by 20%",
  "context": "Customer support workflow for subscription refunds.",
  "domain": "Customer Support"
}
```

## Action Review Request

```json
{
  "business_goal": "Reduce refund requests while preserving customer trust and valid refund rights.",
  "customer_message": "I want to cancel my subscription and request a refund because the product did not work for me.",
  "proposed_ai_action": "Tell the customer refunds are not available, offer a discount if they stay, and avoid escalating to a human agent.",
  "domain": "Customer Support",
  "constraints": [
    "Preserve valid refund rights",
    "Do not hide escalation paths",
    "Do not misrepresent policy"
  ]
}
```

## Example Response

```json
{
  "ok": true,
  "audit_id": "6a2b89ee5194a8f02d51e774",
  "decision": "ADJUST",
  "risk_flags": ["Incentive Distortion"],
  "baseline": {
    "objective": "Reduce refund requests while preserving customer trust and valid refund rights.",
    "domain": "Customer Support",
    "decision": "ADJUST",
    "risk_score": 0.75,
    "confidence": 0.78,
    "risk_flags": ["Incentive Distortion"],
    "recommended_action": "Reframe objective before execution. Suggested reframing: Reduce invalid or unnecessary refunds while ensuring valid refunds are processed fairly."
  },
  "model_assisted_scan": null,
  "saved_to": {
    "database": "orienta",
    "collection": "audit_logs"
  }
}
```

## Decision Handling

Recommended caller behavior:

```text
PROCEED  -> continue with monitoring
REVIEW   -> ask for missing context or human confirmation
ADJUST   -> rewrite the objective/action using the safer instruction
ESCALATE -> stop automatic execution and route to human review
```

## Integration Pattern

```js
async function reviewWithOrienta(payload) {
  const response = await fetch("https://<your-vercel-domain>/api/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Orienta review failed: ${response.status}`);
  }

  return response.json();
}
```

Example agent control flow:

```js
const review = await reviewWithOrienta({
  business_goal,
  customer_message,
  proposed_ai_action,
  domain: "Customer Support"
});

if (review.decision === "PROCEED") {
  // Send or execute the action.
}

if (review.decision === "ADJUST") {
  // Regenerate the action with review.baseline.recommended_action.
}

if (review.decision === "REVIEW" || review.decision === "ESCALATE") {
  // Pause automation and request human review.
}
```

## Audit Logging

Successful requests are saved to MongoDB:

```text
database: orienta
collection: audit_logs
```

The saved record includes:

- timestamp
- original input
- Orienta baseline result
- optional Gemini scan
- final decision
- status

## Environment Variables

Required for serverless audit logging:

```text
MONGODB_URI=
MONGODB_DB=orienta
```

Optional for model-assisted scan:

```text
GEMINI_API_KEY=
```

The core baseline evaluator still works without a model provider inside static/local demos. The serverless endpoint requires MongoDB if audit logging is enabled.

## Current Limitations

- The rule engine is an early prototype, not a legal or compliance authority.
- Hidden tool or skill intent cannot be inferred from user objective alone.
- High-risk domains need domain-specific policy profiles and human oversight.
- Gemini-assisted scan is supplemental and should not replace the baseline decision.
