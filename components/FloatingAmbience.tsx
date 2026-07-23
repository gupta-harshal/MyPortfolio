"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CLICK_RIFFS, playArpeggio, playPianoNote } from "@/lib/audio";

type Floater = {
  id: number;
  glyph: string;
  left: number;
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
    left: 3 + Math.random() * 94,
    size: long ? 12 + Math.random() * 10 : 18 + Math.random() * 26,
    duration: 12 + Math.random() * 14,
    delay: Math.random() * 12,
    sway: (Math.random() - 0.5) * 120,
    opacity: 0.4 + Math.random() * 0.35,
  };
}

/** Rising notes + kanji: only after the tech sections (#craft and below). */
export default function FloatingAmbience() {
  const [items, setItems] = useState<Floater[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [enabled, setEnabled] = useState(true);
  const [inZone, setInZone] = useState(false);

  useEffect(() => {
    const craft = document.getElementById("craft");
    if (!craft) return;

    const update = () => {
      setInZone(craft.getBoundingClientRect().top < window.innerHeight * 0.75);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!inZone) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setItems(
      Array.from({ length: reduce ? 10 : 32 }, (_, i) => makeFloater(i + 1))
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
    }, 3200);
    return () => window.clearInterval(timer);
  }, [inZone]);

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

  if (!inZone) return null;

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
          <span
            key={item.id}
            role="button"
            tabIndex={0}
            aria-label={`Play · ${item.glyph}`}
            onClick={(e) => onClick(e, item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(e as unknown as React.MouseEvent, item);
              }
            }}
            className="float-rise pointer-events-auto absolute cursor-pointer select-none font-display"
            style={
              {
                left: `${item.left}%`,
                fontSize: item.size,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
                "--sway": `${item.sway}px`,
                "--floater-opacity": String(item.opacity),
                color: `rgba(224, 164, 88, ${item.opacity})`,
                textShadow: "0 0 22px rgba(224,164,88,0.45)",
              } as React.CSSProperties
            }
          >
            {item.glyph}
          </span>
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
