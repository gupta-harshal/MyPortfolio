/**
 * Shared Web Audio piano helpers — used by floating notes,
 * melody player, and the bottom classical keyboard.
 */

export function midiToFreq(midi: number) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

let sharedCtx: AudioContext | null = null;

export function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!sharedCtx || sharedCtx.state === "closed") {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    sharedCtx = new AC();
  }
  if (sharedCtx.state === "suspended") void sharedCtx.resume();
  return sharedCtx;
}

/** Soft triangle/sine piano-ish tone */
export function playPianoNote(
  midi: number,
  duration = 0.7,
  velocity = 0.75,
  when?: number
) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const t0 = when ?? ctx.currentTime;
  const vel = Math.max(0.15, Math.min(1, velocity));
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, t0);
  master.gain.exponentialRampToValueAtTime(0.28 * vel, t0 + 0.012);
  master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  master.connect(ctx.destination);

  for (const [mult, amp, type] of [
    [1, 0.75, "triangle"],
    [2, 0.16, "sine"],
    [3, 0.05, "sine"],
  ] as const) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const f = ctx.createBiquadFilter();
    osc.type = type;
    osc.frequency.setValueAtTime(midiToFreq(midi) * mult, t0);
    f.type = "lowpass";
    f.frequency.setValueAtTime(2600, t0);
    f.frequency.exponentialRampToValueAtTime(700, t0 + duration * 0.85);
    g.gain.setValueAtTime(amp, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(f);
    f.connect(g);
    g.connect(master);
    osc.start(t0);
    osc.stop(t0 + duration + 0.05);
  }
}

export function playArpeggio(midis: number[], gap = 0.08, noteDur = 0.55) {
  const ctx = getAudioContext();
  if (!ctx) return;
  midis.forEach((m, i) => {
    playPianoNote(m, noteDur, 0.7 - i * 0.05, ctx.currentTime + i * gap);
  });
}

/** Beethoven — Für Elise opening (public domain), simplified */
export const FUR_ELISE: { midi: number; dur: number; gap?: number }[] = [
  { midi: 76, dur: 0.18 },
  { midi: 75, dur: 0.18 },
  { midi: 76, dur: 0.18 },
  { midi: 75, dur: 0.18 },
  { midi: 76, dur: 0.18 },
  { midi: 71, dur: 0.18 },
  { midi: 74, dur: 0.18 },
  { midi: 72, dur: 0.18 },
  { midi: 69, dur: 0.45, gap: 0.08 },
  { midi: 60, dur: 0.18 },
  { midi: 64, dur: 0.18 },
  { midi: 69, dur: 0.18 },
  { midi: 71, dur: 0.45, gap: 0.08 },
  { midi: 64, dur: 0.18 },
  { midi: 68, dur: 0.18 },
  { midi: 71, dur: 0.18 },
  { midi: 72, dur: 0.5, gap: 0.1 },
  { midi: 64, dur: 0.18 },
  { midi: 76, dur: 0.18 },
  { midi: 75, dur: 0.18 },
  { midi: 76, dur: 0.18 },
  { midi: 75, dur: 0.18 },
  { midi: 76, dur: 0.18 },
  { midi: 71, dur: 0.18 },
  { midi: 74, dur: 0.18 },
  { midi: 72, dur: 0.18 },
  { midi: 69, dur: 0.7 },
];

/** Short classical flourishes for click reactions */
export const CLICK_RIFFS: number[][] = [
  [72, 76, 79, 84], // C major sparkle
  [69, 72, 76, 81], // A minor lift
  [71, 74, 78, 83], // B dim-ish color
  [67, 71, 74, 79], // G major
  [65, 69, 72, 77], // F major warm
  [64, 67, 71, 76], // E minor soft
];
