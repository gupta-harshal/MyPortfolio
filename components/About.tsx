import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" kicker="About" title="Two hemispheres, one mind." />

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="glass card-hover rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-brand/15 font-mono text-amber-brand">
                {"</>"}
              </span>
              <h3 className="font-display text-2xl text-parchment-100">
                The Engineer
              </h3>
            </div>
            <p className="mt-5 leading-relaxed text-parchment-300/75">
              I&apos;m fascinated by computational efficiency, optimisation, and the
              intersection of data with intelligence. Competitive programming built
              my intuition for deterministic optimisation; my specialisation in
              Data Science &amp; AI pushed me toward the probabilistic frontier —
              RAG systems, generative models, and production ML at scale.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-sm text-parchment-300/70">
              <li>› B.Tech CSE (Data Science &amp; AI), IIIT Ranchi</li>
              <li>› CGPA {profile.cgpa} / 10</li>
              <li>› 1,400+ problems · Codeforces Specialist</li>
            </ul>
          </Reveal>

          <Reveal
            delay={0.12}
            className="glass card-hover paper-lines rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-rose-brand/15 font-mono text-rose-brand">
                ♪
              </span>
              <h3 className="font-display text-2xl text-parchment-100">
                The Artist
              </h3>
            </div>
            <p className="mt-5 leading-relaxed text-parchment-300/75">
              When the terminal sleeps, I pick up the guitar. I write poetry, get
              lost in books, and live inside music. I&apos;ve performed with many
              teams and on many stages. To me, elegant code and a well-turned verse
              are the same craft — structure, rhythm, and the search for something
              that resonates.
            </p>
            <p className="mt-6 font-display text-lg italic text-parchment-200/80">
              &ldquo;I compress feeling into fewer words — the most elegant
              algorithm I know.&rdquo;
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
