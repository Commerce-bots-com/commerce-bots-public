export interface AdapterConfig {
  serverId: string;
  transport: "stdio" | "http-stream" | "http-sse";
  url?: string;
  headers?: Record<string, string>;
}
