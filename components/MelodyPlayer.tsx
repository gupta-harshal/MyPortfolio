"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FUR_ELISE,
  getAudioContext,
  midiToFreq,
  playPianoNote,
} from "@/lib/audio";

type Floater = { id: number; glyph: string; x: number; delay: number };

const GLYPHS = ["♪", "♫", "♬", "♩", "♮", "♯"];

export default function MelodyPlayer() {
  const [playing, setPlaying] = useState(false);
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const timersRef = useRef<number[]>([]);
  const idRef = useRef(0);
  const stopFlag = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

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

  const stopAll = () => {
    stopFlag.current = true;
    clearTimers();
    setPlaying(false);
  };

  const playMelody = () => {
    if (playing) {
      stopAll();
      setFloaters([]);
      return;
    }

    const ctx = getAudioContext();
    if (!ctx) return;
    stopFlag.current = false;
    setPlaying(true);
    spawnNotes(7);

    let t = ctx.currentTime + 0.05;

    // Soft pedal drone
    const pad = ctx.createOscillator();
    const padGain = ctx.createGain();
    pad.type = "sine";
    pad.frequency.value = midiToFreq(45);
    padGain.gain.setValueAtTime(0.0001, t);
    padGain.gain.exponentialRampToValueAtTime(0.04, t + 0.6);
    pad.connect(padGain);
    padGain.connect(ctx.destination);
    pad.start(t);

    for (const note of FUR_ELISE) {
      const start = t;
      const end = start + note.dur;
      const delayMs = Math.max(0, (start - ctx.currentTime) * 1000);

      const tid = window.setTimeout(() => {
        if (stopFlag.current) return;
        playPianoNote(note.midi, note.dur + 0.15, 0.78);
        spawnNotes(2);
      }, delayMs);
      timersRef.current.push(tid);

      t = end + (note.gap ?? 0.03);
    }

    padGain.gain.setValueAtTime(0.04, t - 0.5);
    padGain.gain.exponentialRampToValueAtTime(0.0001, t);
    pad.stop(t + 0.05);

    const endTid = window.setTimeout(() => {
      if (!stopFlag.current) setPlaying(false);
    }, (t - ctx.currentTime) * 1000 + 250);
    timersRef.current.push(endTid);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={playMelody}
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
        {playing ? "Stop · 停止" : "Play Für Elise"}
      </button>
      <p className="mt-3 max-w-xs font-mono text-[10px] leading-relaxed tracking-[0.12em] text-parchment-300/45">
        Beethoven · Für Elise (public domain). Synthesized piano, not a recording.
      </p>

      <div className="pointer-events-none absolute inset-x-0 -top-2 h-40 overflow-visible">
        <AnimatePresence>
          {floaters.map((n) => (
            <motion.span
              key={n.id}
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: [0, 1, 0],
                y: -110,
                scale: 1.15,
                rotate: [-8, 12],
              }}
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
