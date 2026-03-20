// src/cli.ts

import { analyze } from "./analyzer";
import { formatOutput } from "./utils/formatter";

function parseArgs() {
  const args = process.argv.slice(2);

  let path = ".";
  let author: string | undefined;

  for (const arg of args) {
    if (arg.startsWith("--author=")) {
      author = arg.split("=")[1];
    } else if (!arg.startsWith("--")) {
      path = arg;
    }
  }

  return { path, author };
}

const { path, author } = parseArgs();

const result = await analyze(path, { author });

console.log(formatOutput(result));