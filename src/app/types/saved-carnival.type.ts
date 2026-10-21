import { ScoreHistory } from './score-history.type';

/** What the user types when saving or editing a carnival. */
export interface CarnivalDetails {
  name: string;
  location: string;
  /** Free text, a reminder for later (weather, who played, what went well…). */
  description: string;
}

/** A saved carnival: its details plus a snapshot of the announcement history. */
export interface SavedCarnival extends CarnivalDetails {
  id: string;
  /** ISO 8601 timestamp of the save. */
  savedAt: string;
  /** Chronological announcement entries, oldest first. */
  entries: ScoreHistory[];
}
