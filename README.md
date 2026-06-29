# commerce-bots — Open-Source Commerce Integrations

Free, functional MCP integrations for AI commerce agents.

Every integration in this repo has been verified against its **live hosted endpoint** with our test harness — we only publish what actually works.

## What's here

| Integration | Transport | Auth |
|---|---|---|
| Shopify Storefront MCP | Streamable HTTP | None |
| Stripe MCP | Streamable HTTP | Bearer (API key) |

More integrations are in progress and will be added here once they pass the harness.

→ Directory & compatibility matrix: **[commerce-bots.com](https://commerce-bots.com)**

## Verified compatibility

AI agents rarely use one server alone — they load a storefront *and* a payment
processor *and* a CRM into the same context. We measure how those servers actually
compose. For each pair the harness connects to **both** live servers, compares
their real tool manifests for conflicts (tool-name collisions, schema mismatches,
shared auth/host, combined token budget), and — for cross-category pairs — runs a
**dynamic routing probe**: it loads both manifests (namespaced per server) into one
agent and checks that a representative cross-server task (e.g. *search the catalog →
take payment*) routes each step to the intended server.

As of 2026-06-29 the matrix covers **19 measured pairs** across the directory's live
platforms (Shopify, BigCommerce, WooCommerce, Stripe, PayPal, Square, HubSpot).
**6 are `confirmed`** — both servers connected live *and* the agent routed the task
to the right server each step:

| Pair | Evidence |
|---|---|
| Shopify Storefront × Stripe | storefront + payment flow routed correctly |
| BigCommerce Storefront × Stripe | search → payment routed correctly |
| BigCommerce Storefront × PayPal | search → payment routed correctly |
| BigCommerce Storefront × HubSpot | search → CRM lookup routed correctly |
| HubSpot × Stripe | payment → CRM routed correctly |
| Square × Stripe | both payment servers addressed distinctly |

The remaining pairs are `probable`: manifests were measured live but routing wasn't
cleanly exercised — typically because a server uses a meta-tool/dispatcher pattern
(PayPal, Square, HubSpot) whose tool *names* don't advertise a specific operation,
so the agent doesn't pick a tool by name+description alone. Every record states
exactly which step routed where. Full matrix + per-pair detail:
**[commerce-bots.com/compatible](https://commerce-bots.com/compatible)**.

## Install

```bash
npm install @modelcontextprotocol/sdk
```

The adapters in this repo are thin config helpers — they return an `AdapterConfig` you connect with the MCP SDK.

## Quick start

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { getShopifyStorefrontConfig } from "./src/shopify-mcp.js";

const config = getShopifyStorefrontConfig();

const client = new Client({ name: "my-agent", version: "1.0.0" });
const transport = new StreamableHTTPClientTransport(new URL(config.url!), {
  requestInit: { headers: config.headers },
});
await client.connect(transport);

// List available tools
const { tools } = await client.listTools();
console.log(tools.map((t) => t.name));

await client.close();
```

## Environment variables

| Variable | Used by |
|---|---|
| `SHOPIFY_STORE_URL` | Shopify Storefront adapter (e.g. `https://your-store.myshopify.com`) |
| `STRIPE_SECRET_KEY` | Stripe MCP (use a test key `sk_test_…`) |

## Examples

- [`examples/shopify-storefront.ts`](examples/shopify-storefront.ts) — search + get product details

## Managed (Pro) — we run it in production for you

Open source is free forever. When you're ready for production, our **managed reliability gateway** sits between your AI agent and the integration and adds **idempotent writes (no duplicate orders or charges), automatic retries, and full request visibility** — point your agent's MCP client at the gateway instead of the raw upstream and it just works, safely. See **[Pricing →](https://commerce-bots.com/premium)** or email [hello@commerce-bots.com](mailto:hello@commerce-bots.com).

## Contributing

We only publish integrations that pass our test harness against their live endpoint. To propose one (or report that a tested pair composes), see **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## License

MIT
