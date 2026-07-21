"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * A short romantic piano vignette — an original homage in the spirit of
 * late-Romantic writing (think Rachmaninoff-adjacent color), synthesized
 * with Web Audio so we don't ship copyrighted recordings.
 */
const MELODY: { midi: number; dur: number; gap?: number }[] = [
  // Opening — dark, wide, chordal then a climbing line
  { midi: 49, dur: 0.55 }, // C#3
  { midi: 56, dur: 0.55 }, // G#3
  { midi: 61, dur: 0.7 }, // C#4
  { midi: 68, dur: 0.9, gap: 0.12 }, // G#4
  { midi: 61, dur: 0.35 },
  { midi: 63, dur: 0.35 },
  { midi: 65, dur: 0.45 },
  { midi: 68, dur: 0.55 },
  { midi: 70, dur: 0.7, gap: 0.1 },
  { midi: 68, dur: 0.4 },
  { midi: 65, dur: 0.4 },
  { midi: 63, dur: 0.5 },
  { midi: 61, dur: 0.85, gap: 0.15 },
  // Soft answer
  { midi: 56, dur: 0.4 },
  { midi: 58, dur: 0.4 },
  { midi: 60, dur: 0.45 },
  { midi: 61, dur: 0.55 },
  { midi: 63, dur: 0.7 },
  { midi: 65, dur: 1.1 },
];

function midiToFreq(midi: number) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

type Floater = { id: number; glyph: string; x: number; delay: number };

const GLYPHS = ["♪", "♫", "♬", "♩", "♮", "♯"];

export default function MelodyPlayer() {
  const [playing, setPlaying] = useState(false);
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const ctxRef = useRef<AudioContext | null>(null);
  const timersRef = useRef<number[]>([]);
  const idRef = useRef(0);

  const stopAll = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    setPlaying(false);
    void ctxRef.current?.close();
    ctxRef.current = null;
  }, []);

  useEffect(() => () => stopAll(), [stopAll]);

  const spawnNotes = (count = 5) => {
    const batch: Floater[] = Array.from({ length: count }, () => {
      idRef.current += 1;
      return {
        id: idRef.current,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        x: 10 + Math.random() * 80,
        delay: Math.random() * 0.25,
      };
    });
    setFloaters((prev) => [...prev.slice(-18), ...batch]);
  };

  const playMelody = async () => {
    if (playing) {
      stopAll();
      setFloaters([]);
      return;
    }

    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    setPlaying(true);
    spawnNotes(6);

    let t = ctx.currentTime + 0.05;
    const master = ctx.createGain();
    master.gain.value = 0.22;
    master.connect(ctx.destination);

    // Soft pad under the line
    const pad = ctx.createOscillator();
    const padGain = ctx.createGain();
    pad.type = "sine";
    pad.frequency.value = midiToFreq(37); // C#2 drone
    padGain.gain.setValueAtTime(0.0001, t);
    padGain.gain.exponentialRampToValueAtTime(0.06, t + 0.8);
    pad.connect(padGain);
    padGain.connect(master);
    pad.start(t);

    for (const note of MELODY) {
      const start = t;
      const end = start + note.dur;

      // Two partials ≈ soft piano
      for (const [mult, amp] of [
        [1, 0.7],
        [2, 0.18],
        [3, 0.06],
      ] as const) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        const f = ctx.createBiquadFilter();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(midiToFreq(note.midi) * mult, start);
        f.type = "lowpass";
        f.frequency.setValueAtTime(2800, start);
        f.frequency.exponentialRampToValueAtTime(900, end);
        g.gain.setValueAtTime(0.0001, start);
        g.gain.exponentialRampToValueAtTime(amp, start + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, end);
        osc.connect(f);
        f.connect(g);
        g.connect(master);
        osc.start(start);
        osc.stop(end + 0.05);
      }

      const delayMs = (start - ctx.currentTime) * 1000;
      const tid = window.setTimeout(() => spawnNotes(2), Math.max(0, delayMs));
      timersRef.current.push(tid);

      t = end + (note.gap ?? 0.04);
    }

    padGain.gain.exponentialRampToValueAtTime(0.0001, t);
    pad.stop(t + 0.1);

    const endTid = window.setTimeout(() => {
      setPlaying(false);
      void ctx.close();
      if (ctxRef.current === ctx) ctxRef.current = null;
    }, (t - ctx.currentTime) * 1000 + 200);
    timersRef.current.push(endTid);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => void playMelody()}
        aria-pressed={playing}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-all ${
          playing
            ? "border-amber-brand bg-amber-brand text-ink-950 shadow-[0_12px_40px_-12px_rgba(224,164,88,0.7)]"
            : "border-amber-brand/40 text-amber-brand hover:bg-amber-brand hover:text-ink-950"
        }`}
      >
        <span className="relative grid h-6 w-6 place-items-center">
          {playing ? (
            <span className="flex gap-0.5">
              <span className="h-3 w-0.5 animate-pulse bg-current" />
              <span className="h-3 w-0.5 animate-pulse bg-current [animation-delay:120ms]" />
              <span className="h-3 w-0.5 animate-pulse bg-current [animation-delay:240ms]" />
            </span>
          ) : (
            <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" />
          )}
        </span>
        {playing ? "Stop melody" : "Play piano vignette"}
      </button>
      <p className="mt-3 max-w-xs font-mono text-[10px] leading-relaxed tracking-[0.12em] text-parchment-300/45">
        An original romantic piano sketch — in the spirit of Rachmaninoff, not
        a recording.
      </p>

      {/* Floating notes */}
      <div className="pointer-events-none absolute inset-x-0 -top-2 h-40 overflow-visible">
        <AnimatePresence>
          {floaters.map((n) => (
            <motion.span
              key={n.id}
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0], y: -110, scale: 1.15, rotate: [-8, 12] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, delay: n.delay, ease: "easeOut" }}
              onAnimationComplete={() =>
                setFloaters((prev) => prev.filter((f) => f.id !== n.id))
              }
              className="absolute bottom-0 font-display text-2xl text-amber-brand/70"
              style={{ left: `${n.x}%` }}
            >
              {n.glyph}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
