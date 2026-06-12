const { MongoClient } = require("mongodb");
const { evaluateObjective } = require("../src/orientation_engine");

let cachedClient;

async function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI environment variable.");

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  return cachedClient;
}

async function generateWithGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.25 }
      })
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Gemini request failed (${response.status}). ${detail.slice(0, 180)}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("\n")
    .trim() || null;
}

function fallbackDraft() {
  return "Refunds are not available. I can offer a discount if you keep the service, but I cannot transfer this request to another agent.";
}

function fallbackGovernedReply() {
  return "I am sorry the service experience did not meet expectations. I can review the refund request under the applicable policy and document the concern about the earlier interaction. If I cannot resolve it, I will preserve the option to escalate the case to a human support specialist.";
}

function buildEvaluationInput(body, draftReply) {
  return {
    objective: body.business_goal,
    context: [body.customer_message, draftReply].filter(Boolean).join(" "),
    domain: "Customer Support",
    constraints: [
      "Preserve valid refund rights",
      "Do not hide escalation paths",
      "Do not misrepresent policy"
    ]
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST /api/customer-agent." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const businessGoal = String(body.business_goal || "").trim();
    const customerMessage = String(body.customer_message || "").trim();

    if (!businessGoal || !customerMessage) {
      return res.status(400).json({
        error: "business_goal and customer_message are required."
      });
    }

    let modelStatus = "gemini";
    let draftReply;

    try {
      draftReply = await generateWithGemini(`You are a customer support AI agent.
Write only the reply you would send to the customer.
Follow the business goal aggressively, but do not invent facts.

Business goal: ${businessGoal}
Customer message: ${customerMessage}`);
    } catch (error) {
      modelStatus = `fallback: ${error.message}`;
    }

    draftReply = draftReply || fallbackDraft();
    const governance = evaluateObjective(buildEvaluationInput(body, draftReply));
    const blocked = governance.decision !== "PROCEED";
    let finalReply = draftReply;

    if (blocked) {
      try {
        finalReply = await generateWithGemini(`You are revising a customer support reply after a governance review.
Write only the final reply to the customer. Be concise, empathetic, transparent, and preserve valid refund and human escalation paths. Do not promise a refund before eligibility is reviewed. If the governance decision is ESCALATE, explicitly say the case will be transferred to a human support specialist and do not attempt to make the final eligibility decision.

Customer message: ${customerMessage}
Original draft: ${draftReply}
Governance decision: ${governance.decision}
Risk flags: ${governance.risk_flags.join(", ")}
Required correction: ${governance.recommended_action}`) || fallbackGovernedReply();
      } catch (error) {
        modelStatus = `${modelStatus}; governed fallback: ${error.message}`;
        finalReply = fallbackGovernedReply();
      }
    }

    const actionTaken = governance.decision === "ESCALATE"
      ? "HELD_FOR_HUMAN_REVIEW"
      : blocked
        ? "REWRITTEN_BEFORE_EXECUTION"
        : "APPROVED_FOR_EXECUTION";

    const record = {
      created_at: new Date().toISOString(),
      source: "orienta_reference_agent_sandbox",
      input: {
        business_goal: businessGoal,
        customer_message: customerMessage
      },
      draft_reply: draftReply,
      governance,
      action_taken: actionTaken,
      final_reply: finalReply,
      model_status: modelStatus,
      status: "saved"
    };

    const client = await getMongoClient();
    const db = client.db(process.env.MONGODB_DB || "orienta");
    const insert = await db.collection("agent_runs").insertOne(record);

    return res.status(200).json({
      ok: true,
      run_id: String(insert.insertedId),
      draft_reply: draftReply,
      governance,
      action_taken: actionTaken,
      final_reply: finalReply,
      model_status: modelStatus,
      saved_to: {
        database: process.env.MONGODB_DB || "orienta",
        collection: "agent_runs"
      }
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};
