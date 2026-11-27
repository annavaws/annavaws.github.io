import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { navLinks } from "@/data/content";
import { cn } from "@/utils/cn";

const Navbar = () => {
  const router = useRouter();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  useMotionValueEvent(scrollY, "change", (y) => setHasScrolled(y > 24));

  useEffect(() => setOpen(false), [router.asPath]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <nav
        aria-label="Main"
        className={cn(
          "relative mx-auto flex h-14 max-w-[1200px] items-center justify-between overflow-hidden rounded-full border px-5 transition-colors duration-300",
          hasScrolled || open
            ? "border-line bg-ink/80 backdrop-blur-xl"
            : "border-transparent"
        )}
      >
        <Link
          href="/"
          className="font-display text-xl font-extrabold uppercase tracking-wide text-fg"
        >
          Annava<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "rounded-full px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:text-accent",
                  router.pathname === href ? "text-accent" : "text-muted"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#contact" className="btn-primary ml-2 !px-4 !py-2 !text-xs">
              Contact
            </Link>
          </li>
        </ul>

        <button
          className="font-mono text-xs uppercase tracking-wider text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <motion.span
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        />
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="panel mx-auto mt-2 max-w-[1200px] !bg-ink/95 p-3 md:hidden"
          >
            {[...navLinks, { href: "/#contact", label: "Contact" }].map(
              ({ href, label }, i) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 rounded-lg px-3 py-3 font-display text-2xl font-extrabold uppercase text-fg hover:text-accent"
                  >
                    <span className="font-mono text-[11px] font-normal text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {label}
                  </Link>
                </li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
