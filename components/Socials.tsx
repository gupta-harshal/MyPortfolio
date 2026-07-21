"use client";

import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaMedium,
  FaInstagram,
  FaCode,
} from "react-icons/fa6";
import { SiLeetcode, SiCodeforces, SiCodechef, SiSubstack, SiDuolingo } from "react-icons/si";
import type { IconType } from "react-icons";
import { socials } from "@/lib/data";

type SocialItem = { key: string; href: string; label: string; Icon: IconType };

const ALL: SocialItem[] = [
  { key: "github", href: socials.github, label: "GitHub", Icon: FaGithub },
  { key: "linkedin", href: socials.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { key: "codolio", href: socials.codolio, label: "Codolio", Icon: FaCode },
  { key: "twitter", href: socials.twitter, label: "Twitter / X", Icon: FaXTwitter },
  { key: "instagram", href: socials.instagram, label: "Instagram", Icon: FaInstagram },
  { key: "leetcode", href: socials.leetcode, label: "LeetCode", Icon: SiLeetcode },
  { key: "codeforces", href: socials.codeforces, label: "Codeforces", Icon: SiCodeforces },
  { key: "codechef", href: socials.codechef, label: "CodeChef", Icon: SiCodechef },
  { key: "duolingo", href: socials.duolingo, label: "Duolingo", Icon: SiDuolingo },
  { key: "medium", href: socials.medium, label: "Medium", Icon: FaMedium },
  { key: "substack", href: socials.substack, label: "Substack", Icon: SiSubstack },
];

export default function Socials({
  size = "md",
  orientation = "horizontal",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  const items = ALL.filter((s) => s.href && s.href.trim().length > 0);
  const dim =
    size === "lg" ? "h-12 w-12 text-xl" : size === "sm" ? "h-9 w-9 text-sm" : "h-11 w-11 text-lg";
  const layout =
    orientation === "vertical" ? "flex-col" : "flex-wrap items-center";

  return (
    <div className={`flex ${layout} gap-3 ${className}`}>
      {items.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`group relative grid place-items-center rounded-full border border-amber-brand/15 bg-ink-800/60 text-parchment-200 transition-all duration-300 hover:-translate-y-1 hover:border-amber-brand/60 hover:text-amber-brand hover:shadow-[0_10px_30px_-12px_rgba(224,164,88,0.6)] ${dim}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
