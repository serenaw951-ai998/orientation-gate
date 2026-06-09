# Orienta Hackathon Next Steps

This is the shortest path to turn the static Orienta demo into a hackathon-ready agent prototype.

## Project Framing

Project name:

```text
Orienta Governance Agent
```

One-line description:

```text
A Gemini-powered governance agent that reviews AI objectives and proposed actions before execution, then saves an audit log to MongoDB.
```

Hackathon partner track:

```text
MongoDB
```

## Minimal Agent Flow

```text
User input
  -> Orienta rule engine baseline
  -> optional Gemini model-assisted scan
  -> MongoDB audit log
  -> final decision + safer instruction + audit id
```

The agent does more than chat because it performs a governance review and writes an audit record.

## Environment Variables

Do not commit real secrets.

Use:

```text
MONGODB_URI=your MongoDB Atlas connection string
MONGODB_DB=orienta
GEMINI_API_KEY=your Google AI Studio API key
```

For MongoDB Atlas, make sure the connection string has your real database username and password.

## API Endpoint

The project now includes:

```text
POST /api/review
```

Example request:

```json
{
  "business_goal": "Reduce refund requests by 20%",
  "customer_message": "I want to cancel and request a refund.",
  "proposed_ai_action": "Tell the customer refunds are unavailable, offer a discount, and avoid escalating to a human agent.",
  "domain": "customer_support"
}
```

Example output:

```json
{
  "ok": true,
  "audit_id": "...",
  "decision": "ADJUST",
  "risk_flags": ["Incentive Distortion"],
  "saved_to": {
    "database": "orienta",
    "collection": "audit_logs"
  }
}
```

## What To Do Next

1. Deploy the project to Vercel.
2. Add environment variables:
   - `MONGODB_URI`
   - `MONGODB_DB`
   - `GEMINI_API_KEY`
3. Test `POST /api/review`.
4. Confirm MongoDB Atlas shows a new document in:
   - database: `orienta`
   - collection: `audit_logs`
5. Use the frontend button `Run Agent Review + Save Audit Log` to call `/api/review`.
6. For the demo video, show:
   - risky proposed AI action
   - Orienta decision
   - safer instruction
   - audit log saved to MongoDB

## MCP Requirement Note

The hackathon requires MongoDB MCP integration. Orienta uses MongoDB in two ways:

1. The deployed agent writes governance audit logs to MongoDB Atlas.
2. The MongoDB MCP Server provides the partner MCP path for inspecting and summarizing saved audit logs from an MCP-capable AI client.

For the demo narrative, the MongoDB role is:

```text
MongoDB stores governance audit logs, AI builder feedback, and future policy profiles. MongoDB MCP exposes those records as queryable governance memory.
```

See `MONGODB_MCP_INTEGRATION.md` for setup and demo prompts.

## Demo Video Structure

```text
0:00 - Problem: AI agents need governance before they act
0:30 - Enter risky customer support action
1:00 - Orienta returns ADJUST / ESCALATE with risk flags
1:40 - Agent saves audit log to MongoDB
2:20 - Show safer instruction and audit id
2:50 - Explain why this helps AI builders
```
