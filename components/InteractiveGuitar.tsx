"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type GuitarKind = "electric" | "acoustic";

/** Standard guitar tuning E2–E4 */
const STRING_FREQS = [82.41, 110, 146.83, 196, 246.94, 329.63];
/** String X positions inside the 0–220 viewBox */
const STRING_X = [86, 96.5, 107, 117.5, 128, 138.5];
const STRING_KEYS = ["1", "2", "3", "4", "5", "6"];

function useGuitarAudio(kind: GuitarKind) {
  const ctxRef = useRef<AudioContext | null>(null);

  const ensure = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const pluck = useCallback(
    (freq: number, velocity = 1) => {
      const ctx = ensure();
      if (!ctx) return;
      const t0 = ctx.currentTime;
      const vel = Math.max(0.25, Math.min(1, velocity));
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, t0);
      master.gain.exponentialRampToValueAtTime(0.28 * vel, t0 + 0.008);
      master.gain.exponentialRampToValueAtTime(
        0.0001,
        t0 + (kind === "electric" ? 1.6 : 2.1)
      );
      master.connect(ctx.destination);

      // Pick-attack noise burst
      const noiseLen = Math.floor(ctx.sampleRate * 0.045);
      const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < noiseLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseLen * 0.25));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.16 * vel, t0);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.05);
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = freq * 2;
      noiseFilter.Q.value = 1.2;
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(master);
      noise.start(t0);
      noise.stop(t0 + 0.06);

      const partials =
        kind === "electric"
          ? [
              [1, 0.7],
              [2, 0.35],
              [3, 0.18],
              [4, 0.1],
            ]
          : [
              [1, 0.85],
              [2, 0.28],
              [3, 0.14],
              [5, 0.06],
            ];

      for (const [mult, amp] of partials) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        const f = ctx.createBiquadFilter();
        osc.type = kind === "electric" ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(freq * mult, t0);
        f.type = "lowpass";
        f.frequency.setValueAtTime(kind === "electric" ? 3400 : 2500, t0);
        f.frequency.exponentialRampToValueAtTime(600, t0 + 0.9);
        g.gain.setValueAtTime(amp * vel, t0);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.3 / mult);
        osc.connect(f);
        f.connect(g);
        g.connect(master);
        osc.start(t0);
        osc.stop(t0 + 1.8);
      }
    },
    [ensure, kind]
  );

  useEffect(() => {
    return () => {
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  return { pluck, unlock: ensure };
}

export default function InteractiveGuitar() {
  const [kind, setKind] = useState<GuitarKind>("electric");
  const [active, setActive] = useState<Record<number, number>>({});
  const [hover, setHover] = useState<number | null>(null);
  const [pulse, setPulse] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [strumming, setStrumming] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lastStrRef = useRef<number | null>(null);
  const { pluck, unlock } = useGuitarAudio(kind);

  const fireString = useCallback(
    (i: number, velocity = 0.85) => {
      setActive((prev) => ({ ...prev, [i]: (prev[i] ?? 0) + 1 }));
      setPulse((p) => p + 1);
      pluck(STRING_FREQS[i], velocity);
    },
    [pluck]
  );

  const strumAll = useCallback(
    (reverse = false) => {
      unlock();
      const indices = STRING_FREQS.map((_, i) => i);
      const order = reverse ? indices.reverse() : indices;
      order.forEach((i, k) => {
        window.setTimeout(() => fireString(i, 0.9), k * 55);
      });
    },
    [fireString, unlock]
  );

  // Keyboard play: 1–6 pluck strings, Space strums
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const idx = STRING_KEYS.indexOf(e.key);
      if (idx >= 0) {
        unlock();
        fireString(idx, 0.9);
      } else if (e.code === "Space" && document.activeElement === wrapRef.current) {
        e.preventDefault();
        strumAll();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fireString, strumAll, unlock]);

  const localPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    return pt.matrixTransform(ctm.inverse());
  };

  const stringFromPoint = (clientX: number, clientY: number) => {
    const local = localPoint(clientX, clientY);
    if (!local || local.y < 50 || local.y > 332) return null;
    let best: number | null = null;
    let bestDist = 12;
    for (let i = 0; i < STRING_X.length; i++) {
      const d = Math.abs(local.x - STRING_X[i]);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  };

  const applyTilt = (clientX: number, clientY: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (clientX - r.left) / r.width - 0.5;
    const ny = (clientY - r.top) / r.height - 0.5;
    setTilt({ x: ny * -12, y: nx * 20 });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    unlock();
    wrapRef.current?.focus();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setStrumming(true);
    lastStrRef.current = null;
    const i = stringFromPoint(e.clientX, e.clientY);
    if (i !== null) {
      fireString(i, 0.9);
      lastStrRef.current = i;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    applyTilt(e.clientX, e.clientY);
    if (strumming) {
      const i = stringFromPoint(e.clientX, e.clientY);
      const vel = Math.min(1, Math.hypot(e.movementX, e.movementY) / 16 + 0.45);
      if (i !== null && i !== lastStrRef.current) {
        fireString(i, vel);
        lastStrRef.current = i;
      }
    } else {
      setHover(stringFromPoint(e.clientX, e.clientY));
    }
  };

  const endStrum = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    setStrumming(false);
    lastStrRef.current = null;
  };

  const c =
    kind === "electric"
      ? {
          bodyA: "#2b1d16",
          bodyB: "#0f0b08",
          shine: "#e0a458",
          neck: "#241a12",
          fret: "rgba(245,239,224,0.35)",
          hardware: "#c9c4bb",
        }
      : {
          bodyA: "#c58a49",
          bodyB: "#6b4423",
          shine: "#f0d9b5",
          neck: "#5a3a1e",
          fret: "rgba(245,239,224,0.4)",
          hardware: "#d8d2c6",
        };

  const y2 = kind === "acoustic" ? 324 : 314;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-parchment-300/50">
          Strum · press 1–6 · Space to strum
        </p>
        <div className="flex rounded-full border border-amber-brand/20 bg-ink-900 p-1">
          {(["electric", "acoustic"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                kind === k
                  ? "bg-amber-brand text-ink-950"
                  : "text-parchment-300/60 hover:text-parchment-100"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={wrapRef}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endStrum}
        onPointerCancel={endStrum}
        onPointerLeave={(e) => {
          setTilt({ x: 0, y: 0 });
          setHover(null);
          endStrum(e);
        }}
        className="group relative mt-4 flex h-[min(78vw,460px)] touch-none select-none items-center justify-center overflow-hidden rounded-3xl border border-amber-brand/10 bg-gradient-to-b from-ink-800/50 to-ink-950/60 outline-none ring-amber-brand/40 focus-visible:ring-2 sm:h-[460px]"
        style={{ perspective: "1100px", cursor: strumming ? "grabbing" : "crosshair" }}
      >
        {/* Strum flash */}
        <motion.div
          key={pulse}
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background:
              "radial-gradient(ellipse at 50% 62%, rgba(224,164,88,0.4), transparent 55%)",
          }}
        />

        <motion.div
          className="relative h-[92%] w-[min(74%,250px)]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
        >
          {/* Depth shadow layer (parallax) */}
          <div
            className="absolute inset-0 rounded-[45%] bg-black/50 blur-2xl"
            style={{ transform: "translateZ(-60px) scale(0.9)" }}
            aria-hidden
          />

          <svg
            ref={svgRef}
            viewBox="0 0 220 400"
            className="relative h-full w-full drop-shadow-[0_30px_55px_rgba(0,0,0,0.6)]"
            style={{ transform: "translateZ(0px)" }}
            role="img"
            aria-label={`${kind} guitar — strum, or press number keys 1 to 6 to play`}
          >
            <defs>
              <radialGradient id="bodyGrad" cx="42%" cy="38%" r="75%">
                <stop offset="0%" stopColor={c.shine} stopOpacity="0.9" />
                <stop offset="30%" stopColor={c.bodyA} />
                <stop offset="100%" stopColor={c.bodyB} />
              </radialGradient>
              <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#120c07" />
                <stop offset="50%" stopColor={c.neck} />
                <stop offset="100%" stopColor="#120c07" />
              </linearGradient>
              <linearGradient id="stringGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbf6ea" />
                <stop offset="100%" stopColor="#9a927f" />
              </linearGradient>
              <radialGradient id="pegGrad" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor={c.hardware} />
              </radialGradient>
            </defs>

            {/* Headstock */}
            <path
              d="M76 12 L144 12 L150 52 L70 52 Z"
              fill={c.bodyB}
              stroke={c.shine}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            {STRING_X.map((x, i) => (
              <circle
                key={x}
                cx={i < 3 ? 66 : 154}
                cy={22 + (i % 3) * 12}
                r="4"
                fill="url(#pegGrad)"
                stroke="#0a0908"
                strokeWidth="0.5"
              />
            ))}

            {/* Neck + fretboard */}
            <rect x="82" y="50" width="60" height="152" rx="3" fill="url(#neckGrad)" />
            {[74, 100, 126, 152, 178].map((y) => (
              <rect
                key={y}
                x="82"
                y={y}
                width="60"
                height="2"
                fill={c.fret}
                rx="1"
              />
            ))}
            {/* Inlay dots */}
            {[113, 165].map((y) => (
              <circle key={y} cx="112" cy={y} r="3" fill="rgba(245,239,224,0.55)" />
            ))}

            {/* Body */}
            <path
              d={
                kind === "electric"
                  ? "M44 202 C18 218, 16 258, 40 288 C28 314, 42 346, 74 356 C96 366, 112 370, 112 370 C112 370, 128 366, 150 356 C182 346, 196 314, 184 288 C208 258, 206 218, 180 202 C162 190, 138 184, 112 184 C86 184, 62 190, 44 202 Z"
                  : "M48 206 C22 224, 14 272, 40 300 C26 328, 46 358, 80 366 C98 374, 112 376, 112 376 C112 376, 126 374, 144 366 C178 358, 198 328, 184 300 C210 272, 202 224, 176 206 C158 192, 136 186, 112 186 C88 186, 66 194, 48 206 Z"
              }
              fill="url(#bodyGrad)"
              stroke={c.shine}
              strokeWidth="1.25"
              strokeOpacity="0.4"
            />

            {/* Glossy top-left highlight */}
            <ellipse
              cx="82"
              cy="235"
              rx="34"
              ry="20"
              fill="#ffffff"
              opacity={kind === "electric" ? 0.08 : 0.14}
            />

            {kind === "acoustic" ? (
              <>
                <circle
                  cx="112"
                  cy="272"
                  r="27"
                  fill="#0a0908"
                  stroke={c.shine}
                  strokeWidth="3"
                />
                <circle cx="112" cy="272" r="18" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />
                <rect x="88" y="322" width="48" height="10" rx="2" fill="#2a2018" />
              </>
            ) : (
              <>
                {/* Pickguard */}
                <path
                  d="M150 250 C170 262, 172 300, 150 320 C138 328, 128 326, 128 300 C128 274, 134 256, 150 250 Z"
                  fill="#0d0a08"
                  opacity="0.6"
                />
                {/* Pickups */}
                <rect x="84" y="238" width="52" height="12" rx="2" fill={c.hardware} opacity="0.85" />
                <rect x="84" y="262" width="52" height="12" rx="2" fill={c.hardware} opacity="0.85" />
                {/* Bridge */}
                <rect x="92" y="302" width="40" height="20" rx="2" fill="#15110d" stroke={c.hardware} strokeWidth="0.75" strokeOpacity="0.5" />
              </>
            )}

            {/* Nut */}
            <rect x="82" y="50" width="60" height="4" rx="1" fill="rgba(245,239,224,0.4)" />

            {/* Strings (float above body via translateZ on parent overlay group) */}
            {STRING_X.map((x, i) => {
              const tick = active[i] ?? 0;
              const vibrating = tick > 0;
              const isHover = hover === i;
              return (
                <motion.line
                  key={`${i}-${tick}`}
                  x1={x}
                  y1={52}
                  x2={x}
                  y2={y2}
                  stroke={vibrating ? "#e0a458" : "url(#stringGrad)"}
                  strokeWidth={1 + i * 0.22 + (isHover ? 0.6 : 0)}
                  strokeLinecap="round"
                  initial={false}
                  animate={
                    vibrating
                      ? { x: [0, 3.5, -3.5, 2.2, -1.4, 0], opacity: [1, 1, 1] }
                      : { x: 0, opacity: isHover ? 1 : 0.9 }
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ pointerEvents: "none" }}
                />
              );
            })}
          </svg>

          {/* Front gloss layer (parallax depth) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[40%]"
            style={{
              transform: "translateZ(35px)",
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, transparent 35%)",
            }}
            aria-hidden
          />
        </motion.div>

        {/* Fret hint buttons for touch users */}
        <div className="pointer-events-auto absolute bottom-3 flex gap-1.5">
          {STRING_KEYS.map((k, i) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                unlock();
                fireString(i, 0.9);
              }}
              className="h-6 w-6 rounded-md border border-amber-brand/20 bg-ink-900/70 font-mono text-[10px] text-parchment-300/70 transition-colors hover:border-amber-brand hover:text-amber-brand"
              aria-label={`Play string ${k}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
