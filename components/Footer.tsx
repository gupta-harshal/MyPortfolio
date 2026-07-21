import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-amber-brand/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="font-display text-lg italic text-parchment-200/80">
          {profile.tagline}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-parchment-300/50">
          © {year} {profile.name} · Crafted with code &amp; a little music
        </p>
      </div>
    </footer>
  );
}
