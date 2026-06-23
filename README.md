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

## Premium / managed

Running this yourself is free. If you want us to host, harden (idempotency, retries, monitoring), and run these integrations for you — see **[Pricing →](https://commerce-bots.com/premium)** or email [hello@commerce-bots.com](mailto:hello@commerce-bots.com).

## License

MIT
