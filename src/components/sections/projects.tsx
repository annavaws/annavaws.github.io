import Image from "next/image";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/content";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-40">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading index="03" label="Projects" title="Selected launches" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={(i % 3) * 0.08}
              // First two cards are wide, the rest sit three across
              className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}
            >
              <TiltCard className="panel flex flex-col p-4">
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 560px, 90vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className="flex flex-1 flex-col px-2 pb-2 pt-5"
                  style={{ transform: "translateZ(24px)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-3xl font-extrabold uppercase text-fg">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-wider text-signal hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal"
                    >
                      <FaGithub className="h-4 w-4" aria-hidden /> Source code
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
