"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#craft", label: "Craft" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:px-7 ${
          scrolled ? "glass" : "bg-transparent"
        }`}
        style={{ width: "min(92%, 72rem)" }}
      >
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-lg tracking-tight text-parchment-100"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-amber-brand/40 text-sm text-amber-brand transition-colors group-hover:bg-amber-brand group-hover:text-ink-950">
            H
          </span>
          <span className="hidden sm:inline">{profile.firstName}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-parchment-200/80 transition-colors hover:text-amber-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full border border-amber-brand/40 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-brand transition-all hover:bg-amber-brand hover:text-ink-950 md:inline-block"
        >
          Say hi
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center md:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-px w-6 bg-parchment-100 transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-parchment-100 transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-parchment-100 transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 md:hidden"
            style={{ width: "min(92%, 72rem)" }}
          >
            <ul className="glass flex flex-col gap-1 rounded-3xl p-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-mono text-sm uppercase tracking-[0.2em] text-parchment-200/80 transition-colors hover:bg-ink-800 hover:text-amber-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
