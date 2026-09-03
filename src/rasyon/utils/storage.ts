import {
  FeedIngredient,
  BesiInputs,
  SutInputs,
  KoyunInputs,
  KeciInputs,
  RationResult,
} from '../types';

export const RATION_HISTORY_STORAGE_KEY = 'ada_ciftligi_ration_history_v1';

export type RationModuleKey = 'besi' | 'sut' | 'koyun' | 'keci';

export interface SavedLastRationState {
  id?: string;
  module: RationModuleKey;
  savedAt: string; // ISO String
  savedAtFormatted: string; // Turkish date/time format
  inputs: {
    besi?: BesiInputs;
    sut?: SutInputs;
    koyun?: KoyunInputs;
    keci?: KeciInputs;
  };
  ingredients: FeedIngredient[];
  selectedIngredientIds: string[];
  result: RationResult;
}

export function loadRationHistory(): SavedLastRationState[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }
    const raw = window.localStorage.getItem(RATION_HISTORY_STORAGE_KEY);
    if (!raw) {
      // Migrate from old single saved state
      const oldRaw = window.localStorage.getItem('ada_ciftligi_last_ration_v1');
      if (oldRaw) {
        const parsed = JSON.parse(oldRaw) as SavedLastRationState;
        if (parsed && parsed.result?.basarili) {
          parsed.id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
          window.localStorage.setItem(RATION_HISTORY_STORAGE_KEY, JSON.stringify([parsed]));
          return [parsed];
        }
      }
      return [];
    }
    const parsed = JSON.parse(raw) as SavedLastRationState[];
    if (Array.isArray(parsed)) {
      return parsed.filter(p => p && p.result && p.result.basarili);
    }
    return [];
  } catch (error) {
    console.error('Ada Çiftliği: Rasyon geçmişi okunamadı:', error);
    return [];
  }
}

/**
 * Saves the last successfully calculated ration and its input state to localStorage.
 */
export function saveLastRation(data: SavedLastRationState): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    if (!data.id) {
      data.id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
    }
    
    const history = loadRationHistory();
    const newHistory = [data, ...history.filter(h => h.id !== data.id)].slice(0, 5);
    window.localStorage.setItem(RATION_HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
    
    // For backward compatibility keep setting the old key
    window.localStorage.setItem('ada_ciftligi_last_ration_v1', JSON.stringify(data));
    
    return true;
  } catch (error) {
    console.error('Ada Çiftliği: Rasyon yerel depoya kaydedilemedi:', error);
    return false;
  }
}

/**
 * Loads the last saved ration from localStorage.
 */
export function loadLastRation(): SavedLastRationState | null {
  const history = loadRationHistory();
  return history.length > 0 ? history[0] : null;
}

/**
 * Clears the stored last ration from localStorage.
 */
export function clearLastRation(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.removeItem(RATION_HISTORY_STORAGE_KEY);
    window.localStorage.removeItem('ada_ciftligi_last_ration_v1');
    return true;
  } catch (error) {
    console.error('Ada Çiftliği: Kayıtlı rasyon silinemedi:', error);
    return false;
  }
}
