export interface Commit {
    message: string;
    timestamp: number;
    authorName?: string;
    authorEmail?: string;
  }

export interface Stats {
    total: number;
    fixRatio: number;
    avgLength: number;
    featRatio: number;
    choreRatio: number;
    conventionalScore: number;
    commitFrequency: number;
    lateNightRatio: number;
    mergeRatio: number;
}