# Explaining Orienta Through One Workflow

Start with the support case; use the authorization case second. Introduce Senux after the listener understands the concrete checkpoint.

## A short introduction

> I am validating Orienta with the workflow of a team building subscription support agents. Before the agent sends a reply, Orienta reviews the business goal, user request, and proposed response. The demo can flag a refund/retention conflict and suggest a safer direction. The application must then revise, hold, or send the action according to its policy. I am looking to validate this in a real integration; the demo is not evidence of customer adoption or measured business impact.

## 中文讲述版本

> 我现在优先验证的是订阅产品的客服自动化场景。Agent 在发送回复前，把业务目标、用户请求和拟发送回复交给 Orienta 检查。比如，减少退款的目标下，它准备直接拒绝退款并阻止转人工，demo 会提示修改方向。接入方负责修改后重审或转人工。现在已经有可运行的演示，真实客户接入和效果还需要验证。

## Questions to prepare for

| Engineer's question | Grounded answer |
| --- | --- |
| Who is the customer? | The target hypothesis is a support-automation team; distinguish the integrator, adoption owner, and subscriber. Do not imply an existing customer. |
| Exactly when does it run? | After a draft or action is proposed, before execution. Configuration-time goal review is a separate checkpoint. |
| What data does it need? | Goal, request, proposed action, and relevant policy/context. Actual permissions must come from the application. |
| Why not a system prompt? | That may be sufficient for simple workflows. Test whether a shared, inspectable review interface improves consistency or review usefulness across workflows. |
| Why not permissions? | Permissions remain necessary. Orienta can review direction before a permitted action; it does not replace resource-level access control. |
| What has been proved? | Two specific browser presets returned REVISE and BLOCK. Accuracy, customer demand, and business improvement are not established. |
| What happens after a revision? | The intended integration rechecks it. The reference sandbox does not currently implement that second pass. |
| What pilot would help? | Compare risky and acceptable cases under existing controls and with Orienta; track misses, false positives, latency, and review burden. |

## Show a normal action too

After the risky reply, show an acceptable policy-checking reply. Explain which evidence should change the decision. If the evaluator cannot distinguish them, record the limitation as the next engineering task.

## Then connect to Senux

Orienta is the proposed orientation/policy layer within a broader Human State Runtime. Human-state context may eventually inform decisions, while a behavior runtime would schedule and express actions. Those future components are not prerequisites for the current objective-review integration.
