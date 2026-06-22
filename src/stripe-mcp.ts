import type { AdapterConfig } from "./types.js";

// Stripe MCP — hosted at mcp.stripe.com over Streamable HTTP.
// Tools include: create_payment_intent, confirm_payment_intent, retrieve_balance, list_customers, …
// NOTE: duplicate-on-retry risk — Stripe's hosted MCP does not enforce idempotency keys by default.
// Required env: STRIPE_SECRET_KEY (use test key sk_test_… during development)
// Docs: https://docs.stripe.com/mcp · https://mcp.stripe.com

export function getStripeMcpConfig(): AdapterConfig {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  return {
    serverId: "stripe-mcp-official",
    transport: "http-stream",
    url: "https://mcp.stripe.com",
    headers: { Authorization: `Bearer ${key}` },
  };
}
