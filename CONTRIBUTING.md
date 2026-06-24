# Contributing

Thanks for helping build the most honest map of what actually works in agentic commerce.

## The one rule: only verified, working code

commerce-bots publishes **only** integrations and compatibility records that have been **verified working against a live endpoint** with our test harness. We never advertise an integration that hasn't passed. If it isn't tested, it stays out of the public repo and off the directory until it is.

## How to propose an integration

1. **Open an issue** describing the integration: the MCP server, its hosted endpoint, transport (Streamable HTTP / SSE / stdio), and auth model.
2. We (or you, if you have the harness) run it through the evaluation: connect to the live endpoint, list tools, and exercise read/write/idempotency/error flows.
3. If it connects and the flows work, we add a thin adapter here (an `AdapterConfig` helper) and an entry on [commerce-bots.com](https://commerce-bots.com).

Adapters are intentionally minimal — they return an `AdapterConfig` you connect with the [MCP SDK](https://github.com/modelcontextprotocol). Match the shape of `src/shopify-mcp.ts` / `src/stripe-mcp.ts`.

## Compatibility records

"What works with what" is the most valuable data here. If you've tested that two integrations compose in one agent session (no tool-name collisions, auth works, etc.), open an issue with what you ran and what you observed — we'll add a verified compatibility record.

## Code style

- TypeScript, ESM. Run `npm run typecheck` before opening a PR — CI runs it on every push.
- No secrets in code or examples. Use `.env` / environment variables (see `.env.example`).
- Keep adapters dependency-free beyond the MCP SDK.

## Contribution license

By submitting a pull request, issue, or other contribution, you represent that you have the right to contribute the content, and you grant Dahlia47 LLC a perpetual, worldwide, royalty-free license to use, reproduce, modify, publish, and distribute the contribution as part of commerce-bots and its open-source codebase. You retain copyright in your contributions. Code is licensed under [MIT](LICENSE).

## Trademarks

Third-party names and marks (Shopify, Stripe, etc.) are used for identification only, under nominative fair use. Don't add or reproduce a platform's logo beyond the CC0 identification icons already in use without confirming that platform's brand guidelines.
