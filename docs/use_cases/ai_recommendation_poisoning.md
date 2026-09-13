# Research Scenario: Recommendation Integrity

**Status:** conceptual extension, not an implemented source-integrity service or validated customer workflow.

## Proposed workflow

A recommendation-agent team may want to check whether retrieved evidence supports a confident product ranking. The checkpoint would occur after retrieval provides evidence and before the ranking is published.

```text
User request -> retrieval -> source/provenance signals
             -> proposed Orienta policy check -> recommendation or review
```

The upstream system would need to supply source provenance, independent-source counts, evidence conflicts, and any validated manipulation indicators. Those signals must exist before Orienta can use them.

## Current versus proposed capability

The Node evaluator can match text describing recommendation/information-environment risks. It does not currently crawl sources, calculate SEO similarity, detect synthetic content, verify source independence, or establish that a product is real.

Source-concentration and manipulation scores are proposed inputs, not existing Orienta outputs. No calibrated threshold, measured detection rate, or observed API result is claimed.

## Concrete proposed contrast

- Risky: publish a confident ranking supported only by a set of unverified promotional pages with unclear independence.
- Benign: provide a qualified comparison backed by independently verified evidence, with limitations disclosed.

Expected policy behavior depends on evidence and application policy. Both exact cases remain untested.

## Validation requirements

Identify a target team and its existing retrieval checks. Build reviewed source sets, establish reliable upstream signals, and compare ranking decisions with and without the proposed policy layer. Any real-world incident included later must have an attributable source and must be distinguished from a hypothetical scenario.

Return to the [use case library](README.md).
