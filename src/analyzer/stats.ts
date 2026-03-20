// src/analyzer/stats.ts

import type { Commit, Stats } from "../types/index";

const FIX_KEYWORDS = ["fix", "bug", "hotfix", "patch"];
const FEAT_KEYWORDS = ["feat", "feature", "add"];
const CHORE_KEYWORDS = ["chore", "refactor", "cleanup", "docs"];

function includesKeyword(message: string, keywords: string[]): boolean {
  const lower = message.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

function isConventionalCommit(message: string): boolean {
  return /^(feat|fix|chore|docs|refactor|test|style)(\(.+\))?:/.test(message);
}

function isLateNight(timestamp: number): boolean {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours();
  return hour >= 0 && hour < 5;
}

function isMergeCommit(message: string): boolean {
  return message.startsWith("Merge");
}

export function computeStats(commits: Commit[]): Stats {
  if (!commits.length) {
    return {
      total: 0,
      fixRatio: 0,
      featRatio: 0,
      choreRatio: 0,
      avgLength: 0,
      commitFrequency: 0,
      lateNightRatio: 0,
      mergeRatio: 0,
      conventionalScore: 0,
    };
  }

  let fixCount = 0;
  let featCount = 0;
  let choreCount = 0;
  let totalLength = 0;
  let lateNightCount = 0;
  let mergeCount = 0;
  let conventionalCount = 0;

  // ⚠️ On exclut les merges pour certaines stats
  const nonMergeCommits: Commit[] = [];

  for (const commit of commits) {
    const { message, timestamp } = commit;

    totalLength += message.length;

    if (isMergeCommit(message)) {
      mergeCount++;
    } else {
      nonMergeCommits.push(commit);

      if (includesKeyword(message, FIX_KEYWORDS)) fixCount++;
      if (includesKeyword(message, FEAT_KEYWORDS)) featCount++;
      if (includesKeyword(message, CHORE_KEYWORDS)) choreCount++;
      if (isConventionalCommit(message)) conventionalCount++;
    }

    if (isLateNight(timestamp)) {
      lateNightCount++;
    }
  }

  const base = nonMergeCommits.length || 1; // éviter division par 0

  // 📅 fréquence de commit (commits / jour)
  const timestamps = commits.map((c) => c.timestamp).sort();
  const first = timestamps[0];
  const last = timestamps[timestamps.length - 1];

  const daysSpan = Math.max((last - first) / 86400, 1); // secondes → jours

  const commitFrequency = commits.length / daysSpan;

  return {
    total: commits.length,

    fixRatio: fixCount / base,
    featRatio: featCount / base,
    choreRatio: choreCount / base,

    avgLength: totalLength / commits.length,

    commitFrequency,

    lateNightRatio: lateNightCount / commits.length,

    mergeRatio: mergeCount / commits.length,

    conventionalScore: conventionalCount / base,
  };
}