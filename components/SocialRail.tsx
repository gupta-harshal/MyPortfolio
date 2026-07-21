"use client";

import { motion } from "framer-motion";
import Socials from "./Socials";

/**
 * Persistent social access that lives at the TOP / SIDE of the site
 * (never only at the bottom):
 *  - Desktop (lg+): a fixed vertical rail pinned to the right edge,
 *    visible from the very top and on every scroll position.
 *  - Mobile / tablet: a horizontal bar directly under the navbar.
 */
export default function SocialRail() {
  return (
    <>
      {/* Desktop vertical rail */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <div className="flex flex-col items-center gap-3">
          <Socials size="sm" orientation="vertical" />
          <span className="mt-2 h-16 w-px bg-gradient-to-b from-amber-brand/50 to-transparent" />
        </div>
      </motion.aside>

      {/* Mobile / tablet top bar */}
      <div className="sticky top-[72px] z-30 flex justify-center px-4 lg:hidden">
        <div className="glass flex max-w-full items-center gap-2 overflow-x-auto rounded-full px-4 py-2">
          <Socials size="sm" />
        </div>
      </div>
    </>
  );
}
