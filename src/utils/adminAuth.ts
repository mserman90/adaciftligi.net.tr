/**
 * Ada Çiftliği - Yönetici Girişi ve Yetkilendirme Yardımcısı
 */

const AUTH_STORAGE_KEY = 'ada_farm_admin_session';
const PASS_STORAGE_KEY = 'ada_farm_admin_custom_pass';

export interface AdminSession {
  isAuthenticated: boolean;
  username: string;
  loginTime?: string;
}

export const getStoredPassword = (): string => {
  try {
    const custom = localStorage.getItem(PASS_STORAGE_KEY);
    if (custom && custom.trim().length > 0) {
      return custom;
    }
  } catch (e) {
    console.error('Local storage read error:', e);
  }
  return 'ada2024';
};

export const setStoredPassword = (newPass: string): boolean => {
  try {
    localStorage.setItem(PASS_STORAGE_KEY, newPass);
    return true;
  } catch (e) {
    console.error('Local storage write error:', e);
    return false;
  }
};

export const checkAdminCredentials = (username: string, pass: string): { ok: boolean; message?: string } => {
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();

  const validUsers = ['admin', 'serdar', 'yonetici', 'ada'];
  const expectedPass = getStoredPassword();

  if (!cleanUser) {
    return { ok: false, message: 'Lütfen kullanıcı adını giriniz.' };
  }

  if (!validUsers.includes(cleanUser)) {
    return { ok: false, message: 'Geçersiz kullanıcı adı. (Örnek: admin)' };
  }

  // Accept current custom password, default 'ada2024', or backup 'adaciftligi'
  if (cleanPass === expectedPass || cleanPass === 'ada2024' || cleanPass === 'adaciftligi') {
    return { ok: true };
  }

  return { ok: false, message: 'Hatalı şifre. Lütfen tekrar deneyiniz.' };
};

export const getAdminSession = (): AdminSession => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.isAuthenticated) {
        return {
          isAuthenticated: true,
          username: parsed.username || 'admin',
          loginTime: parsed.loginTime,
        };
      }
    }
  } catch (e) {
    console.error('Error reading admin session:', e);
  }
  return { isAuthenticated: false, username: '' };
};

export const saveAdminSession = (username: string): void => {
  try {
    const sessionData = {
      isAuthenticated: true,
      username: username || 'admin',
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
  } catch (e) {
    console.error('Error saving admin session:', e);
  }
};

export const clearAdminSession = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing admin session:', e);
  }
};
