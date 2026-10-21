export interface ScoreHistory {
  historyId: string;
  scoreId: string;
  scoreTitle: string;
  scoreNumber: number;
  /** ISO 8601 timestamp (what JSON.stringify produces for a Date). */
  date: string;
}
