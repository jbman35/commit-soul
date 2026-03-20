// src/analyzer/personality.ts

import type { Stats } from "../types";

interface Personality {
  type: string;
  emoji: string;
  description: string;
  score: number;
}

function scoreFirefighter(stats: Stats): number {
  return (
    stats.fixRatio * 0.6 +
    stats.lateNightRatio * 0.3 +
    (1 - stats.mergeRatio) * 0.1
  );
}

function scoreArchitect(stats: Stats): number {
  return (
    stats.featRatio * 0.5 +
    (stats.avgLength / 100) * 0.3 +
    stats.conventionalScore * 0.2
  );
}

function scoreJanitor(stats: Stats): number {
  return stats.choreRatio;
}

function scoreSniper(stats: Stats): number {
  return (
    (1 - stats.commitFrequency / 10) * 0.6 +
    (1 - stats.avgLength / 50) * 0.4
  );
}

function scoreNightOwl(stats: Stats): number {
  return stats.lateNightRatio;
}

function scoreIntegrator(stats: Stats): number {
  return stats.mergeRatio;
}

function scorePerfectionist(stats: Stats): number {
  return (
    (stats.avgLength / 100) * 0.6 +
    stats.commitFrequency / 10 * 0.4
  );
}

function scoreConventional(stats: Stats): number {
  return stats.conventionalScore;
}

function scoreMadScientist(stats: Stats): number {
  return (
    stats.featRatio * 0.4 +
    stats.fixRatio * 0.4 +
    (1 - stats.conventionalScore) * 0.2
  );
}

function scoreSlowBurner(stats: Stats): number {
  return 1 - stats.commitFrequency / 5;
}

function scoreChaos(stats: Stats): number {
  return (
    (1 - stats.conventionalScore) * 0.5 +
    (1 - stats.avgLength / 50) * 0.5
  );
}

function scoreZen(stats: Stats): number {
  const variance =
    Math.abs(stats.fixRatio - stats.featRatio) +
    Math.abs(stats.choreRatio - stats.featRatio);

  return 1 - variance;
}

export function getPersonality(stats: Stats) {
  const personalities: Personality[] = [
    {
      type: "Firefighter",
      emoji: "🔥",
      description:
        "You jump from fire to fire. Reactive, fast, slightly chaotic.",
      score: scoreFirefighter(stats),
    },
    {
      type: "Architect",
      emoji: "🧱",
      description:
        "You build things with intention. Structured and thoughtful commits.",
      score: scoreArchitect(stats),
    },
    {
      type: "Janitor",
      emoji: "🧹",
      description:
        "You clean what others leave behind. Unsung hero of the codebase.",
      score: scoreJanitor(stats),
    },
    {
      type: "Sniper",
      emoji: "🎯",
      description:
        "Few commits, high impact. Silent but deadly.",
      score: scoreSniper(stats),
    },
    {
      type: "Night Owl",
      emoji: "🌙",
      description:
        "Your best work happens when everyone else sleeps.",
      score: scoreNightOwl(stats),
    },
    {
      type: "Integrator",
      emoji: "🔀",
      description:
        "Master of merging. You connect the chaos together.",
      score: scoreIntegrator(stats),
    },
    {
      type: "Perfectionist",
      emoji: "📏",
      description:
        "Detailed commits, frequent updates. Nothing is left unexplained.",
      score: scorePerfectionist(stats),
    },
    {
      type: "Conventional Dev",
      emoji: "🤖",
      description:
        "You follow commit conventions religiously.",
      score: scoreConventional(stats),
    },
    {
      type: "Mad Scientist",
      emoji: "🧪",
      description:
        "You experiment, break things, and rebuild them better.",
      score: scoreMadScientist(stats),
    },
    {
      type: "Slow Burner",
      emoji: "🐢",
      description:
        "You take your time. Thoughtful, but not in a rush.",
      score: scoreSlowBurner(stats),
    },
    {
      type: "Chaos Coder",
      emoji: "🎲",
      description:
        "No rules, no patterns. Pure chaotic energy.",
      score: scoreChaos(stats),
    },
    {
      type: "Zen Dev",
      emoji: "🧘",
      description:
        "Balanced, consistent, and quietly efficient.",
      score: scoreZen(stats),
    },
  ];

  // 🎯 Normalisation + tri
  const normalized = personalities.map((p) => ({
    ...p,
    score: Math.max(0, Math.min(1, p.score)),
  }));

  normalized.sort((a, b) => b.score - a.score);

  const top = normalized[0];

  return {
    type: `${top.type} ${top.emoji}`,
    description: top.description,
    score: Math.round(top.score * 100),

    // 🔥 bonus fun : top 3
    top3: normalized.slice(0, 3).map((p) => ({
      type: p.type,
      emoji: p.emoji,
      score: Math.round(p.score * 100),
    })),
  };
}