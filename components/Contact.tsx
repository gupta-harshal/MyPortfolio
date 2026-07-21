"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Socials from "./Socials";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const company = String(data.get("company") || ""); // honeypot

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      // Server not configured / failed → graceful mailto fallback.
      const subject = encodeURIComponent(
        `Portfolio · Hello from ${name || "someone"}`
      );
      const body = encodeURIComponent(
        `${message}\n\n— ${name}${email ? ` (${email})` : ""}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please email me directly.");
    }
  }

  return (
    <section id="contact" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" kicker="Contact" title="Let's make something." />

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="max-w-md text-lg leading-relaxed text-parchment-300/75">
              Have an idea, a role, a collaboration, or just want to talk music and
              machine learning? My inbox is always open.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-8 inline-block font-display text-2xl italic text-amber-brand md:text-3xl"
            >
              {profile.email}
            </a>

            <div className="mt-10">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-parchment-300/50">
                Find me across the web
              </p>
              <Socials />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass flex flex-col gap-4 rounded-3xl p-7 md:p-9"
          >
            {/* Honeypot — hidden from humans, catches bots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <Field label="Name" name="name" type="text" placeholder="Your name" />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-parchment-300/60">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me a little about it…"
                className="resize-none rounded-2xl border border-amber-brand/15 bg-ink-950/50 px-4 py-3 text-parchment-100 outline-none transition-colors placeholder:text-parchment-300/30 focus:border-amber-brand/60"
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={status === "sending"}
              className="mt-2 rounded-full bg-amber-brand px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink-950 transition-all hover:bg-parchment-100 disabled:opacity-60"
            >
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                ? "Thank you ✦"
                : "Send message"}
            </motion.button>

            {status === "sent" && (
              <p className="text-center font-mono text-xs text-sage">
                Message sent — thanks for reaching out!
              </p>
            )}
            {status === "error" && (
              <p className="text-center font-mono text-xs text-rose-brand">
                {errorMsg || "Something went wrong. Please email me directly."}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-parchment-300/60">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="rounded-2xl border border-amber-brand/15 bg-ink-950/50 px-4 py-3 text-parchment-100 outline-none transition-colors placeholder:text-parchment-300/30 focus:border-amber-brand/60"
      />
    </div>
  );
}
