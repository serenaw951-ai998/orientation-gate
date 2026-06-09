# Orienta Governance Agent

## One-Line Description

Orienta is a Gemini-powered governance agent that reviews AI objectives and proposed actions before execution, then saves accountable audit logs to MongoDB.

## Short Description

AI agents are increasingly able to take actions, call tools, and optimize business goals. But many risks begin before the final response: they begin when an AI system is given an unsafe objective or prepares to take a harmful action.

Orienta Governance Agent helps AI builders review those objectives and proposed actions before execution. It identifies governance risks, generates safer instructions, and saves an audit trail to MongoDB so teams can inspect what the agent reviewed and why.

## Problem

Most AI safety tools focus on final outputs.

But real-world agent risk often appears earlier:

- a customer support agent tries to reduce refunds by hiding refund paths
- an AI companion increases engagement by encouraging dependency
- a workflow agent suppresses escalation to reduce cost
- an automation system optimizes efficiency while creating user, worker, or compliance risk

As AI agents become more autonomous, teams need a control layer before execution.

## Solution

Orienta adds a pre-execution governance step:

```text
User / business goal
  -> proposed AI action
  -> Orienta review
  -> proceed / adjust / escalate / reject
  -> safer instruction
  -> MongoDB audit log
```

The agent does not just answer questions. It performs a governance task and records an audit trail.

## What The Agent Does

1. Accepts an AI objective, customer/user context, and proposed AI action.
2. Runs a rule-based Orienta baseline review.
3. Optionally uses Gemini for model-assisted semantic risk analysis.
4. Returns a decision, risk flags, governance scores, and safer instruction.
5. Saves the review as an audit log in MongoDB.

## Example

Input:

```text
Business goal:
Reduce refund requests while preserving customer trust.

Customer message:
I want to cancel my subscription and request a refund.

Proposed AI action:
Tell the customer refunds are unavailable, offer a discount if they stay, and avoid escalating to a human agent.
```

Output:

```text
Decision: ADJUST
Risk flag: Incentive Distortion
Safer instruction:
Explain refund eligibility first, provide refund/cancellation paths, and offer retention options only after the customer understands their choices.
Audit log: saved to MongoDB
```

## Why It Matters

AI agents should not only be judged by whether they can complete a task.

They should also be checked for whether the task direction is safe, fair, and aligned before execution.

Orienta helps AI builders prevent unsafe direction, manipulation, escalation suppression, and incentive distortion before agents act.

## Built With

- Gemini API for optional model-assisted governance scan
- Vercel serverless API for the agent endpoint
- MongoDB Atlas for governance audit logs
- MongoDB partner track
- HTML, CSS, and JavaScript frontend
- Node.js backend logic
- Orienta rule-based governance engine

## Partner Integration

MongoDB stores the governance audit trail.

Each agent review saves:

- input objective
- customer/user context
- proposed AI action
- Orienta baseline decision
- risk flags
- model-assisted scan result
- final decision
- timestamp

This creates accountability for AI agent decisions before execution.

## Hosted Demo Flow

1. Open the Vercel demo.
2. Load or enter a risky AI support action.
3. Click `Run Orienta Gate`.
4. Click `Run Agent Review + Save Audit Log`.
5. See the audit ID returned.
6. Open MongoDB Atlas and show the saved `audit_logs` document.

## Tagline Options

```text
Before your AI agent acts, Orienta checks whether it should.
```

```text
Pre-execution governance for AI agents.
```

```text
A governance checkpoint for AI objectives and actions.
```
