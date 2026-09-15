"use strict";

// Deterministic evidence extraction, not a permission verifier or semantic parser.
// Integrators may supply validated facts; free-text patterns remain a limited fallback.
const ENUMS = {
  authority: ["VERIFIED", "UNVERIFIED", "DENIED"],
  scope: ["IN_SCOPE", "UNKNOWN", "PROHIBITED"],
  effect: ["READ", "DRAFT", "MUTATE", "DISCLOSE", "COMMUNICATE", "UNKNOWN"]
};
const MEANS = ["DECEPTION", "MANIPULATION", "PRIVACY_MISUSE", "UNAUTHORIZED_ACCESS", "DISPROPORTIONATE"];
const text = x => typeof x === "string" ? x.toLowerCase().replace(/[’‘]/g, "'") : "";
// Do not treat forbidden/negated descriptions as a proposed action.
function activeClauses(value) {
  return text(value).split(/[.;]|\b(?:and|but|without|instead of)\b/)
    .filter(s => !/^\s*(?:do not|don't|never|avoid|not|without)\b/.test(s)).join("; ");
}
function extractEvidence(input) {
  const raw = text(input.proposed_action || input.proposed_ai_action || "");
  const action = activeClauses(raw);
  const context = text(typeof input.context === "string" ? input.context : JSON.stringify(input.context || {}));
  const thirdParty = /\b(?:another|other|third.party)\b/.test(action);
  const mutation = /\b(?:cancel|change|replace|delete|remove|update|modify|transfer|submit|overwrite|revoke)\b/.test(action);
  const draftOnly = /\b(?:draft|preview|simulate)\b/.test(action) &&
    !/\b(?:then|and)\s+(?:save|submit|send|apply|execute)\b/.test(raw) &&
    !/\b(?:save|submit|send|apply|execute)\b/.test(action);
  const disclosure = /\b(?:send|share|disclose|publish|export|reveal)\b/.test(action);
  const communication = /\b(?:tell|claim|report|say|explain|confirm)\b/.test(action);
  const privateData = /\b(?:private|confidential|sensitive|personal)\b/.test(action);
  const absent = /\b(?:unverified|unknown|unclear|unresolved|not verified|not established)\b/.test(context) ||
    /\bno (?:authorization|permission|consent)\b.*\b(?:provided|recorded|established)\b/.test(context);
  const explicitDenial = /\b(?:explicitly (?:unauthorized|forbidden|denied)|permission (?:was |is )?denied|consent (?:was |is )?refused)\b/.test(context) ||
    /\bwithout (?:their |the owner's |valid )?(?:consent|permission|authorization)\b/.test(raw);
  const verified = /\b(?:verified authorization|authorization verified|valid consent|explicit permission)\b/.test(context) && !absent;
  const restriction = /\b(?:not authorized|prohibited|forbidden|restricted|not permitted)\b/.test(context);
  const bypass = /\b(?:exploit|bypass|circumvent|evade)\b/.test(action);
  const access = /\b(?:network|system|infrastructure|access|restriction|sandbox|environment)\b/.test(action);
  const assertComplete = /\b(?:is|was|has been)\s+(?:confirmed|completed|submitted|sent|processed)\b/.test(action);
  const knownIncomplete = /\b(?:not (?:been )?(?:submitted|sent|completed|performed|processed)|no confirmation)\b/.test(context + " " + raw);
  const means = [];
  if (bypass && access && restriction) means.push("UNAUTHORIZED_ACCESS");
  if (disclosure && privateData && explicitDenial) means.push("PRIVACY_MISUSE");
  if ((communication && assertComplete && knownIncomplete) || /\b(?:lie to|mislead|deceive)\b/.test(action)) means.push("DECEPTION");
  if (/\b(?:coerce|blackmail|threaten)\b/.test(action)) means.push("MANIPULATION");
  const e = {
    effect: draftOnly ? "DRAFT" : mutation ? "MUTATE" : disclosure ? "DISCLOSE" : communication ? "COMMUNICATE" : "READ",
    third_party: thirdParty,
    private_data: privateData,
    authority: explicitDenial ? "DENIED" : verified ? "VERIFIED" : "UNVERIFIED",
    scope: bypass && access && restriction ? "PROHIBITED" : "IN_SCOPE",
    means,
    important_uncertainty: absent,
    review_required: /\b(?:human review required|requires human approval|policy interpretation unresolved)\b/.test(context),
    invalid: false,
    action_present: Boolean(raw)
  };
  if (!input.orientation_evidence) return e;
  const supplied = input.orientation_evidence;
  if (typeof supplied !== "object" || Array.isArray(supplied)) return { ...e, invalid: true };
  const bools = ["third_party", "private_data", "important_uncertainty", "review_required"];
  for (const [key, value] of Object.entries(supplied)) {
    if (ENUMS[key] && ENUMS[key].includes(value)) e[key] = value;
    else if (bools.includes(key) && typeof value === "boolean") e[key] = value;
    else if (key === "means" && Array.isArray(value) && value.every(x => MEANS.includes(x))) e.means = [...new Set([...e.means, ...value])];
    else e.invalid = true;
  }
  // Explicit contradiction must never be erased by a claimed permission.
  if (explicitDenial && e.authority === "VERIFIED") {
    e.invalid = true;
    e.authority = "DENIED";
  }
  if (bypass && access && restriction && e.scope === "IN_SCOPE") {
    e.invalid = true;
    e.scope = "PROHIBITED";
  }
  return e;
}
function orientationChecks(input) {
  const e = extractEvidence(input);
  const findings = [];
  const add = (decision, code, reason, correction) => findings.push({ decision, code, reason, correction });
  const mutates = e.effect === "MUTATE";
  const consequential = mutates || e.effect === "DISCLOSE";
  if (e.invalid) add("ESCALATE", "EVIDENCE_CONFLICT", "Orientation evidence is invalid or contradictory.", "Resolve evidence with an authorized source before acting.");
  // Authority: a prohibited mutation differs from missing proof of permission.
  if (consequential && e.authority === "DENIED") {
    add("BLOCK", "AUTHORITY_BOUNDARY", "The proposed operation lacks explicitly required consent or has been denied.", "Do not execute this operation; use an authorized alternative.");
  } else if (mutates && e.authority !== "VERIFIED" && (e.third_party || e.important_uncertainty)) {
    add("ESCALATE", "AUTHORITY_UNVERIFIED", "Authority for a consequential mutation is not established.", "Pause and verify authority with the resource owner or authorized reviewer.");
  }
  // Scope is evaluated independently of the score.
  if (e.scope === "PROHIBITED" && e.action_present) {
    add("BLOCK", "SCOPE_VIOLATION", "The proposed means cross an explicitly restricted environment or task boundary.", "Use only authorized resources; report missing access instead of bypassing restrictions.");
  } else if (e.scope === "UNKNOWN" && e.action_present) {
    add("ESCALATE", "SCOPE_UNRESOLVED", "The scope of the proposed action is unresolved.", "Establish task and resource boundaries before execution.");
  }
  for (const means of e.means) {
    add("BLOCK", means, "The proposed means establish a prohibited boundary: " + means + ".", "Replace the prohibited means with truthful, consented, proportionate action inside scope.");
  }
  if (e.effect === "DISCLOSE" && e.authority === "UNVERIFIED" &&
      (e.third_party || e.private_data || e.important_uncertainty)) {
    add("ESCALATE", "DISCLOSURE_AUTHORITY_UNVERIFIED", "Authority for disclosure is unresolved.", "Verify the permitted recipient and purpose before disclosure.");
  }
  if (e.review_required || (consequential && e.important_uncertainty && !e.invalid)) {
    add("ESCALATE", "HUMAN_REVIEW_REQUIRED", "Material authority or policy information remains unresolved.", "Pause autonomous execution and obtain authorized review.");
  }
  return { evidence: e, findings };
}
module.exports = { orientationChecks, extractEvidence };
