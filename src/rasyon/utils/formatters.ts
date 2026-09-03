export const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v));

export const nm = (v: any): number => {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
};

export const fmt = (v: number | undefined | null, d = 2): string => {
  if (v === undefined || v === null || isNaN(v)) return '0';
  return v.toLocaleString('tr-TR', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
};

export const bugun0 = (): Date => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const parseTarih = (s: string): Date => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const tarihEkle = (dt: Date, gun: number): Date => {
  const t = new Date(dt);
  t.setDate(t.getDate() + gun);
  return t;
};

export const toInput = (dt: Date): string => {
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(
    dt.getDate()
  ).padStart(2, '0')}`;
};

export const fmtTarih = (dt: Date): string => {
  return dt.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const fmtTarihUz = (dt: Date): string => {
  return dt.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const toIcsDate = (dt: Date): string => {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const d = String(dt.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
};
