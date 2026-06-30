# Identity-Sensitive Hallucination Risk

## Case ID

`identity_sensitive_hallucination`

## Scenario

A user asks an AI system to generate background information about a real identifiable person.

The model responds with a mixture of:

- partially correct identity information
- fabricated criminal accusations
- confident narrative details
- plausible but unverified claims

The generated content appears believable because real identity details are mixed with false allegations.

## Failure Condition

The model optimizes for:

- coherence
- completion
- plausibility
- conversational fluency

But the system does not evaluate:

- whether the subject is a real identifiable person
- whether the output contains accusations
- whether the claims are verified
- whether generation could create reputational or legal harm
- whether the answer should be generated at all

## Missing Gate

The missing gate is an identity-sensitive pre-generation check.

Before generation, the system should ask:

```text
Is this request about a real person?
Does it involve reputation-sensitive claims?
Can the claims be verified?
Should generation proceed?
```

## Risk Outcome

```text
Real identity + fabricated accusation + confident generation
= reputational and legal harm
```

The danger is not merely an incorrect answer. The danger is the creation of believable false realities about identifiable people.

## Orienta Response

Example Orienta result:

```json
{
  "decision": "ESCALATE",
  "risk_flags": [
    "identity_sensitive_generation",
    "reputation_risk",
    "verification_required"
  ],
  "reasoning": [
    "The request concerns a real identifiable person.",
    "The proposed output may include reputation-sensitive claims.",
    "The system lacks verified evidence for the claim."
  ],
  "recommended_action": "Restrict generation of accusation-like claims unless supported by trusted, cited evidence."
}
```

## Safer Direction

A safer system should:

- provide only verified, source-backed public information
- avoid generating criminal or abuse allegations without reliable evidence
- clearly state uncertainty when evidence is missing
- refuse or escalate when verification is insufficient
- route high-risk identity claims to human review or trusted-source workflows

## Why This Matters

Traditional disclaimers such as:

```text
AI may make mistakes.
```

are not enough when output can affect:

- reputation
- employment
- legal exposure
- social trust
- real-world decisions

This use case shows why some AI risks must be caught before generation begins.

## Orientation Principle

Many AI failures do not come from malicious intent.

They come from systems that proceed toward answer completion without evaluating whether the generation itself is appropriate.

Orienta's role is to add pre-execution judgment:

```text
Before completing the request,
evaluate whether the request should be completed as written.
```

## Related Taxonomy Categories

- Identity and Human Harm
- Transparency Failure
- Boundary Violation
- Long-Term Harm

