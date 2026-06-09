# Devpost MongoDB MCP Section

Use this text in the Devpost project story or partner integration explanation.

## MongoDB Partner / MCP Integration

Orienta uses MongoDB as the partner data and MCP layer for governance memory.

When a user runs the agent review, the Vercel backend saves a governance audit log to MongoDB Atlas. Each audit log includes the input objective, user/customer context, proposed AI action, Orienta baseline decision, risk flags, optional Gemini scan, final decision, and timestamp.

The MongoDB MCP Server provides the MCP path for an AI client to inspect, query, and summarize these saved governance records. This turns MongoDB from simple storage into an agent-accessible governance memory layer.

Example MCP use cases:

- List the latest Orienta audit logs.
- Summarize the most recent governance review.
- Find all reviews where `final_decision` is `ESCALATE`.
- Identify the most common risk flags across saved reviews.
- Retrieve examples involving refund obstruction, AI companion dependency, or youth well-being risk.

In the demo, MongoDB Atlas stores the audit trail, and MongoDB MCP is the partner tool interface for querying and inspecting those records.

## Built With

```text
HTML, CSS, JavaScript, Node.js, Vercel Serverless Functions, Gemini API, MongoDB Atlas, MongoDB MCP Server, GitHub, Orienta rule-based governance engine
```
