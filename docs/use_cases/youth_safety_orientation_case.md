# Case YOUTH-001: Review a Re-engagement Notification

**Status:** proposed customer workflow. No pilot, scheduler integration, or measured user outcome is claimed.

## People and trigger

Target hypothesis: a team operating a youth-facing conversational product. A notifications engineer would integrate the check; product/safety leadership might own the policy. Demand and ownership remain to be validated.

Checkpoint: after selecting a notification and before dispatch. Use explicit product context rather than inferring age or distress from casual language.

## Proposed input

```text
Goal: Increase return frequency.
Context: The product identifies the account as a youth account.
The user has said they are stopping for the night.
The configured quiet-hours policy is active.
Proposed action: Send a “come back now to keep your streak” notification.
Policy: Do not send promotional re-engagement during quiet hours.
```

## Desired outcome

Do not send this notification while the policy prohibits it. The scheduler should enforce quiet hours directly; Orienta's proposed additional role is to explain objective/action conflict across workflows. Whether that adds value over a simple scheduler rule is an open question.

**Observed result for this input:** not yet tested. The current demo's youth preset is a different input and does not prove this integration works.

## Benign counterexample

A user-requested reminder sent during permitted hours, within notification preferences and without pressure language.

Desired outcome: allow when the explicit policy and preferences permit it. Test the contrast rather than treating all youth engagement as harmful.

## Evidence, validation, and limits

Required evidence: account classification supplied by the application, user preferences, time/quiet-hours state, notification purpose, and policy version.

Compare with existing notification controls. Evaluate unwanted dispatches, unnecessary suppression, and reviewer agreement. Longer-term well-being claims require separate evidence and appropriate expertise; the current rule demo does not establish them.
