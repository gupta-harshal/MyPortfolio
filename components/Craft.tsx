import { passions } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Craft() {
  return (
    <section
      id="craft"
      className="relative overflow-hidden px-6 py-24 md:px-10 md:py-36"
    >
      {/* soft warm wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-rose-brand/[0.04] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          kicker="Beyond the Code"
          title="The other half of me."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {passions.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.08}
              className="glass card-hover group flex h-full flex-col rounded-3xl p-7"
            >
              <span className="font-display text-5xl text-amber-brand/30 transition-colors group-hover:text-amber-brand/70">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl text-parchment-100">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-parchment-300/70">
                {p.line}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-20 max-w-3xl text-center">
          <p className="font-display text-2xl font-light italic leading-relaxed text-parchment-200/85 md:text-4xl md:leading-snug">
            &ldquo;Structure, rhythm, and the search for something that
            resonates — <span className="text-gradient">that is code,</span> and
            that is <span className="text-gradient">art.</span>&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
