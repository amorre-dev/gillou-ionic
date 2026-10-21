export function generateCacheKey(
  scoreId: string,
  scoreKeySignature: string,
  width: number
): string {
  return `${scoreId}-${scoreKeySignature}-${width}`;
}
