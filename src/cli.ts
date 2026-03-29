#!/usr/bin/env node

import { cosmiconfig } from "cosmiconfig";
import minimist from "minimist";
import { configSchema } from "./create-config";
import type { Config } from "./create-config";
import picomatch from "picomatch";
import { renderPrompt } from "./prompts";
import { Obeyer } from "./client";
import { glob } from "glob";

const { _: providedFiles, ...configArgs } = minimist(process.argv.slice(2));

if (!providedFiles.length) {
  console.error("Provide files to obey!");
  process.exit(1);
}

const configFile = await cosmiconfig("obey").search();
const config = configSchema.parse({
  ...configFile?.config,
  ...configArgs,
});

let files = providedFiles;
if (files[0] === ".") {
  files = await glob(`**/*.{${config.extensions.join(",")}}`, {
    ignore: config.ignore,
  });
}

console.log({ files });
