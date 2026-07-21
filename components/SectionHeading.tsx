import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.3em] text-amber-brand/70">
          {index}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-parchment-300/60">
          {kicker}
        </span>
      </div>
      <h2 className="mt-3 font-display text-4xl font-light leading-tight text-parchment-100 md:text-6xl">
        {title}
      </h2>
      <div className="hairline mt-6 max-w-xs" />
    </Reveal>
  );
}
