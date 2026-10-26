import { type Profile } from '@/lib/game-data';

const STORAGE_KEY = 'skillQuestArcadeProfiles_v1';

export function loadProfiles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, Profile>;
  } catch {
    return {};
  }
}

export function saveProfiles(profiles: Record<string, Profile>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}
