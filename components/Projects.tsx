"use client";

import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { projects } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const accentMap: Record<string, string> = {
  amber: "from-amber-brand/20 text-amber-brand",
  rose: "from-rose-brand/20 text-rose-brand",
  sage: "from-sage/20 text-sage",
};

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          kicker="Selected Work"
          title="Things I've built."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => {
            const accent = accentMap[p.accent] ?? accentMap.amber;
            return (
              <Reveal
                key={p.title}
                delay={(i % 2) * 0.1}
                className="group glass card-hover relative flex h-full flex-col overflow-hidden rounded-3xl p-8"
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent.split(" ")[0]} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl leading-snug text-parchment-100">
                    {p.title}
                  </h3>
                  <span
                    className={`font-mono text-xs ${accent.split(" ")[1]}`}
                  >
                    0{i + 1}
                  </span>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment-300/75">
                  {p.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-amber-brand/15 bg-ink-800/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-parchment-300/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {(p.github || p.live) && (
                  <div className="mt-6 flex items-center gap-5 border-t border-amber-brand/10 pt-5">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-parchment-200 hover:text-amber-brand"
                      >
                        <FaGithub /> Code
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-parchment-200 hover:text-amber-brand"
                      >
                        <FaArrowUpRightFromSquare /> Live
                      </a>
                    )}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="font-mono text-xs text-parchment-300/50">
            More on the way — links are added as each project ships.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
