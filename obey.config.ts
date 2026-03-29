import { createConfig } from "./src";

export default createConfig({
  baseURL: "http://localhost:12434/v1",
  model: "docker.io/ai/qwen3:8B-Q4_K_M",
  extensions: ["ts", "json"],
});
