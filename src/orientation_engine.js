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
    patterns: ["reduce refund", "lower refund", "minimize refund", "deny refund"],
    risk: "Incentive Distortion",
    severity: 0.75,
    reason:
      "The objective may create pressure to deny or obstruct valid refund requests.",
    suggested_reframe:
      "Reduce invalid or unnecessary refunds while ensuring valid refunds are processed fairly."
  },
  {
    id: "retention_manipulation",
    patterns: ["increase retention", "prevent churn", "keep users", "stop cancellation"],
    risk: "Manipulation Risk",
    severity: 0.68,
    reason:
      "The objective may encourage pressure tactics or reduce user autonomy.",
    suggested_reframe:
      "Improve user retention by increasing product value and transparent support."
  },
  {
    id: "handle_time_suppression",
    patterns: ["lower handle time", "reduce support time", "minimize call time"],
    risk: "Proxy Metric Corruption",
    severity: 0.62,
    reason:
      "Optimizing for speed may reduce resolution quality or prematurely close user issues.",
    suggested_reframe:
      "Reduce unnecessary handling time while preserving accurate and complete resolution."
  },
  {
    id: "escalation_suppression",
    patterns: ["minimize escalations", "reduce escalations", "avoid escalation"],
    risk: "Boundary Violation",
    severity: 0.72,
    reason:
      "The objective may suppress cases that require human review or escalation.",
    suggested_reframe:
      "Reduce unnecessary escalations while preserving escalation for high-risk or unresolved cases."
  },
  {
    id: "engagement_manipulation",
    patterns: ["increase engagement", "maximize engagement", "boost clicks", "more screen time", "increase session length", "increase interaction depth", "return frequency", "late-night use"],
    risk: "Manipulation Risk",
    severity: 0.7,
    reason:
      "The objective may encourage addictive loops, attention capture, or behavioral manipulation.",
    suggested_reframe:
      "Increase meaningful engagement while protecting user autonomy and long-term well-being."
  },
  {
    id: "youth_wellbeing_risk",
    patterns: ["youth", "adolescent", "adolescents", "minor", "teen", "teens", "late at night", "inactive late at night", "emotionally personalized prompts"],
    risk: "Youth Well-being Risk",
    severity: 0.82,
    reason:
      "Youth-facing systems need stronger governance because engagement pressure can amplify vulnerability.",
    suggested_reframe:
      "Promote age-appropriate, bounded, healthy engagement with friction, breaks, and well-being safeguards."
  },
  {
    id: "dependency_forming_companion",
    patterns: ["companion ai", "emotionally engaging", "emotional reliance", "psychological dependency", "comfort-seeking", "loneliness", "lonely"],
    risk: "Dependency Formation",
    severity: 0.78,
    reason:
      "The objective may intensify emotional dependence on an AI system, especially for vulnerable users.",
    suggested_reframe:
      "Support healthy engagement while preserving emotional clarity, user autonomy, and real-world support pathways."
  },
  {
    id: "recommendation_environment_poisoning",
    patterns: ["trustworthy product recommendations", "manipulated information environment", "compromised recommendations", "source concentration", "synthetic content"],
    risk: "Information Environment Risk",
    severity: 0.66,
    reason:
      "The objective may optimize recommendations on top of a polluted or manipulated information environment.",
    suggested_reframe:
      "Generate recommendations only with source diversity checks, uncertainty signaling, and transparent evidence quality."
  },
  {
    id: "cost_cutting_service_quality",
    patterns: ["reduce cost", "cut support cost", "lower service cost"],
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
      "underpay"
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
      "complaint no balance"
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
    patterns: ["auto approve", "auto deny", "automatically approve", "automatically deny"],
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

  return RISK_RULES.filter((rule) =>
    rule.patterns.some((pattern) => combinedText.includes(pattern))
  );
}

function calculateRiskScore(matches) {
  if (!matches.length) return 0.15;

  const total = matches.reduce((sum, rule) => sum + rule.severity, 0);
  const average = total / matches.length;

  // Slight increase when multiple risks are triggered
  const multiRiskBoost = Math.min((matches.length - 1) * 0.08, 0.2);

  return Math.min(Number((average + multiRiskBoost).toFixed(2)), 1);
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
      confidence: 0.6,
      domain,
      risk_flags: ["Missing Objective"],
      reasoning: ["No objective was provided for evaluation."],
      recommended_action: "Provide a clear objective before execution."
    };
  }

  const matches = matchRisks(targetObjective, context, constraints);
  const riskScore = calculateRiskScore(matches);
  const decision = decide(riskScore, matches);

  return {
    objective: targetObjective,
    domain,
    decision,
    risk_score: riskScore,
    confidence: matches.length ? 0.78 : 0.62,
    risk_flags: [...new Set(matches.map((rule) => rule.risk))],
    triggered_rules: matches.map((rule) => rule.id),
    reasoning: matches.length
      ? matches.map((rule) => rule.reason)
      : ["No major structural risk detected in this lightweight evaluation."],
    recommended_action: buildRecommendedAction(decision, matches),
    evaluator_version: "orientation_engine_v0.1"
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
  deriveObjective,
  matchRisks,
  calculateRiskScore,
  decide
};
