/** "il y a 12 min" style wording for an ISO date, relative to `nowMs`. */
export function relativeTimeFr(iso: string, nowMs: number): string {
  const diffMs = nowMs - new Date(iso).getTime();
  if (!Number.isFinite(diffMs) || diffMs < 0) {
    return "à l'instant";
  }
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) {
    return "à l'instant";
  }
  if (minutes < 60) {
    return `il y a ${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `il y a ${hours} h`;
  }
  const days = Math.floor(hours / 24);
  return days === 1 ? 'hier' : `il y a ${days} j`;
}
