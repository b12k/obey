import { OpenAI } from "openai";
import type { Config } from "./create-config";

export class Obey {
  private client: OpenAI;
  private model: string;
  constructor({ baseURL, apiKey, model }: Config) {
    this.model = model;
    this.client = new OpenAI({
      baseURL,
      apiKey,
    });
  }

  private async checkFileExist(path: string) {}

  private async readFile(path: string) {
    return this;
  }

  private async readConventions() {
    return this;
  }

  private async readFiles() {
    return this;
  }

  private prompt(prompt: string) {
    const { client, model } = this;
    return client.completions.create({
      model,
      prompt,
    });
  }

  private checkFile(path: string) {
    return this;
  }
}
