"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CLICK_RIFFS, playArpeggio, playPianoNote } from "@/lib/audio";

type Floater = {
  id: number;
  glyph: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
};

type Burst = {
  id: number;
  x: number;
  y: number;
  glyph: string;
};

const NOTES = ["♪", "♫", "♬", "♩", "𝄞", "♮", "♯", "♭"];
const KANJI = [
  "音", "心", "和", "夢", "光", "花", "幸", "静", "月", "星",
  "安", "楽", "美", "雅", "詩", "愛", "風", "空", "海", "道",
];
const KANA = ["あ", "い", "う", "え", "お", "ん", "わ", "よ", "ね", "る"];
const FR = ["à", "ô", "é", "û", "î", "oui", "lire", "vie"];

function pickGlyph() {
  const r = Math.random();
  if (r < 0.38) return NOTES[Math.floor(Math.random() * NOTES.length)];
  if (r < 0.68) return KANJI[Math.floor(Math.random() * KANJI.length)];
  if (r < 0.88) return KANA[Math.floor(Math.random() * KANA.length)];
  return FR[Math.floor(Math.random() * FR.length)];
}

function makeFloater(id: number): Floater {
  const glyph = pickGlyph();
  const long = glyph.length > 1;
  return {
    id,
    glyph,
    x: 3 + Math.random() * 94,
    size: long ? 12 + Math.random() * 8 : 18 + Math.random() * 24,
    duration: 14 + Math.random() * 18,
    delay: Math.random() * 14,
    sway: (Math.random() - 0.5) * 100,
    opacity: 0.32 + Math.random() * 0.38,
  };
}

/**
 * Site-wide rising field of notes + Japanese + French.
 * Fixed to the viewport so they float over every section.
 */
export default function FloatingAmbience() {
  const [items, setItems] = useState<Floater[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setItems(
      Array.from({ length: reduce ? 10 : 36 }, (_, i) => makeFloater(i + 1))
    );

    if (reduce) return;

    const timer = window.setInterval(() => {
      setItems((prev) => {
        if (!prev.length) return prev;
        const idx = Math.floor(Math.random() * prev.length);
        return prev.map((p, i) =>
          i === idx ? makeFloater(Date.now() + Math.random()) : p
        );
      });
    }, 3800);
    return () => window.clearInterval(timer);
  }, []);

  const onClick = (e: React.MouseEvent, item: Floater) => {
    e.preventDefault();
    e.stopPropagation();

    playArpeggio(
      CLICK_RIFFS[Math.floor(Math.random() * CLICK_RIFFS.length)],
      0.08,
      0.65
    );
    playPianoNote(69 + Math.floor(Math.random() * 14), 1, 0.9);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const xPct = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const yPct = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id, x: xPct, y: yPct, glyph: item.glyph }]);
    window.setTimeout(
      () => setBursts((b) => b.filter((x) => x.id !== id)),
      1100
    );

    setItems((prev) =>
      prev.map((p) =>
        p.id === item.id ? makeFloater(Date.now() + Math.random()) : p
      )
    );
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[48] overflow-hidden">
      <button
        type="button"
        onClick={() => setEnabled((v) => !v)}
        className="pointer-events-auto absolute bottom-4 left-4 z-10 rounded-full border border-amber-brand/25 bg-ink-950/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-parchment-300/65 backdrop-blur-md transition-colors hover:border-amber-brand hover:text-amber-brand"
      >
        {enabled ? "Hide float · 隠す" : "Show float · 表示"}
      </button>

      {enabled &&
        items.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            aria-label={`Play · ${item.glyph}`}
            className="pointer-events-auto absolute select-none border-0 bg-transparent p-2 font-display outline-none will-change-transform hover:z-10"
            style={{
              left: `${item.x}%`,
              fontSize: item.size,
              marginLeft: "-0.5em",
              color: `rgba(224, 164, 88, ${item.opacity})`,
              textShadow: "0 0 20px rgba(224,164,88,0.35)",
            }}
            initial={{ top: "110%", opacity: 0, rotate: -12 }}
            animate={{
              top: ["110%", "-12%"],
              x: [0, item.sway * 0.35, item.sway, item.sway * 0.2, 0],
              opacity: [0, item.opacity, item.opacity, 0],
              rotate: [-10, 8, -6, 12, -4],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.8, 1],
            }}
            whileHover={{
              scale: 1.4,
              color: "rgba(245, 239, 224, 0.95)",
              textShadow: "0 0 32px rgba(224,164,88,0.75)",
            }}
            whileTap={{ scale: 0.88 }}
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
            initial={{ opacity: 1, scale: 0.3 }}
            animate={{ opacity: 0, scale: 2.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <span className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-4xl text-amber-brand drop-shadow-[0_0_24px_rgba(224,164,88,0.7)]">
              {b.glyph}
            </span>
            <span className="absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-brand/60" />
            <span className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-brand/20" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.span
                key={i}
                className="absolute font-display text-lg text-amber-brand/85"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 6) * Math.PI * 2) * 64,
                  y: Math.sin((i / 6) * Math.PI * 2) * 64,
                  opacity: 0,
                }}
                transition={{ duration: 0.85 }}
              >
                ♪
              </motion.span>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
