export function formatTime(seconds: number | null | undefined): string {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return "--:--";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatCoords(lat: number, lon: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}° ${ns} · ${Math.abs(lon).toFixed(2)}° ${ew}`;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "Date not recorded";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Date not recorded";
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "long" });
}

/** Deterministic 0..1 pseudo-random sequence from a string seed. */
export function seededBars(seed: string, count: number): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    const v = Math.abs(h % 1000) / 1000;
    const envelope = 0.4 + 0.6 * Math.sin((i / count) * Math.PI);
    bars.push(Math.max(0.12, Math.min(1, v * envelope + 0.12)));
  }
  return bars;
}
