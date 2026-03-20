export function formatOutput(result) {
    return `
  🧠 Personality: ${result.personality.type}
  
  ${result.personality.description}
  
  📊 Stats:
  - Total commits: ${result.stats.total}
  - Fix ratio: ${(result.stats.fixRatio * 100).toFixed(1)}%
  `;
  }