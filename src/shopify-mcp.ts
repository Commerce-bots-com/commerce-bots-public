import type { AdapterConfig } from "./types.js";

// Shopify Storefront MCP
// Every Shopify store exposes a hosted Streamable-HTTP endpoint at {store}/api/mcp.
// Tools: search_catalog, get_product_details, get_cart, update_cart, search_shop_policies_and_faqs
// Auth: none (buyer/storefront scoped)
// Required env: SHOPIFY_STORE_URL (e.g. https://your-store.myshopify.com)
// Docs: https://shopify.dev/docs/apps/build/storefront-mcp

export function getShopifyStorefrontConfig(): AdapterConfig {
  const storeUrl = (process.env.SHOPIFY_STORE_URL || "").replace(/\/$/, "");
  if (!storeUrl) throw new Error("SHOPIFY_STORE_URL not set (e.g. https://your-store.myshopify.com)");
  return { serverId: "shopify-mcp-official", transport: "http-stream", url: `${storeUrl}/api/mcp` };
}
