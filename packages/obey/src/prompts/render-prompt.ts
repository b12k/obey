import { Eta } from "eta";
import path from "node:path";

type File = {
  name: string;
  content: string;
};

export type SystemPromptArgs = {
  foo: string;
};

export type UserPromptArgs = {
  files: Array<File>;
  conventions: Array<File>;
};

const eta = new Eta({
  views: path.resolve(import.meta.dirname),
});

const promptTypesTemplates = {
  system: "system.prompt.eta",
  user: "user.prompt.eta",
};

export function renderPrompt(type: "system", args?: SystemPromptArgs): string;
export function renderPrompt(type: "user", args: UserPromptArgs): string;
export function renderPrompt(
  type: "system" | "user",
  args?: SystemPromptArgs | UserPromptArgs,
) {
  return eta.render(promptTypesTemplates[type], args ?? {});
}
