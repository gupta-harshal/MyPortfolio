import { experience, achievements } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="work" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          kicker="Experience & Wins"
          title="Where theory met production."
        />

        {/* Experience timeline */}
        <div className="relative border-l border-amber-brand/20 pl-8 md:pl-10">
          {experience.map((job, i) => (
            <Reveal key={i} delay={i * 0.1} className="relative mb-14 last:mb-0">
              <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border border-amber-brand/40 bg-ink-950 md:-left-[49px]">
                <span className="h-2 w-2 rounded-full bg-amber-brand" />
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl text-parchment-100 md:text-3xl">
                  {job.role}
                  <span className="text-amber-brand"> · {job.company}</span>
                </h3>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-parchment-300/60">
                  {job.period}
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-parchment-300/75">{job.summary}</p>
              <ul className="mt-4 space-y-2">
                {job.points.map((p, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-sm leading-relaxed text-parchment-300/70"
                  >
                    <span className="mt-1 text-amber-brand">✦</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Achievements */}
        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal
              key={i}
              delay={i * 0.1}
              className="glass card-hover flex h-full flex-col rounded-3xl p-7"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-brand/70">
                {a.org}
              </span>
              <h4 className="mt-3 font-display text-xl leading-snug text-parchment-100">
                {a.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-parchment-300/70">
                {a.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
