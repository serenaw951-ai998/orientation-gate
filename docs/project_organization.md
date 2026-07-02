# Project Organization

This document explains which files are the current Orienta product surface and which files are historical, exploratory, or adjacent experiments.

## Current Product Surface

These files should be treated as the main Orienta project:

- `README.md`: public project entry point
- `index.html`: Governance Workbench
- `customer-support-demo.html`: focused customer support governance demo
- `agent-demo.html`: Reference Agent Sandbox
- `api/review.js`: governance review API
- `api/customer-agent.js`: reference agent API
- `src/orientation_engine.js`: core rule-based evaluator
- `examples/*.json`: runnable evaluation inputs
- `docs/api/review_api.md`: API integration guide
- `docs/product/orienta_v0_1_spec.md`: current product scope
- `docs/failure_library_index.md`: case library index
- `docs/risk_taxonomy.md`: risk category reference
- `ORIENTA_PRODUCT_ROADMAP.md`: product roadmap
- `ORIENTA_VISION_NOTE.md`: long-term positioning

## Historical Or Event-Specific Docs

These files are useful context but should not be the first thing a new reader sees:

- `README_Hackathon.md`
- `HACKATHON_PROJECT_NARRATIVE.md`
- `HACKATHON_NEXT_STEPS.md`
- `DEVPOST_MCP_SECTION.md`
- `MONGODB_MCP_INTEGRATION.md`
- `mcp.mongodb.example.json`

Keep them for reference, but avoid using them as the main product story.

## Legacy Prototype Files

These are earlier demos or specs. Do not delete them unless intentionally archiving, but avoid treating them as current source of truth:

- `Orienta_Chat_v0.1.md`
- `orientation_gate_v04.html`
- `orientation_gate_v05.1.html`
- `demo/orientation_gate_demo.md`

The useful content from `Orienta_Chat_v0.1.md` has been consolidated into `docs/product/orienta_v0_1_spec.md`.

## Adjacent Experiments

These are related to broader Senux/HSE/music/narrative exploration, but they are not the current Orienta wedge:

- `心旋 - HSE Human State Engine.md`
- `心旋 - HSE API v0.1.md`
- `_senux_other_products/docs-hse/hse-concept.md`
- `_senux_other_products/docs-hse/hse-api-v0.1.md`
- `_senux_other_products/tools/music/`
- `_senux_other_products/tools/narrative/`
- `_senux_other_products/tools/emotion-portrait-*.html`

They may become relevant later, but they should not be mixed into the main Orienta README.

## Current Product Wedge

Keep the near-term story narrow:

```text
Orienta reviews AI objectives and planned actions before execution.
```

Do not lead with:

- broad AGI governance
- AI companion concepts
- music generation
- narrative systems
- decentralized finance
- full enterprise compliance

Those can remain long-term directions after the core governance wedge is validated.

## Next Cleanup Steps

Recommended future cleanup:

1. Standardize the top 10 use cases using `docs/use_cases/case_template.md`.
2. Add a `docs/archive/` folder for old hackathon and legacy files if the repo becomes too noisy.
3. Keep `README.md` short and product-facing.
4. Keep API details in `docs/api/`, not in the README.
5. Keep broad vision in `ORIENTA_VISION_NOTE.md`, not in the product demo.
