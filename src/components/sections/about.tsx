import { animate, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { education, profile, stats, type Stat } from "@/data/content";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(stat.value);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  return (
    <span ref={ref} className="tabular-nums">
      {stat.prefix && <span className="text-muted">{stat.prefix}</span>}
      {value.toFixed(stat.decimals ?? 0)}
      {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading index="01" label="About" title="About me" />

        <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
          <Reveal>
            <TiltCard className="panel overflow-hidden p-3" max={12}>
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-lg"
                style={{ transform: "translateZ(30px)" }}
              >
                <Image
                  src="/me.jpg"
                  alt="Portrait of Annava Wisha Sikoko"
                  fill
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover"
                />
              </div>
            </TiltCard>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-xl leading-relaxed text-fg md:text-2xl md:leading-relaxed">
                {profile.summary}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {profile.about}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-2">
              {education.map((e) => (
                <div key={e.org} className="border-l border-line pl-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {e.dates}
                  </p>
                  <p className="mt-1 font-semibold text-fg">{e.org}</p>
                  <p className="text-sm text-muted">{e.title}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="bg-surface p-6">
              <p className="whitespace-nowrap font-display text-3xl font-extrabold text-fg sm:text-4xl md:text-5xl">
                <CountUp stat={stat} />
              </p>
              <p className="label mt-3">{stat.label}</p>
              <p className="mt-2 text-sm text-muted">{stat.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
