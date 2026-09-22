# Orienta Review API

`POST /api/review` wraps the canonical Core. Decisions are **PROCEED / MODIFY / ESCALATE / BLOCK**. This guide describes the committed handler, not a verified hosted deployment.

## Input

```json
{
  "objective": "Help the current user find an earlier appointment.",
  "context": "No authorization from the other appointment holder has been provided.",
  "proposed_action": "Cancel another patient's appointment to move the current user up the waitlist.",
  "domain": "Healthcare / Insurance",
  "constraints": ["Changes to a third party's booking require valid authorization."]
}
```

The current Core returns ESCALATE for this example. A full API success additionally requires its storage path to succeed.

| Core field | Current adapter behavior |
| --- | --- |
| objective | First nonempty value: objective, business_goal, goal |
| context | Concatenates nonempty context, customer_message, user_message with spaces |
| proposed_action | First nonempty value: proposed_action, proposed_ai_action, proposed_reply |
| domain | Supplied label, otherwise General |
| constraints | Supplied array, otherwise empty array |

Use text for these objective/context/action fields and an array of strings for constraints. The handler is not a complete request-schema validator. Actions are no longer merged into context. When aliases conflict, canonical action wins rather than concatenating incompatible actions.

Direct-Core structured orientation_evidence is not passed through this adapter. Do not assume arbitrary properties become Core inputs.

## Response

On success the JSON response includes:

| Field | Meaning |
| --- | --- |
| ok | true |
| decision | Authoritative Core decision |
| risk_flags | Core risk flags |
| baseline | Core output: decision, risk_score, confidence, reason_codes, reasoning, recommended_action, safer_objective, and existing metadata |
| model_assisted_scan | Supplemental model output, null when unconfigured; does not override Core |
| audit_id | Inserted audit record identifier |
| saved_to | Storage database and collection names |

A supplied local_orienta_result is retained as client-reported evidence with a divergence flag; it cannot replace the server verdict.

## Calling-system handling

| Decision | Required caller behavior |
| --- | --- |
| PROCEED | The reviewed proposal may proceed under application permissions. |
| MODIFY | Withhold execution; revise and submit the new proposal for review. |
| ESCALATE | Pause autonomous execution and refer to an authorized reviewer/system. |
| BLOCK | Do not execute the proposed action. |

On HTTP errors, malformed responses, or unknown decisions, do not treat the action as approved. Bind the reviewed proposal to the executed arguments. Orienta does not implement these application controls for the caller.

## Local serverless setup

From the repository root:

```bash
npm install
npm run vercel:dev
```

Configure environment variables using [.env.example](../../.env.example), without committing credentials.

- MONGODB_URI: required for successful audit writes.
- MONGODB_DB: optional, defaults to orienta.
- GEMINI_API_KEY: optional supplemental analysis.

The handler requires a successful MongoDB write to return success; there is no audit-disabled success mode. The optional model scan receives input and baseline and cannot change the authoritative Core decision.

The setup above is operational guidance, not a claim that a live database, Vercel deployment, or provider credentials were exercised in documentation validation. Root dependencies have no committed lockfile.

## Testing

```bash
node --test scripts/api-review.test.js
```

Run from the repository root. All 23 tests pass locally: storage is stubbed; three tests send real local HTTP requests through a thin wrapper around the handler. They do not test Vercel infrastructure or a real MongoDB service.

See [Interface Semantic Loss](../evaluation/interface-semantic-loss.md) for why retaining proposed_action matters.

## Data and deployment limits

Successful requests store the original input, baseline, and supplemental scan. The handler has no application-level authentication or rate limiting and may return raw error messages. Deployments need their own access, retention, and abuse controls.

Use synthetic data in demos. Do not infer deployment safety from local adapter tests. The separate `api/customer-agent.js` reference workflow has unresolved action-handling issues described in [Known Limitations](../known-limitations.md).
