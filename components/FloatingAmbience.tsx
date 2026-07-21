"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CLICK_RIFFS, playArpeggio, playPianoNote } from "@/lib/audio";

type FloaterKind = "note" | "kanji";

type Floater = {
  id: number;
  kind: FloaterKind;
  glyph: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

type Burst = {
  id: number;
  x: number;
  y: number;
  glyph: string;
};

const NOTES = ["♪", "♫", "♬", "♩", "𝄞", "♮"];
/** Single-character Japanese greetings / mood kanji */
const KANJI = ["音", "心", "和", "夢", "光", "花", "幸", "静", "月", "星", "安", "楽", "美", "雅", "詩", "愛"];

function makeFloater(id: number): Floater {
  const kind: FloaterKind = Math.random() > 0.45 ? "note" : "kanji";
  return {
    id,
    kind,
    glyph:
      kind === "note"
        ? NOTES[Math.floor(Math.random() * NOTES.length)]
        : KANJI[Math.floor(Math.random() * KANJI.length)],
    x: 4 + Math.random() * 92,
    y: 8 + Math.random() * 80,
    size: kind === "note" ? 18 + Math.random() * 18 : 16 + Math.random() * 14,
    duration: 14 + Math.random() * 18,
    delay: Math.random() * 4,
    drift: (Math.random() - 0.5) * 60,
  };
}

/**
 * Site-wide light floating notes + kanji.
 * Click any glyph → classical arpeggio + ripple burst.
 */
export default function FloatingAmbience() {
  const [items, setItems] = useState<Floater[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const seed = useMemo(() => Date.now(), []);

  useEffect(() => {
    // Prefer-reduced-motion: fewer / static
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reduce ? 6 : 16;
    setItems(Array.from({ length: count }, (_, i) => makeFloater(seed + i)));
  }, [seed]);

  const onClick = (
    e: React.MouseEvent,
    item: Floater
  ) => {
    e.stopPropagation();
    const riff = CLICK_RIFFS[Math.floor(Math.random() * CLICK_RIFFS.length)];
    playArpeggio(riff, 0.09, 0.6);
    // Extra single chime on the glyph itself
    playPianoNote(72 + Math.floor(Math.random() * 12), 0.9, 0.85);

    const id = Date.now() + Math.random();
    setBursts((b) => [
      ...b,
      { id, x: item.x, y: item.y, glyph: item.glyph },
    ]);
    window.setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== id));
    }, 1200);

    // Respawn that floater elsewhere so the field stays alive
    setItems((prev) =>
      prev.map((p) => (p.id === item.id ? makeFloater(Date.now() + Math.random()) : p))
    );
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[35] overflow-hidden"
      aria-hidden={false}
    >
      {items.map((item) => (
        <motion.button
          key={item.id}
          type="button"
          aria-label={
            item.kind === "kanji"
              ? `Play sound · ${item.glyph}`
              : "Play a classical flourish"
          }
          className="pointer-events-auto absolute select-none border-0 bg-transparent p-0 font-display text-amber-brand/25 outline-none transition-colors hover:text-amber-brand/80 focus-visible:text-amber-brand"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: item.size,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: [0.15, 0.4, 0.2, 0.35],
            y: [0, -28, 8, -16, 0],
            x: [0, item.drift * 0.3, item.drift, item.drift * 0.5, 0],
            rotate: [0, 8, -6, 4, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={(e) => onClick(e, item)}
        >
          {item.glyph}
        </motion.button>
      ))}

      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div
            key={b.id}
            className="pointer-events-none absolute"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            initial={{ opacity: 1, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <span className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-3xl text-amber-brand">
              {b.glyph}
            </span>
            <span className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-brand/50" />
            <span className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-brand/20" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
