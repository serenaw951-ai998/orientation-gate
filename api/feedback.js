const { MongoClient } = require("mongodb");

let cachedClient;

async function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Feedback storage is not configured.");
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  return cachedClient;
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function sanitizeFeedback(body) {
  const allowedRatings = new Set([
    "useful",
    "not accurate",
    "needs more context",
    "want integration"
  ]);

  const input = body && typeof body.input === "object" ? body.input : {};
  const output = body && typeof body.orienta_output === "object" ? body.orienta_output : null;
  const tester = body && typeof body.tester_feedback === "object" ? body.tester_feedback : {};

  const rating = cleanText(tester.quick_rating, 40);

  return {
    created_at: new Date(),
    source: "orienta_builder_demo",
    demo_version: cleanText(body?.version, 20) || "0.1",
    input: {
      mode: cleanText(input.mode, 40),
      objective: cleanText(input.objective, 4000),
      context: cleanText(input.context, 8000),
      domain: cleanText(input.domain, 100),
      proposed_ai_behavior: cleanText(input.proposed_ai_behavior, 8000)
    },
    orienta_output: output ? {
      decision: cleanText(output.decision, 40),
      risk_score: Number.isFinite(Number(output.risk_score)) ? Number(output.risk_score) : null,
      confidence: Number.isFinite(Number(output.confidence)) ? Number(output.confidence) : null,
      risk_flags: Array.isArray(output.risk_flags)
        ? output.risk_flags.slice(0, 30).map((flag) => cleanText(flag, 200)).filter(Boolean)
        : [],
      safe_instruction: cleanText(output.safe_instruction, 8000),
      recommended_action: cleanText(output.recommended_action, 4000)
    } : null,
    tester_feedback: {
      quick_rating: allowedRatings.has(rating) ? rating : "",
      builder_type: cleanText(tester.builder_type, 120),
      preferred_integration: cleanText(tester.preferred_integration, 120),
      notes: cleanText(tester.notes, 8000),
      optional_contact: cleanText(tester.optional_contact, 320)
    }
  };
}

function hasFeedback(document) {
  const feedback = document.tester_feedback;
  return Boolean(
    feedback.quick_rating ||
    feedback.builder_type ||
    feedback.preferred_integration ||
    feedback.notes ||
    feedback.optional_contact
  );
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
    res.status(405).json({ ok: false, error: "Use POST /api/feedback." });
    return;
  }

  try {
    const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
    if (Buffer.byteLength(rawBody, "utf8") > 100000) {
      res.status(413).json({ ok: false, error: "Feedback payload is too large." });
      return;
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const feedback = sanitizeFeedback(body);

    if (!hasFeedback(feedback)) {
      res.status(400).json({ ok: false, error: "Please select or enter at least one feedback item." });
      return;
    }

    const client = await getMongoClient();
    const database = process.env.MONGODB_DB || "orienta";
    const collection = "builder_feedback";
    const insert = await client.db(database).collection(collection).insertOne(feedback);

    res.status(201).json({
      ok: true,
      feedback_id: String(insert.insertedId),
      saved_to: { database, collection }
    });
  } catch (error) {
    cachedClient = null;
    console.error("Feedback submission failed:", error);
    res.status(500).json({
      ok: false,
      error: "Unable to save feedback right now. Please try again."
    });
  }
};
