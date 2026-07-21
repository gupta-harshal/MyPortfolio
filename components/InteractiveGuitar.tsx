"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type GuitarKind = "electric" | "acoustic";

/** Standard guitar tuning E2–E4 */
const STRING_FREQS = [82.41, 110, 146.83, 196, 246.94, 329.63];
/** Wider string X positions for easier targeting (viewBox 0–220) */
const STRING_X = [88, 98, 108, 118, 128, 138];

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
        t0 + (kind === "electric" ? 1.4 : 1.8)
      );
      master.connect(ctx.destination);

      // Noise burst for pick attack
      const noiseLen = Math.floor(ctx.sampleRate * 0.04);
      const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < noiseLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseLen * 0.25));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18 * vel, t0);
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

      // Harmonic partials (guitar-ish)
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
        f.frequency.setValueAtTime(
          kind === "electric" ? 3200 : 2400,
          t0
        );
        f.frequency.exponentialRampToValueAtTime(600, t0 + 0.9);
        g.gain.setValueAtTime(amp * vel, t0);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.2 / mult);
        osc.connect(f);
        f.connect(g);
        g.connect(master);
        osc.start(t0);
        osc.stop(t0 + 1.5);
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
  const [pulse, setPulse] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [strumming, setStrumming] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lastStrRef = useRef<number | null>(null);
  const lastVelRef = useRef(0);
  const { pluck, unlock } = useGuitarAudio(kind);

  const fireString = useCallback(
    (i: number, velocity = 0.85) => {
      setActive((prev) => ({ ...prev, [i]: (prev[i] ?? 0) + 1 }));
      setPulse((p) => p + 1);
      pluck(STRING_FREQS[i], velocity);
    },
    [pluck]
  );

  const stringFromPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const local = pt.matrixTransform(ctm.inverse());
    // Only over the string span (neck → bridge)
    if (local.y < 50 || local.y > 330) return null;
    let best: number | null = null;
    let bestDist = 14; // hit radius in SVG units
    for (let i = 0; i < STRING_X.length; i++) {
      const d = Math.abs(local.x - STRING_X[i]);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  };

  const onPointerMoveTilt = (e: React.PointerEvent) => {
    if (strumming) return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: ny * -10, y: nx * 16 });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    unlock();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setStrumming(true);
    lastStrRef.current = null;
    lastVelRef.current = 0;
    const i = stringFromPoint(e.clientX, e.clientY);
    if (i !== null) {
      fireString(i, 0.9);
      lastStrRef.current = i;
    }
  };

  const onPointerMovePlay = (e: React.PointerEvent) => {
    onPointerMoveTilt(e);
    if (!strumming) return;
    const i = stringFromPoint(e.clientX, e.clientY);
    const vel = Math.min(1, Math.hypot(e.movementX, e.movementY) / 18 + 0.45);
    lastVelRef.current = vel;
    if (i !== null && i !== lastStrRef.current) {
      fireString(i, vel);
      lastStrRef.current = i;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    setStrumming(false);
    lastStrRef.current = null;
  };

  const wood =
    kind === "electric"
      ? {
          body: "#1c1410",
          neck: "#2c2118",
          accent: "#e0a458",
          hole: null as string | null,
        }
      : {
          body: "#a86b35",
          neck: "#6b4423",
          accent: "#d4a574",
          hole: "#0a0908",
        };

  const y2 = kind === "acoustic" ? 322 : 312;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-parchment-300/50">
          Press &amp; strum across strings · works on touch
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMovePlay}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => {
          setTilt({ x: 0, y: 0 });
          setStrumming(false);
          lastStrRef.current = null;
        }}
        className="relative mt-4 flex h-[min(70vw,440px)] touch-none select-none items-center justify-center overflow-hidden rounded-3xl border border-amber-brand/10 bg-ink-900/40 sm:h-[440px]"
        style={{ perspective: "1000px", cursor: strumming ? "grabbing" : "crosshair" }}
      >
        <motion.div
          key={pulse}
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0.35 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          style={{
            background:
              "radial-gradient(ellipse at 50% 65%, rgba(224,164,88,0.35), transparent 55%)",
          }}
        />

        <motion.div
          className="relative h-[90%] w-[min(72%,240px)]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 160, damping: 22, mass: 0.45 }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 220 400"
            className="h-full w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.55)]"
            role="img"
            aria-label={`${kind} guitar — strum the strings to play`}
          >
            <defs>
              <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={wood.body} />
                <stop offset="45%" stopColor={wood.accent} stopOpacity="0.55" />
                <stop offset="100%" stopColor={wood.body} />
              </linearGradient>
              <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1a120c" />
                <stop offset="50%" stopColor={wood.neck} />
                <stop offset="100%" stopColor="#1a120c" />
              </linearGradient>
            </defs>

            {/* Headstock */}
            <path
              d="M78 14 L142 14 L148 52 L72 52 Z"
              fill={wood.body}
              stroke={wood.accent}
              strokeWidth="1"
            />
            {STRING_X.map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={26 + (i % 2) * 12}
                r="3.5"
                fill={wood.accent}
              />
            ))}

            {/* Neck — wider for playability */}
            <rect x="84" y="52" width="52" height="148" rx="3" fill="url(#neckGrad)" />
            {[78, 102, 126, 150, 174].map((y) => (
              <line
                key={y}
                x1="84"
                x2="136"
                y1={y}
                y2={y}
                stroke="rgba(245,239,224,0.22)"
                strokeWidth="1"
              />
            ))}

            {/* Body */}
            <path
              d={
                kind === "electric"
                  ? "M48 200 C22 215, 18 255, 40 285 C30 310, 42 340, 72 352 C95 364, 110 368, 110 368 C110 368, 125 364, 148 352 C178 340, 190 310, 180 285 C202 255, 198 215, 172 200 C155 188, 135 182, 110 182 C85 182, 65 188, 48 200 Z"
                  : "M50 205 C24 222, 16 270, 42 298 C28 325, 48 355, 80 364 C98 372, 110 374, 110 374 C110 374, 122 372, 140 364 C172 355, 192 325, 178 298 C204 270, 196 222, 170 205 C152 192, 132 184, 110 184 C88 184, 68 192, 50 205 Z"
              }
              fill="url(#bodyGrad)"
              stroke={wood.accent}
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />

            {kind === "acoustic" ? (
              <>
                <circle
                  cx="110"
                  cy="270"
                  r="26"
                  fill={wood.hole!}
                  stroke={wood.accent}
                  strokeWidth="3"
                />
                <rect x="86" y="320" width="48" height="10" rx="2" fill="#2a2018" />
              </>
            ) : (
              <>
                <rect
                  x="86"
                  y="238"
                  width="48"
                  height="12"
                  rx="2"
                  fill={wood.accent}
                  opacity="0.55"
                />
                <rect
                  x="86"
                  y="262"
                  width="48"
                  height="12"
                  rx="2"
                  fill={wood.accent}
                  opacity="0.55"
                />
                <rect
                  x="90"
                  y="300"
                  width="40"
                  height="24"
                  rx="3"
                  fill="#12100e"
                  stroke={wood.accent}
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
              </>
            )}

            {/* Strings */}
            {STRING_X.map((x, i) => {
              const tick = active[i] ?? 0;
              const vibrating = tick > 0;
              return (
                <motion.line
                  key={`${i}-${tick}`}
                  x1={x}
                  y1={52}
                  x2={x}
                  y2={y2}
                  stroke={vibrating ? "#e0a458" : "rgba(245,239,224,0.7)"}
                  strokeWidth={1.2 + i * 0.15}
                  strokeLinecap="round"
                  initial={false}
                  animate={
                    vibrating
                      ? { x: [0, 3.5, -3.5, 2, -1.5, 0], opacity: [1, 1, 1] }
                      : { x: 0, opacity: 0.85 }
                  }
                  transition={{ duration: 0.38, ease: "easeOut" }}
                  style={{ pointerEvents: "none" }}
                />
              );
            })}

            <rect x="84" y="52" width="52" height="4" fill="rgba(245,239,224,0.35)" />
          </svg>
        </motion.div>

        <p className="pointer-events-none absolute bottom-4 px-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-parchment-300/40">
          {kind} · drag across strings to strum
        </p>
      </div>
    </div>
  );
}
