import { education, profile, techStack } from "@/lib/data";
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
              I am doing my B.Tech in CSE with Data Science and AI at IIIT
              Ranchi. Competitive programming got me into clean problem solving.
              The DS and AI track pulled me into ML, mostly RAG, language
              models, and shipping those systems for real use.
            </p>
            <p className="mt-5 leading-relaxed text-parchment-300/70">
              Day to day that looks like RAG pipelines on GCP, Solana airdrop
              apps, Dockerised services, and a lot of hackathon weekends. Stack
              is Python, TypeScript, Java, C++, and whatever the problem needs.
            </p>
            <ul className="mt-8 grid gap-2 font-mono text-sm text-parchment-300/70 sm:grid-cols-2">
              <li>› B.Tech CSE (DS and AI), IIIT Ranchi</li>
              <li>› CGPA {profile.cgpa} / 10 · class of 2027</li>
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

        <Reveal className="mt-12 md:mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-brand/70">
            Education
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-parchment-300/60">
            School in Kanpur, then IIIT Ranchi. Getting into CSE with Data
            Science and AI here sits around the top 2 to 3 percent nationally.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {education.map((ed) => (
              <div
                key={`${ed.program}-${ed.period}`}
                className="rounded-3xl border border-amber-brand/10 bg-ink-900/35 px-5 py-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-parchment-300/45">
                  {ed.period}
                </p>
                <h3 className="mt-2 font-display text-xl text-parchment-100">
                  {ed.program}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-parchment-300/70">
                  {ed.school}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-amber-brand/80">
                  {ed.detail}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
