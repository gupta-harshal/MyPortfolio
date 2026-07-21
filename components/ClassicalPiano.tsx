"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getAudioContext, playPianoNote } from "@/lib/audio";

type KeyDef = {
  midi: number;
  label: string;
  black?: boolean;
  /** Offset among white keys for black-key positioning */
  at?: number;
};

const WHITE: KeyDef[] = [
  { midi: 60, label: "C" },
  { midi: 62, label: "D" },
  { midi: 64, label: "E" },
  { midi: 65, label: "F" },
  { midi: 67, label: "G" },
  { midi: 69, label: "A" },
  { midi: 71, label: "B" },
  { midi: 72, label: "C" },
  { midi: 74, label: "D" },
  { midi: 76, label: "E" },
  { midi: 77, label: "F" },
  { midi: 79, label: "G" },
  { midi: 81, label: "A" },
  { midi: 83, label: "B" },
];

const BLACK: KeyDef[] = [
  { midi: 61, label: "C#", black: true, at: 0 },
  { midi: 63, label: "D#", black: true, at: 1 },
  { midi: 66, label: "F#", black: true, at: 3 },
  { midi: 68, label: "G#", black: true, at: 4 },
  { midi: 70, label: "A#", black: true, at: 5 },
  { midi: 73, label: "C#", black: true, at: 7 },
  { midi: 75, label: "D#", black: true, at: 8 },
  { midi: 78, label: "F#", black: true, at: 10 },
  { midi: 80, label: "G#", black: true, at: 11 },
  { midi: 82, label: "A#", black: true, at: 12 },
];

/** Computer keyboard → MIDI for quick play */
const PC_MAP: Record<string, number> = {
  a: 60,
  w: 61,
  s: 62,
  e: 63,
  d: 64,
  f: 65,
  t: 66,
  g: 67,
  y: 68,
  h: 69,
  u: 70,
  j: 71,
  k: 72,
  o: 73,
  l: 74,
  p: 75,
  ";": 76,
  "'": 77,
};

export default function ClassicalPiano() {
  const [active, setActive] = useState<Record<number, boolean>>({});
  const [open, setOpen] = useState(true);
  const pressed = useRef<Set<number>>(new Set());

  const strike = useCallback((midi: number) => {
    getAudioContext();
    playPianoNote(midi, 1.1, 0.85);
    setActive((a) => ({ ...a, [midi]: true }));
    window.setTimeout(() => {
      setActive((a) => {
        const next = { ...a };
        delete next[midi];
        return next;
      });
    }, 180);
  }, []);

  useEffect(() => {
    if (!open) return;
    const down = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const midi = PC_MAP[e.key.toLowerCase()];
      if (midi == null || pressed.current.has(midi) || e.repeat) return;
      pressed.current.add(midi);
      strike(midi);
    };
    const up = (e: KeyboardEvent) => {
      const midi = PC_MAP[e.key.toLowerCase()];
      if (midi != null) pressed.current.delete(midi);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [open, strike]);

  const whiteCount = WHITE.length;

  return (
    <section
      id="piano"
      className="relative border-t border-amber-brand/10 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 px-4 py-10 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-brand/70">
              Instrument · ピアノ
            </p>
            <h2 className="mt-2 font-display text-3xl font-light text-parchment-100 md:text-4xl">
              Play a little.
            </h2>
            <p className="mt-2 max-w-md text-sm text-parchment-300/60">
              Click the keys — or use your keyboard{" "}
              <span className="font-mono text-amber-brand/70">A–L</span>{" "}
              (black keys on{" "}
              <span className="font-mono text-amber-brand/70">W E T Y U O P</span>
              ).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-amber-brand/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-parchment-300/70 transition-colors hover:border-amber-brand hover:text-amber-brand"
          >
            {open ? "Hide piano" : "Show piano"}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mx-auto max-w-4xl select-none"
          >
            {/* Piano body / lid */}
            <div className="rounded-t-2xl border border-amber-brand/15 bg-gradient-to-b from-[#2a2118] to-[#14100c] px-3 pb-2 pt-4 shadow-[0_-20px_60px_-30px_rgba(224,164,88,0.35)] md:px-5">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="font-display text-xs italic text-parchment-300/40">
                  Classical · two octaves
                </span>
                <span className="h-1.5 w-16 rounded-full bg-amber-brand/25" />
              </div>

              <div
                className="relative touch-none overflow-hidden rounded-md bg-ink-950 p-1.5"
                style={{ height: 168 }}
              >
                {/* White keys */}
                <div className="absolute inset-1.5 flex">
                  {WHITE.map((k) => {
                    const on = !!active[k.midi];
                    return (
                      <button
                        key={k.midi}
                        type="button"
                        aria-label={`Play ${k.label}`}
                        onPointerDown={(e) => {
                          e.preventDefault();
                          strike(k.midi);
                        }}
                        className={`relative mr-[2px] flex-1 rounded-b-md border border-ink-800/80 transition-all last:mr-0 ${
                          on
                            ? "translate-y-1 bg-amber-brand/30"
                            : "bg-gradient-to-b from-[#f7f1e4] to-[#e2d8c4] hover:from-white hover:to-[#efe6d4]"
                        }`}
                      >
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-ink-800/40">
                          {k.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Black keys */}
                <div className="pointer-events-none absolute inset-1.5">
                  {BLACK.map((k) => {
                    const on = !!active[k.midi];
                    const leftPct =
                      ((k.at! + 1) / whiteCount) * 100 - 100 / whiteCount / 2;
                    const widthPct = (100 / whiteCount) * 0.62;
                    return (
                      <button
                        key={k.midi}
                        type="button"
                        aria-label={`Play ${k.label}`}
                        onPointerDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          strike(k.midi);
                        }}
                        className={`pointer-events-auto absolute top-0 z-10 rounded-b-md border border-black/40 shadow-lg transition-all ${
                          on
                            ? "h-[58%] translate-y-1 bg-amber-brand"
                            : "h-[62%] bg-gradient-to-b from-[#2a2520] to-[#0c0a08] hover:from-[#3a3228]"
                        }`}
                        style={{
                          left: `calc(${leftPct}% - ${widthPct / 2}%)`,
                          width: `${widthPct}%`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bench / base shadow */}
            <div className="mx-auto mt-1 h-3 w-[92%] rounded-b-xl bg-ink-950/80 shadow-inner" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
