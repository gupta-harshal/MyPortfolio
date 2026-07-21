"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import InteractiveGuitar from "./InteractiveGuitar";
import { passions, socials } from "@/lib/data";

export default function Craft() {
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
      </div>
    </section>
  );
}
