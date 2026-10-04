import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useState } from "react";
import { aisahub, earlierRoles } from "@/data/content";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { cn } from "@/utils/cn";

export default function Experience() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const project = aisahub.projects[active];

  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading title="Mission log" />

        <Reveal>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-2xl font-semibold text-fg">
              {aisahub.org}{" "}
              <span className="font-normal text-muted">— {aisahub.place}</span>
            </h3>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {aisahub.dates}
            </p>
          </div>
          <p className="label mb-8 !text-accent">{aisahub.title}</p>
        </Reveal>

        <Reveal className="panel grid overflow-hidden lg:grid-cols-[280px_1fr]">
          {/* Project selector */}
          <div
            role="tablist"
            aria-label="Aisahub projects"
            className="flex gap-1 overflow-x-auto border-b border-line p-2 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
          >
            {aisahub.projects.map((p, i) => (
              <button
                key={p.name}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "relative shrink-0 rounded-lg px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal",
                  i === active ? "text-fg" : "text-muted hover:text-fg active:bg-raised"
                )}
              >
                {i === active && (
                  <motion.span
                    layoutId="exp-active"
                    className="absolute inset-0 rounded-lg border border-accent/40 bg-raised"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative flex items-center gap-3 whitespace-nowrap">
                  <span className="font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold">{p.name}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="min-h-[420px] p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.name}
                role="tabpanel"
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  {project.dates}
                </p>
                <h4 className="mt-2 font-display text-4xl font-extrabold uppercase text-fg md:text-5xl">
                  {project.name}
                </h4>
                <p className="mt-2 text-lg text-signal">{project.tagline}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
                <ul className="mt-7 space-y-4">
                  {project.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-muted">
                      <span
                        aria-hidden
                        className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Earlier roles */}
        <ol className="relative mt-16 space-y-10 border-l border-line pl-8">
          {earlierRoles.map((role, i) => (
            <li key={role.org} className="relative">
              <span
                aria-hidden
                className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border border-signal bg-ink"
              />
              <Reveal delay={i * 0.05}>
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  {role.dates}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-fg">
                  {role.org}
                  {role.place && (
                    <span className="font-normal text-muted"> — {role.place}</span>
                  )}
                </h3>
                <p className="label mt-1 !text-accent">{role.title}</p>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted">
                  {role.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
