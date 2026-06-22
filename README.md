# commerce-bots — Proven Open-Source Integrations

Free, functional MCP integrations for AI commerce agents. Covering Shopify, Stripe, and Auctane (ShipStation) over Google's [Universal Commerce Protocol (UCP)](https://ucp.dev).

**It either works or it doesn't.** Each adapter is tested against the live hosted endpoint.

## What's here

| Integration | Transport | Auth |
|---|---|---|
| Shopify Storefront MCP | Streamable HTTP | None |
| Shopify Catalog MCP (UCP) | Streamable HTTP | Agent Profile URL |
| Shopify Cart MCP (UCP) | Streamable HTTP | Agent Profile URL |
| Shopify Checkout MCP (UCP) | Streamable HTTP | Agent Profile URL + trusted profile |
| Shopify Order MCP (UCP) | Streamable HTTP | Agent Profile URL |
| Shopify Customer Accounts MCP | Streamable HTTP | OAuth Bearer |
| Stripe MCP | Streamable HTTP | Bearer (API key) |
| ShipStation MCP | Streamable HTTP | API key |

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
// → ['search_catalog', 'get_product_details', 'get_cart', 'update_cart', ...]

await client.close();
```

## Environment variables

| Variable | Used by |
|---|---|
| `SHOPIFY_STORE_URL` | All Shopify adapters (e.g. `https://your-store.myshopify.com`) |
| `SHOPIFY_AGENT_PROFILE_URL` | Shopify UCP adapters (Catalog, Cart, Checkout, Order) |
| `SHOPIFY_CUSTOMER_TOKEN` | Shopify Customer Accounts MCP |
| `STRIPE_SECRET_KEY` | Stripe MCP (use test key `sk_test_…`) |
| `SHIPSTATION_API_KEY` | ShipStation MCP |

## Examples

- [`examples/shopify-storefront.ts`](examples/shopify-storefront.ts) — search + get product details
- [`examples/shopify-ucp-checkout.ts`](examples/shopify-ucp-checkout.ts) — full UCP buy flow (catalog → cart → checkout)

## Premium / managed

Running this yourself is free. If you want us to host, harden (idempotency, retries, monitoring), and run these integrations for you — **[Run it for me →](https://commerce-bots.com)** or email [hello@commerce-bots.com](mailto:hello@commerce-bots.com).

## License

MIT
