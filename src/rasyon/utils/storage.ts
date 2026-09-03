import {
  FeedIngredient,
  BesiInputs,
  SutInputs,
  KoyunInputs,
  KeciInputs,
  RationResult,
} from '../types';

export const LAST_RATION_STORAGE_KEY = 'ada_ciftligi_last_ration_v1';

export type RationModuleKey = 'besi' | 'sut' | 'koyun' | 'keci';

export interface SavedLastRationState {
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

/**
 * Saves the last successfully calculated ration and its input state to localStorage.
 */
export function saveLastRation(data: SavedLastRationState): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.setItem(LAST_RATION_STORAGE_KEY, JSON.stringify(data));
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
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    const raw = window.localStorage.getItem(LAST_RATION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SavedLastRationState;
    if (
      parsed &&
      parsed.module &&
      parsed.result &&
      parsed.result.basarili &&
      Array.isArray(parsed.ingredients) &&
      Array.isArray(parsed.selectedIngredientIds)
    ) {
      return parsed;
    }
    return null;
  } catch (error) {
    console.error('Ada Çiftliği: Kayıtlı rasyon yerel depodan okunamadı:', error);
    return null;
  }
}

/**
 * Clears the stored last ration from localStorage.
 */
export function clearLastRation(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.removeItem(LAST_RATION_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Ada Çiftliği: Kayıtlı rasyon silinemedi:', error);
    return false;
  }
}
