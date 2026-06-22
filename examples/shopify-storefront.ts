// Example: Shopify Storefront MCP — search catalog and get product details
// Run: SHOPIFY_STORE_URL=https://your-store.myshopify.com npx tsx examples/shopify-storefront.ts

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { getShopifyStorefrontConfig } from "../src/shopify-mcp.js";

async function main() {
  const config = getShopifyStorefrontConfig();
  const client = new Client({ name: "commerce-bots-example", version: "1.0.0" });

  const transport = new StreamableHTTPClientTransport(new URL(config.url!), {
    requestInit: { headers: config.headers },
  });
  await client.connect(transport);

  const { tools } = await client.listTools();
  console.log("Available tools:", tools.map((t) => t.name).join(", "));

  const result = await client.callTool({
    name: "search_catalog",
    arguments: { query: "t-shirt", limit: 5 },
  });
  console.log("Search result:", JSON.stringify(result.content, null, 2));

  await client.close();
}

main().catch(console.error);
