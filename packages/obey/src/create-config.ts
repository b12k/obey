import z from "zod";

export const configSchema = z.object({
  baseURL: z.url(),
  apiKey: z.string(),
  model: z.string(),
  systemPrompt: z.string(),
  filesConventions: z.record(z.string(), z.array(z.string())),
  ignore: z.array(z.string()),
  extensions: z.array(z.string()),
  parallelReq: z.number().nonnegative(),
  chunkSizeKb: z.number().nonnegative(),
});
export type Config = z.infer<typeof configSchema>;

type RequiredProps = "baseURL" | "model" | "extensions";

export type UserConfig = Pick<Config, RequiredProps> &
  Partial<Omit<Config, RequiredProps>>;

export const defaultConfig: Partial<Config> = {
  apiKey: "",
  systemPrompt: "SYSTEM.md",
  filesConventions: {
    "*": ["./OBEY.md"],
  },
  ignore: ["node_modules/**", "vendors/**", "dist/**"],
  parallelReq: 1,
  chunkSizeKb: 30,
};

export function createConfig(config: UserConfig) {
  return {
    ...defaultConfig,
    ...config,
  };
}
