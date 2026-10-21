import { Preferences } from '@capacitor/preferences';

/**
 * App persistence: an in-memory copy of a handful of keys, loaded once at startup from
 * Capacitor Preferences (UserDefaults / SharedPreferences, which survive WebView storage
 * purges) and written through on every change. Services keep reading and writing
 * synchronously; a missing, corrupt or unexpected value never crashes the app.
 */
export const PERSISTED_KEYS = [
  'scoreHistory',
  'savedCarnivals',
  'scoreOrder',
  'removedScores',
  'scoreTone',
  'theme',
  'keepAwake',
] as const;

const memory = new Map<string, string>();

const legacyLocalStorageGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

/** Loads every persisted key, migrating values left in localStorage by earlier versions. */
export async function initPersistence(): Promise<void> {
  for (const key of PERSISTED_KEYS) {
    let value: string | null = null;
    try {
      value = (await Preferences.get({ key })).value;
    } catch (error) {
      console.warn(`Could not read "${key}" from preferences`, error);
    }
    if (value === null) {
      value = legacyLocalStorageGet(key);
      if (value !== null) {
        Preferences.set({ key, value }).catch(() => undefined);
      }
    }
    if (value !== null) {
      memory.set(key, value);
    }
  }
}

export function readRaw(key: string): string | null {
  return memory.get(key) ?? null;
}

export function writeRaw(key: string, value: string): void {
  memory.set(key, value);
  Preferences.set({ key, value }).catch((error) =>
    console.warn(`Could not persist "${key}"`, error)
  );
}

export function readJson<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T
): T {
  const raw = readRaw(key);
  if (raw === null) {
    return fallback;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  writeRaw(key, JSON.stringify(value));
}

/** Snapshot of everything persisted, for backups. */
export function exportPersistence(): Record<string, string> {
  return Object.fromEntries(memory.entries());
}

/** Replaces the persisted values with a backup snapshot (unknown keys are ignored). */
export function importPersistence(snapshot: Record<string, string>): void {
  for (const key of PERSISTED_KEYS) {
    const value = snapshot[key];
    if (typeof value === 'string') {
      writeRaw(key, value);
    }
  }
}

export const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

/* ---- test helpers (no-ops in production code paths) ---- */

export function resetPersistenceForTests(): void {
  memory.clear();
}

export function seedPersistenceForTests(key: string, value: string): void {
  memory.set(key, value);
}
