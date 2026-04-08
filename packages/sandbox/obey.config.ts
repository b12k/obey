import { createConfig } from "@b12k/obey";

export default createConfig({
  baseURL: "http://localhost:12434/engines/v1",
  model: "ai/qwen2.5-coder",
  extensions: ["ts", "json"],
});
