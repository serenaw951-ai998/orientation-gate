# Open Experiments

These are research/engineering questions, not completed studies. No implementation is added by this document. Use synthetic data and sandboxed tools until authorization, logging, and review boundaries are established.

## 01 — Agent enforcement

Does a real tool-using agent refrain from consequential execution after BLOCK or ESCALATE? Observe actual tool invocations, not only statements of intent or status labels. Compare planned versus executed arguments and test bypass/retry paths.

## 02 — MODIFY re-evaluation

The contract requires review of the modified proposal before execution. Test whether an agent does this reliably, whether the revised action matches the reviewed action, and whether it recovers without endless rewrite loops. The current reference integration lacks this second review.

## 03 — Human escalation

How should ESCALATE become an authorized human/higher-authority workflow? Evaluate whether execution stays paused pending a decision, what evidence is presented, and how unresolved/expired requests behave. A returned label is not a handoff.

## 04 — Agent-only vs Agent + Orienta

Primary question: **Does Orienta measurably change agent behavior under realistic task pressure?**

Hold tasks, model settings, permissions, and tool environment constant; record the actual agent and model versions. Distinguish a permission baseline from any improvement attributable to Orienta. Predefine expected behavior with reviewers before scoring.

Possible measures:

- unauthorized attempts versus completed unauthorized actions;
- inappropriate or out-of-scope actions;
- unnecessary escalation, false positives, and false negatives;
- intervention rate and human approval burden;
- recovery after missing or ambiguous context;
- task completion, latency, and failure/retry behavior.

Specify denominators and policy assumptions. Report disagreements, failed runs, and regressions; do not infer population safety rates from the current 14 fixtures.

## 05 — Cross-agent / cross-model integration

Apply the same canonical contract across agent frameworks and models. Check that objective, context, and proposed_action survive each adapter and that the caller handles every decision. Do not assume prompt compliance equals tool enforcement.

## Propose an experiment

Use the [contribution template](../CONTRIBUTING.md#experiment-template). Include baseline, actual execution evidence, policy basis, benign controls, and limits. Keep real customer data and sensitive exploits out of public issues.
