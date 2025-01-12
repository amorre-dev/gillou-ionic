export function generateCacheKey(
  scoreId: string,
  scoreKeySignature: string,
  platformWidth: number,
  isDarkMode: boolean
): string {
  return `${scoreId}-${scoreKeySignature}-${platformWidth}-${isDarkMode}`;
}
