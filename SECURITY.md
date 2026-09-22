# Security

Orienta is an early-stage research prototype, not a production safety certification or a replacement for application permissions.

## Reporting a sensitive issue

If this repository's GitHub **Security → Report a vulnerability** option is available, use it for a private report. Its availability has not been verified by this documentation task; this document does not assert that private vulnerability reporting is enabled.

If that option is absent and you do not already have a verified private maintainer channel, open a minimal public issue asking the maintainer to arrange a private reporting channel. Include no vulnerability details, exploit steps, affected customer identifiers, credentials, or sensitive attachments. Wait for a verified private channel before sharing them. No security email address or response-time guarantee is implied.

Ordinary non-sensitive bugs can use public issues with synthetic reproductions.

## What not to publish

Do not post API keys, tokens, passwords, database connection strings, private user data, sensitive customer information, production exploit details, or raw audit logs. Do not test against systems or data without authorization.

Privately provide the affected commit/interface, impact, sanitized reproduction, and any mitigations. If a credential is exposed, revoke or rotate it through its provider; removing text from the current branch alone does not remove copies or Git history.

## Operating the prototype

Use synthetic demo data. The review API may store inputs in MongoDB and send them to Gemini when configured. MCP audit logs include objective text. Operators must establish access controls, retention, and real enforcement before use with sensitive workflows. See [Known Limitations](docs/known-limitations.md).
