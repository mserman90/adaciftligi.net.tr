export interface Constraint {
  a: number[];
  sense: '<=' | '>=' | '=';
  b: number;
}

export interface SimplexResult {
  ok: boolean;
  x: number[];
  deger: number;
}

export function ikiAsamaliSimplex(
  n: number,
  kisitlar: Constraint[],
  mly: number[]
): SimplexResult {
  const M = kisitlar.length;
  let slackN = 0;
  let artN = 0;

  for (const k of kisitlar) {
    if (k.sense !== '=') slackN++;
    if (k.sense !== '<=') artN++;
  }

  const total = n + slackN + artN;
  const sBase = n;
  const aBase = n + slackN;
  const T: number[][] = [];
  const basis: number[] = [];
  let si = 0;
  let ai = 0;

  for (const k of kisitlar) {
    const row = new Array(total + 1).fill(0);
    for (let j = 0; j < n; j++) row[j] = k.a[j];
    row[total] = k.b;
    let bv = -1;
    if (k.sense === '<=') {
      row[sBase + si] = 1;
      bv = sBase + si;
      si++;
    }
    if (k.sense === '>=') {
      row[sBase + si] = -1;
      si++;
    }
    if (k.sense !== '<=') {
      row[aBase + ai] = 1;
      bv = aBase + ai;
      ai++;
    }
    basis.push(bv);
    T.push(row);
  }

  const izinli = new Array(total).fill(true);
  for (let j = aBase; j < total; j++) izinli[j] = false;

  function pivotla(r: number, c: number) {
    const pv = T[r][c];
    const rowR = T[r];
    for (let j = 0; j < rowR.length; j++) rowR[j] /= pv;
    for (let i = 0; i < M; i++) {
      if (i === r) continue;
      const f = T[i][c];
      if (f === 0) continue;
      const rowI = T[i];
      for (let j = 0; j < rowI.length; j++) rowI[j] -= f * rowR[j];
    }
    basis[r] = c;
  }

  function dondur(maliyetCol: number[], limit: number): boolean {
    for (let it = 0; it < limit; it++) {
      let enter = -1;
      for (let j = 0; j < total; j++) {
        if (!izinli[j]) continue;
        let rc = maliyetCol[j];
        for (let i = 0; i < M; i++) {
          const b = basis[i];
          if (maliyetCol[b] !== 0) rc -= maliyetCol[b] * T[i][j];
        }
        if (rc < -1e-7) {
          enter = j;
          break;
        }
      }
      if (enter < 0) return true;

      let leave = -1;
      let enIyi = Infinity;
      for (let i = 0; i < M; i++) {
        const aij = T[i][enter];
        if (aij > 1e-9) {
          const oran = T[i][total] / aij;
          if (
            oran < enIyi - 1e-12 ||
            (oran < enIyi + 1e-12 && (leave < 0 || basis[i] < basis[leave]))
          ) {
            enIyi = oran;
            leave = i;
          }
        }
      }
      if (leave < 0) return false;
      pivotla(leave, enter);
    }
    return true;
  }

  // Aşama 1: Yapay değişkenleri minimize et
  const m1 = new Array(total).fill(0);
  for (let j = aBase; j < total; j++) m1[j] = 1;
  dondur(m1, 3000);

  let z1 = 0;
  for (let i = 0; i < M; i++) {
    if (basis[i] >= aBase) z1 += T[i][total];
  }
  if (z1 > 1e-6) return { ok: false, x: [], deger: 0 };

  // Yapay değişkenleri tabandan çıkar
  for (let i = 0; i < M; i++) {
    if (basis[i] >= aBase) {
      for (let j = 0; j < aBase; j++) {
        if (izinli[j] && Math.abs(T[i][j]) > 1e-9) {
          pivotla(i, j);
          break;
        }
      }
    }
  }

  // Aşama 2: Gerçek maliyeti minimize et
  const m2 = new Array(total).fill(0);
  for (let j = 0; j < n; j++) m2[j] = mly[j];
  dondur(m2, 8000);

  const x = new Array(n).fill(0);
  for (let i = 0; i < M; i++) {
    if (basis[i] < n) x[basis[i]] = Math.max(0, T[i][total]);
  }

  let deger = 0;
  for (let j = 0; j < n; j++) deger += mly[j] * x[j];

  return { ok: true, x, deger };
}
