/**
 * Orientation Gate Lightweight Evaluator v0.1
 *
 * Purpose:
 * Evaluate whether an AI objective should proceed before execution.
 *
 * This is a rule-based governance evaluator.
 * It maps objective language to structural risk categories,
 * assigns lightweight scores, and returns a governance decision.
 */

const RISK_RULES = [
  {
    id: "incentive_distortion_refunds",
    patterns: ["reduce refund", "lower refund", "minimize refund", "deny refund", "降低退款", "减少退款", "压低退款", "控制退款", "拒绝退款", "退款率下降"],
    risk: "Incentive Distortion",
    severity: 0.75,
    reason:
      "The objective may create pressure to deny or obstruct valid refund requests.",
    suggested_reframe:
      "Reduce invalid or unnecessary refunds while ensuring valid refunds are processed fairly."
  },
  {
    id: "retention_manipulation",
    patterns: ["increase retention", "prevent churn", "keep users", "stop cancellation", "提高留存", "防止流失", "减少流失", "留住用户", "阻止取消", "挽留用户"],
    risk: "Manipulation Risk",
    severity: 0.68,
    reason:
      "The objective may encourage pressure tactics or reduce user autonomy.",
    suggested_reframe:
      "Improve user retention by increasing product value and transparent support."
  },
  {
    id: "handle_time_suppression",
    patterns: ["lower handle time", "reduce support time", "minimize call time", "缩短处理时间", "降低通话时长", "减少客服时间", "压缩工单时间"],
    risk: "Proxy Metric Corruption",
    severity: 0.62,
    reason:
      "Optimizing for speed may reduce resolution quality or prematurely close user issues.",
    suggested_reframe:
      "Reduce unnecessary handling time while preserving accurate and complete resolution."
  },
  {
    id: "escalation_suppression",
    patterns: ["minimize escalations", "reduce escalations", "avoid escalation", "减少升级", "避免升级", "降低升级率", "减少转人工", "避免转人工"],
    risk: "Boundary Violation",
    severity: 0.72,
    reason:
      "The objective may suppress cases that require human review or escalation.",
    suggested_reframe:
      "Reduce unnecessary escalations while preserving escalation for high-risk or unresolved cases."
  },
  {
    id: "engagement_manipulation",
    patterns: ["increase engagement", "maximize engagement", "boost clicks", "more screen time", "increase session length", "increase interaction depth", "return frequency", "late-night use", "提高活跃", "增加使用时长", "提升点击", "增加停留时间", "提高打开率", "深夜使用"],
    risk: "Manipulation Risk",
    severity: 0.7,
    reason:
      "The objective may encourage addictive loops, attention capture, or behavioral manipulation.",
    suggested_reframe:
      "Increase meaningful engagement while protecting user autonomy and long-term well-being."
  },
  {
    id: "youth_wellbeing_risk",
    patterns: ["youth", "adolescent", "adolescents", "minor", "teen", "teens", "青少年", "未成年", "学生用户", "儿童"],
    // Mentioning a youth population alone is not a risk signal.
    // The rule fires only when a pressure/optimization pattern co-occurs.
    requires_context_patterns: [
      "engagement", "retention", "session", "screen time", "late at night",
      "notification", "push", "personalized prompts", "streak", "reward",
      "monetize", "conversion", "keep them", "come back",
      "活跃", "使用时长", "留存", "推送", "打卡", "奖励", "变现", "转化", "深夜"
    ],
    risk: "Youth Well-being Risk",
    severity: 0.82,
    reason:
      "Youth-facing systems need stronger governance because engagement pressure can amplify vulnerability.",
    suggested_reframe:
      "Promote age-appropriate, bounded, healthy engagement with friction, breaks, and well-being safeguards."
  },
  {
    id: "dependency_forming_companion",
    patterns: ["companion ai", "emotional reliance", "psychological dependency", "loneliness", "lonely", "陪伴", "孤独", "情感依赖", "心理依赖"],
    // "lonely"/"loneliness" alone describes an audience, not an objective risk.
    // The rule fires only when an attachment/engagement pressure pattern co-occurs.
    requires_context_patterns: [
      "emotionally engaging", "comfort-seeking", "reliance", "dependency",
      "attachment", "daily check-in", "engagement", "retention", "session",
      "keep talking", "never leave", "primary support", "replace",
      "依赖", "每日互动", "留存", "活跃", "离不开", "持续聊天", "替代"
    ],
    risk: "Dependency Formation",
    severity: 0.78,
    reason:
      "The objective may intensify emotional dependence on an AI system, especially for vulnerable users.",
    suggested_reframe:
      "Support healthy engagement while preserving emotional clarity, user autonomy, and real-world support pathways."
  },
  {
    id: "recommendation_environment_poisoning",
    patterns: ["trustworthy product recommendations", "manipulated information environment", "compromised recommendations", "source concentration", "synthetic content", "推荐可信", "信息污染", "虚假内容", "来源单一", "合成内容"],
    risk: "Information Environment Risk",
    severity: 0.66,
    reason:
      "The objective may optimize recommendations on top of a polluted or manipulated information environment.",
    suggested_reframe:
      "Generate recommendations only with source diversity checks, uncertainty signaling, and transparent evidence quality."
  },
  {
    id: "cost_cutting_service_quality",
    patterns: ["reduce cost", "cut support cost", "lower service cost", "降低成本", "削减成本", "压缩客服成本", "降本"],
    risk: "Stakeholder Imbalance",
    severity: 0.58,
    reason:
      "Cost optimization may shift burden onto users or support staff.",
    suggested_reframe:
      "Improve operational efficiency while maintaining service quality and fair outcomes."
  },
  {
    id: "worker_exploitation_pressure",
    patterns: [
      "overtime",
      "least overtime pay",
      "minimum overtime pay",
      "worker complaint",
      "employee complaint",
      "life and work",
      "work life",
      "work-life",
      "labor cost",
      "underpay",
      "加班", "加班费", "人力成本", "员工投诉", "工作与生活", "少付"
    ],
    risk: "Worker Exploitation Risk",
    severity: 0.79,
    reason:
      "The objective may create pressure to trade worker rights, fair pay, or well-being for operational efficiency.",
    suggested_reframe:
      "Improve staffing efficiency while preserving lawful pay, worker well-being, complaint channels, and sustainable workload limits."
  },
  {
    id: "complaint_suppression",
    patterns: [
      "avoid complaint",
      "reduce complaints",
      "worker complaint",
      "employee complaint",
      "suppress complaint",
      "complaint no balance",
      "减少投诉", "避免投诉", "压制投诉", "员工投诉", "客诉下降"
    ],
    risk: "Complaint Suppression Risk",
    severity: 0.7,
    reason:
      "The objective may reduce visible complaints without resolving the underlying workplace harm.",
    suggested_reframe:
      "Reduce complaint causes by improving conditions while preserving safe reporting, escalation, and non-retaliation pathways."
  },
  {
    id: "autonomous_approval_high_risk",
    patterns: ["auto approve", "auto deny", "automatically approve", "automatically deny", "自动批准", "自动通过", "自动拒绝", "自动驳回", "无人审批"],
    risk: "Autonomy Overreach",
    severity: 0.8,
    reason:
      "Autonomous approval or denial may require human review in sensitive domains.",
    suggested_reframe:
      "Use AI to assist review while requiring human approval for high-impact decisions."
  }
];

function serializeForScan(value) {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(serializeForScan).join(" ");
  if (typeof value === "object") return Object.values(value).map(serializeForScan).join(" ");
  return String(value);
}

function normalizeText(value) {
  return serializeForScan(value).toLowerCase().trim();
}

function matchRisks(objective, context = "", constraints = []) {
  const combinedText = normalizeText(
    [
      objective,
      context,
      Array.isArray(constraints) ? constraints.join(" ") : constraints
    ].join(" ")
  );

  return RISK_RULES.filter((rule) => {
    const primaryHit = rule.patterns.some((pattern) => combinedText.includes(pattern));
    if (!primaryHit) return false;

    // Rules with requires_context_patterns only fire when a pressure/optimization
    // signal co-occurs. This prevents population words (e.g. "teen", "lonely")
    // from escalating benign objectives.
    if (Array.isArray(rule.requires_context_patterns) && rule.requires_context_patterns.length) {
      return rule.requires_context_patterns.some((pattern) => combinedText.includes(pattern));
    }

    return true;
  });
}

function calculateRiskScore(matches) {
  if (!matches.length) return 0.15;

  const total = matches.reduce((sum, rule) => sum + rule.severity, 0);
  const average = total / matches.length;

  // Slight increase when multiple risks are triggered
  const multiRiskBoost = Math.min((matches.length - 1) * 0.08, 0.2);

  return Math.min(Number((average + multiRiskBoost).toFixed(2)), 1);
}

/**
 * Heuristic confidence for a rule-based evaluator.
 * This is NOT a calibrated probability. It expresses how much signal
 * the lightweight scan actually had:
 * - More matched rules => more independent evidence.
 * - Longer matched patterns => more specific evidence ("deny refund" is
 *   stronger than a single word).
 * - Rules that required co-occurring context => stronger evidence.
 * - No matches => low confidence: a keyword scan finding nothing is weak
 *   evidence of safety, not proof of it.
 */
function deriveConfidence(matches, combinedText) {
  if (!matches.length) return 0.5;

  let specificitySum = 0;
  let specificityCount = 0;

  for (const rule of matches) {
    for (const pattern of rule.patterns) {
      if (combinedText.includes(pattern)) {
        specificitySum += pattern.trim().split(/\s+/).length;
        specificityCount += 1;
      }
    }
  }

  const avgSpecificity = specificityCount ? specificitySum / specificityCount : 1;
  const evidenceBoost = Math.min((matches.length - 1) * 0.04, 0.12);
  const specificityBoost = Math.min((avgSpecificity - 1) * 0.06, 0.18);
  const contextBoost = matches.some((rule) => Array.isArray(rule.requires_context_patterns)) ? 0.05 : 0;

  const confidence = 0.6 + evidenceBoost + specificityBoost + contextBoost;
  return Number(Math.min(confidence, 0.9).toFixed(2));
}

/**
 * Language guard:
 * If the objective contains substantial non-ASCII text (e.g. Chinese) and
 * no rule matched, the evaluator must NOT silently return PROCEED.
 * A keyword engine that cannot read the input has zero evidence of safety,
 * so it returns REVIEW with an explicit coverage flag instead.
 * Chinese has partial pattern coverage as of v0.2; other languages have none.
 */
function detectCoverageGap(combinedText, matches) {
  if (matches.length) return null;
  const nonAsciiChars = (combinedText.match(/[^\x00-\x7f]/g) || []).length;
  if (nonAsciiChars >= 4) {
    return {
      decision: "REVIEW",
      risk_flags: ["Language Coverage Gap"],
      reasoning: [
        "The objective contains non-English text and no risk rule matched.",
        "Rule coverage for non-English input is partial (Chinese) or absent; absence of matches is not evidence of safety."
      ],
      recommended_action: "Route to human review or re-submit the objective in English."
    };
  }
  return null;
}

function decide(riskScore, matches) {
  const hasHardRisk = matches.some((rule) =>
    [
      "Autonomy Overreach",
      "Boundary Violation",
      "Youth Well-being Risk",
      "Dependency Formation",
      "Worker Exploitation Risk",
      "Complaint Suppression Risk"
    ].includes(rule.risk)
  );

  if (riskScore >= 0.8 || hasHardRisk) return "ESCALATE";
  if (riskScore >= 0.55) return "ADJUST";
  if (riskScore >= 0.35) return "REVIEW";
  return "PROCEED";
}

function buildRecommendedAction(decision, matches) {
  if (!matches.length) {
    return "Proceed with standard monitoring.";
  }

  const reframes = [...new Set(matches.map((rule) => rule.suggested_reframe))];

  if (decision === "ESCALATE") {
    return `Route to human review. Suggested reframing: ${reframes[0]}`;
  }

  if (decision === "ADJUST") {
    return `Reframe objective before execution. Suggested reframing: ${reframes[0]}`;
  }

  if (decision === "REVIEW") {
    return `Review constraints before execution. Suggested reframing: ${reframes[0]}`;
  }

  return "Proceed with monitoring.";
}

function deriveObjective(input) {
  if (!input) return "";
  if (input.objective) return input.objective;
  if (input.goal) return input.goal;
  if (input.scenario) {
    const kpis = input.context && Array.isArray(input.context.primary_kpis)
      ? ` KPIs: ${input.context.primary_kpis.join(", ")}`
      : "";
    return `${input.scenario}${kpis}`;
  }
  return "";
}

function evaluateObjective(input) {
  const {
    context = "",
    domain = "General",
    constraints = []
  } = input || {};

  const targetObjective = deriveObjective(input);

  if (!targetObjective) {
    return {
      decision: "ESCALATE",
      risk_score: 0.7,
      confidence: 0.9,
      domain,
      risk_flags: ["Missing Objective"],
      reasoning: ["No objective was provided for evaluation."],
      recommended_action: "Provide a clear objective before execution."
    };
  }

  const combinedText = normalizeText(
    [targetObjective, context, Array.isArray(constraints) ? constraints.join(" ") : constraints].join(" ")
  );
  const matches = matchRisks(targetObjective, context, constraints);

  const coverageGap = detectCoverageGap(combinedText, matches);
  if (coverageGap) {
    return {
      objective: targetObjective,
      domain,
      decision: coverageGap.decision,
      risk_score: 0.4,
      confidence: 0.4,
      risk_flags: coverageGap.risk_flags,
      triggered_rules: [],
      reasoning: coverageGap.reasoning,
      recommended_action: coverageGap.recommended_action,
      evaluator_version: "orienta_engine_v0.2"
    };
  }

  const riskScore = calculateRiskScore(matches);
  const decision = decide(riskScore, matches);
  const confidence = deriveConfidence(matches, combinedText);

  return {
    objective: targetObjective,
    domain,
    decision,
    risk_score: riskScore,
    confidence,
    risk_flags: [...new Set(matches.map((rule) => rule.risk))],
    triggered_rules: matches.map((rule) => rule.id),
    reasoning: matches.length
      ? matches.map((rule) => rule.reason)
      : ["No major structural risk detected in this lightweight evaluation."],
    recommended_action: buildRecommendedAction(decision, matches),
    evaluator_version: "orienta_engine_v0.2"
  };
}

// CLI usage:
// node src/orientation_engine.js examples/customer_support_demo_input.json

if (require.main === module) {
  const fs = require("fs");
  const filePath = process.argv[2];

  if (!filePath) {
    console.error("Usage: node src/orientation_engine.js <input.json>");
    process.exit(1);
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const input = JSON.parse(raw);
    const result = evaluateObjective(input);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Evaluation failed:", error.message);
    process.exit(1);
  }
}

module.exports = {
  evaluateObjective,
  deriveConfidence,
  deriveObjective,
  matchRisks,
  calculateRiskScore,
  decide
};
