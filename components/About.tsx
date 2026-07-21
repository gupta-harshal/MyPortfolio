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
          title="Engineer first. Curious always."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="text-lg leading-relaxed text-parchment-300/80 md:text-xl">
              I&apos;m fascinated by computational efficiency, optimisation, and
              the intersection of data with intelligence. Competitive programming
              built my intuition for deterministic systems; Data Science &amp; AI
              pushed me into probabilistic ML — RAG, multimodal models, and
              production pipelines.
            </p>
            <p className="mt-5 leading-relaxed text-parchment-300/70">
              I&apos;ve shipped enterprise RAG on GCP, built Solana airdrop
              dApps with RPC-node concepts, containerised services with Docker,
              and moved fast in high-pressure hackathons. Outside the IDE:
              guitar on stage, books on the shelf, Japanese &amp; French on a
              long Duolingo streak, and a bit of 3D design for fun.
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
