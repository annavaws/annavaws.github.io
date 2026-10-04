import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
});

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function LocalTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: profile.timezone,
      }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time} WIB</span>;
}

function StaggerLine({ text, delay }: { text: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden" aria-hidden>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => setWebgl(hasWebGL()), []);

  // Stop rendering the 3D scene once the hero is scrolled away
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const use3d = webgl === true && !reduce;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        aria-hidden
        className="absolute right-[-10%] top-1/2 hidden h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-accent/10 blur-[120px] lg:block"
      />
      <div className="absolute inset-0" aria-hidden>
        {use3d ? (
          <HeroScene active={visible} />
        ) : (
          webgl !== null && (
            <div className="planet-fallback absolute bottom-[-18vmin] left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full lg:bottom-auto lg:left-auto lg:right-[4%] lg:top-1/2 lg:h-[56vmin] lg:w-[56vmin] lg:-translate-y-1/2 lg:translate-x-0" />
          )
        )}
      </div>

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-5 pb-10 pt-32 md:px-8">
        <motion.p
          className="label mb-6 flex items-center gap-3"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="h-2 w-2 animate-blink rounded-full bg-ok" />
          {profile.role} · Open to remote work
        </motion.p>

        <h1 className="font-display text-[clamp(3.5rem,13vw,11.5rem)] font-black uppercase leading-[0.82] tracking-tight text-fg">
          <span className="sr-only">{profile.name}</span>
          <StaggerLine text="Annava" delay={0.15} />
          <span className="text-accent">
            <StaggerLine text="Wisha Sikoko" delay={0.35} />
          </span>
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl"
        >
          <p className="font-mono text-sm uppercase tracking-wider text-fg">
            {profile.focus}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#experience" className="btn-primary">
              View my work <span aria-hidden>↓</span>
            </a>
            <a href="#game" className="btn-ghost">
              Play Rocket Courier
            </a>
          </div>
        </motion.div>
      </div>

      {/* Telemetry strip */}
      <div className="relative border-t border-line bg-ink/70 backdrop-blur">
        <dl className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-6 gap-y-3 px-5 py-4 font-mono text-xs uppercase tracking-wider md:grid-cols-4 md:px-8">
          {[
            ["Base", profile.location],
            ["Local time", <LocalTime key="t" />],
            ["Current", "Aisahub Inc · Seoul"],
            ["Mode", "Remote since 2025"],
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="text-muted">{k}</dt>
              <dd className="mt-1 text-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
