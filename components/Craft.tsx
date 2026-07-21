"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { passions, socials } from "@/lib/data";

type GuitarKind = "electric" | "acoustic";

export default function Craft() {
  const [kind, setKind] = useState<GuitarKind>("electric");
  const [pluck, setPluck] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), {
    stiffness: 80,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), {
    stiffness: 80,
    damping: 18,
  });

  function onMove(e: React.MouseEvent) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="craft"
      className="relative overflow-hidden px-6 py-24 md:px-10 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-amber-brand/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          kicker="Beyond Engineering"
          title="Still human. Still shipping."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Interactive 3D guitar */}
          <Reveal>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-parchment-300/50">
                Drag · click strings · switch model
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
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="relative mt-6 flex h-[420px] cursor-grab items-center justify-center active:cursor-grabbing"
              style={{ perspective: 900 }}
            >
              <motion.div
                style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
                className="relative h-[360px] w-[140px]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Body */}
                <div
                  className="absolute left-1/2 top-[38%] h-[210px] w-[128px] -translate-x-1/2 rounded-[48%_48%_42%_42%] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
                  style={{
                    background:
                      kind === "electric"
                        ? "linear-gradient(145deg,#1a1210 0%,#3d2318 40%,#1a1210 100%)"
                        : "linear-gradient(145deg,#5c3a1e 0%,#c17f3a 45%,#3d2412 100%)",
                    transform: "translateZ(12px)",
                    boxShadow:
                      kind === "electric"
                        ? "inset 0 0 40px rgba(0,0,0,0.5), 0 0 40px rgba(224,164,88,0.15)"
                        : "inset 0 0 30px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* Sound hole / pickups */}
                  {kind === "acoustic" ? (
                    <div className="absolute left-1/2 top-[42%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink-950/80 bg-ink-950/90" />
                  ) : (
                    <>
                      <div className="absolute left-1/2 top-[28%] h-3 w-14 -translate-x-1/2 rounded-sm bg-amber-brand/40" />
                      <div className="absolute left-1/2 top-[40%] h-3 w-14 -translate-x-1/2 rounded-sm bg-amber-brand/40" />
                      <div className="absolute left-1/2 top-[62%] h-8 w-10 -translate-x-1/2 rounded-md border border-amber-brand/30 bg-ink-800" />
                    </>
                  )}

                  {/* Strings (interactive) */}
                  <div className="absolute inset-x-6 top-[18%] bottom-[12%] flex justify-between">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Pluck string ${i + 1}`}
                        onClick={() => setPluck((p) => p + 1)}
                        className="relative w-[2px] flex-1 bg-transparent"
                      >
                        <motion.span
                          key={`${pluck}-${i}`}
                          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-parchment-200/70"
                          initial={{ scaleX: 1, opacity: 0.7 }}
                          animate={
                            pluck > 0
                              ? {
                                  x: [0, 3, -3, 2, -1, 0],
                                  opacity: [0.7, 1, 0.7],
                                }
                              : {}
                          }
                          transition={{ duration: 0.45, delay: i * 0.03 }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Neck */}
                <div
                  className="absolute left-1/2 top-0 h-[160px] w-[28px] -translate-x-1/2 rounded-t-md"
                  style={{
                    background:
                      kind === "electric"
                        ? "linear-gradient(90deg,#2a2018,#4a3828,#2a2018)"
                        : "linear-gradient(90deg,#6b4423,#a67c52,#6b4423)",
                    transform: "translateZ(18px)",
                  }}
                >
                  {[20, 45, 70, 95, 120].map((y) => (
                    <div
                      key={y}
                      className="absolute left-1 right-1 h-px bg-parchment-200/20"
                      style={{ top: y }}
                    />
                  ))}
                </div>

                {/* Headstock */}
                <div
                  className="absolute left-1/2 top-[-28px] h-10 w-10 -translate-x-1/2 rounded-t-lg"
                  style={{
                    background: kind === "electric" ? "#1a1210" : "#5c3a1e",
                    transform: "translateZ(20px)",
                  }}
                />
              </motion.div>

              {/* Floor glow */}
              <div className="pointer-events-none absolute bottom-8 h-8 w-48 rounded-[100%] bg-amber-brand/20 blur-xl" />
            </div>
          </Reveal>

          {/* Passion cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {passions.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.08}
                className="glass card-hover flex h-full flex-col rounded-3xl p-6"
              >
                <span className="font-display text-4xl text-amber-brand/30">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl text-parchment-100">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-parchment-300/70">
                  {p.line}
                </p>
                {p.title === "3D Design" && socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-4 w-fit font-mono text-[10px] uppercase tracking-[0.2em] text-amber-brand"
                  >
                    View on Instagram →
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
