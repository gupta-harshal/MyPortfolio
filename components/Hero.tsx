"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect } from "react";
import { profile, stats, marqueeWords } from "@/lib/data";
import Socials from "./Socials";

export default function Hero() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  const glowX = useTransform(sx, [0, 1], ["-8%", "8%"]);
  const glowY = useTransform(sy, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 pb-16 md:px-10"
    >
      {/* Ambient glows */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute -top-32 left-1/4 h-[42rem] w-[42rem] rounded-full bg-amber-brand/10 blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={{ x: glowY, y: glowX }}
        className="pointer-events-none absolute bottom-0 right-0 h-[34rem] w-[34rem] rounded-full bg-rose-brand/10 blur-[120px]"
      />

      <div className="mx-auto w-full max-w-6xl">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="font-mono text-xs uppercase tracking-[0.4em] text-amber-brand/80"
          >
            {profile.role} · {profile.location}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[15vw] font-light leading-[0.92] tracking-tight text-parchment-100 md:text-[8.5rem]"
          >
            Harshal
            <br />
            <span className="text-gradient animate-shimmer italic">Gupta</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl font-display text-2xl font-light italic text-parchment-200/90 md:text-3xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-base leading-relaxed text-parchment-300/70 md:text-lg"
          >
            {profile.blurb}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group rounded-full bg-amber-brand px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink-950 transition-all hover:bg-parchment-100 hover:shadow-[0_16px_40px_-16px_rgba(224,164,88,0.8)]"
            >
              View my work
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-parchment-300/25 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-parchment-100 transition-all hover:border-amber-brand hover:text-amber-brand"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <Socials />
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={item}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-amber-brand/10 bg-amber-brand/10 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-ink-900 px-5 py-6 text-center">
                <div className="font-display text-2xl text-amber-brand md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-parchment-300/60">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee band */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden border-y border-amber-brand/10 bg-ink-950/40 py-3">
        <div className="flex w-max animate-marquee">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className="mx-6 font-display text-sm italic text-parchment-300/40"
            >
              {w} <span className="text-amber-brand/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
