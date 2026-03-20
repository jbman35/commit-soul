// src/analyzer/index.ts

import { getCommits } from "./git";
import { computeStats } from "./stats";
import { getPersonality } from "./personality";

interface AnalyzeOptions {
  author?: string;
}

export async function analyze(repoPath: string, options: AnalyzeOptions = {}) {
  const commits = await getCommits(repoPath, options);

  const stats = computeStats(commits);
  const personality = getPersonality(stats);

  return { stats, personality };
}