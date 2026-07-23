"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import InteractiveGuitar from "./InteractiveGuitar";
import MelodyPlayer from "./MelodyPlayer";
import TypingChallenge from "./TypingChallenge";
import { ambientWords, books, passions, socials } from "@/lib/data";

export default function Craft() {
  return (
    <section
      id="craft"
      className="relative overflow-hidden px-6 py-24 md:px-10 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-amber-brand/[0.03] to-transparent" />

      {/* Scattered JP / FR / music glyphs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {ambientWords.map((w) => (
          <span
            key={`${w.text}-${w.x}-${w.y}`}
            className="absolute select-none font-display text-sm text-parchment-300/[0.11] md:text-base"
            style={{
              left: w.x,
              top: w.y,
              transform: `rotate(${w.rotate}deg)`,
            }}
          >
            {w.text}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          kicker="Beyond Engineering"
          title="The rest of the picture."
        />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <InteractiveGuitar />
          </Reveal>

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
                {p.title === "Typing" && (
                  <a
                    href="#typing"
                    className="link-underline mt-4 w-fit font-mono text-[10px] uppercase tracking-[0.2em] text-amber-brand"
                  >
                    Try the challenge →
                  </a>
                )}
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
                {p.title === "Languages" && socials.duolingo && (
                  <a
                    href={socials.duolingo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-4 w-fit font-mono text-[10px] uppercase tracking-[0.2em] text-amber-brand"
                  >
                    View on Duolingo →
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-16 md:mt-20">
          <TypingChallenge />
        </Reveal>

        {/* Melody + bookshelf */}
        <div className="mt-16 grid items-start gap-12 md:mt-20 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-brand/70">
              Interlude · 間奏
            </p>
            <h3 className="mt-2 font-display text-3xl text-parchment-100 md:text-4xl">
              A little music between pages.
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-parchment-300/65">
              Soft piano for the shelf below. Hit play and the notes float up.
            </p>
            <div className="mt-8">
              <MelodyPlayer />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-brand/70">
                  Shelf · 本棚
                </p>
                <h3 className="mt-2 font-display text-3xl text-parchment-100 md:text-4xl">
                  Books on the desk.
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-parchment-300/40">
                {books.length} titles
              </span>
            </div>

            <ul className="overflow-hidden rounded-3xl border border-amber-brand/10 bg-ink-900/35">
              {books.map((b, i) => (
                <li
                  key={b.title}
                  className="group flex items-baseline justify-between gap-4 border-b border-amber-brand/10 px-5 py-4 last:border-b-0 transition-colors hover:bg-ink-800/50"
                >
                  <div className="flex min-w-0 items-baseline gap-4">
                    <span className="shrink-0 font-mono text-[10px] text-amber-brand/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-display text-lg text-parchment-100 transition-colors group-hover:text-amber-brand md:text-xl">
                      {b.title}
                    </h4>
                  </div>
                  <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-parchment-300/45">
                    {b.author}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
