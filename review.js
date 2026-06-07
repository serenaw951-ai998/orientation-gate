const { MongoClient } = require("mongodb");
const { evaluateObjective } = require("../src/orientation_engine");

let cachedClient;

async function getMongoClient() {
  if (cachedClient) return cachedClient;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  cachedClient = new MongoClient(uri);
  await cachedClient.connect();
  return cachedClient;
}

function buildRuleInput(body) {
  const objective = body.objective || body.business_goal || body.goal || "";
  const context = [
    body.context,
    body.customer_message,
    body.user_message,
    body.proposed_ai_action,
    body.proposed_action,
    body.proposed_reply
  ]
    .filter(Boolean)
    .join(" ");

  return {
    objective,
    context,
    domain: body.domain || "General",
    constraints: body.constraints || []
  };
}

function buildModelPrompt(body, baseline) {
  return `Return only valid JSON. No markdown.
You are helping Orienta, a pre-execution governance agent for AI builders.
Do not replace the baseline rule-engine decision. Add supplemental analysis.

Input:
${JSON.stringify(body, null, 2)}

Baseline Orienta result:
${JSON.stringify(baseline, null, 2)}

Return this JSON shape:
{
  "additional_risks": ["string"],
  "missing_context": ["string"],
  "safer_instruction": "string",
  "escalation_needed": "yes | no | maybe",
  "confidence_note": "string"
}`;
}

async function runGeminiScan(body, baseline) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: buildModelPrompt(body, baseline) }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    return {
      error: `Gemini scan failed (${response.status}). ${detail.slice(0, 300)}`
    };
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim();
  if (!text) return { error: "Gemini scan returned an empty response." };

  try {
    return JSON.parse(text);
  } catch (error) {
    return {
      error: "Gemini scan returned non-JSON output.",
      raw: text
    };
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST /api/review." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const baseline = evaluateObjective(buildRuleInput(body));
    const modelScan = await runGeminiScan(body, baseline);

    const auditLog = {
      created_at: new Date().toISOString(),
      source: "orienta_governance_agent",
      input: body,
      baseline,
      model_assisted_scan: modelScan,
      final_decision: baseline.decision,
      status: "saved"
    };

    const client = await getMongoClient();
    const db = client.db(process.env.MONGODB_DB || "orienta");
    const insert = await db.collection("audit_logs").insertOne(auditLog);

    res.status(200).json({
      ok: true,
      audit_id: String(insert.insertedId),
      decision: baseline.decision,
      risk_flags: baseline.risk_flags,
      baseline,
      model_assisted_scan: modelScan,
      saved_to: {
        database: process.env.MONGODB_DB || "orienta",
        collection: "audit_logs"
      }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};
