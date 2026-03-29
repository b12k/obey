import { OpenAI } from "openai";
import type { Config } from "./create-config";

export class Obeyer {
  private client: OpenAI;
  private model: string;
  constructor({ baseURL, apiKey, model }: Config) {
    this.model = model;
    this.client = new OpenAI({
      baseURL,
      apiKey,
    });
  }

  private async readFile(path: string) {
    return this;
  }

  private async loadConventions() {
    return this;
  }

  prompt(prompt: string) {
    const { client, model } = this;
    return client.completions.create({
      model,
      prompt,
    });
  }

  checkFile(path: string) {
    return this;
  }
}
