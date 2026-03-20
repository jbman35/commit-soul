// src/analyzer/git.ts

import type { Commit } from "../types";

interface GitOptions {
  author?: string;
}

export async function getCommits(
  repoPath: string,
  options: GitOptions = {}
): Promise<Commit[]> {
  const { author } = options;

  const args = [
    "git",
    "log",
    "--pretty=format:%s|%ct|%an|%ae",
  ];

  if (author) {
    args.push(`--author=${author}`);
  }

  const proc = Bun.spawn(args, {
    cwd: repoPath,
    stdout: "pipe",
    stderr: "pipe",
  });

  const output = await new Response(proc.stdout).text();

  if (!output.trim()) {
    console.warn("⚠️ No commits found for this author");
    return [];
  }

  return output.split("\n").map((line) => {
    const [message, timestamp, name, email] = line.split("|");

    return {
      message,
      timestamp: Number(timestamp),
      authorName: name,
      authorEmail: email,
    };
  });
}