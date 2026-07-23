import { profile, techStack } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          kicker="About"
          title="I like building things that work."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="text-lg leading-relaxed text-parchment-300/80 md:text-xl">
              Competitive programming got me hooked on clean problem solving.
              Studying Data Science &amp; AI pulled me into ML, especially RAG,
              language models, and getting those systems into real products.
            </p>
            <p className="mt-5 leading-relaxed text-parchment-300/70">
              I&apos;ve built RAG pipelines on GCP, Solana airdrop apps, and
              Dockerised services, and I&apos;ve spent plenty of weekends in
              hackathons. Outside of code: guitar, books, Japanese and French
              on Duolingo, and some 3D design when I feel like it.
            </p>
            <ul className="mt-8 grid gap-2 font-mono text-sm text-parchment-300/70 sm:grid-cols-2">
              <li>› B.Tech CSE (DS &amp; AI), IIIT Ranchi</li>
              <li>› CGPA {profile.cgpa} / 10</li>
              <li>› 1,400+ problems · CF Specialist</li>
              <li>› GSSoC · GDG Ranchi Co-Lead</li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="glass rounded-3xl p-7 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-brand/70">
              Tech stack
            </p>
            <div className="mt-5 space-y-5">
              {techStack.map((group) => (
                <div key={group.group}>
                  <h4 className="font-display text-lg text-parchment-100">
                    {group.group}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-amber-brand/15 bg-ink-950/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-parchment-300/75"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
