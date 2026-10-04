import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";
import { cn } from "@/utils/cn";

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
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
    // Dragging the globe is mouse-only; touch keeps normal scrolling
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

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
      className={cn(
        "relative flex flex-col overflow-hidden",
        use3d && finePointer && "cursor-grab active:cursor-grabbing"
      )}
    >
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute inset-0" aria-hidden>
        {use3d ? (
          <HeroScene active={visible} />
        ) : (
          webgl !== null && (
            <div className="planet-fallback absolute bottom-[-18vmin] left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full lg:bottom-auto lg:left-auto lg:right-[4%] lg:top-1/2 lg:h-[56vmin] lg:w-[56vmin] lg:-translate-y-1/2 lg:translate-x-0" />
          )
        )}
      </div>

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col px-5 pb-64 pt-24 md:px-8 md:pb-32">
        <motion.p
          className="label mb-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {profile.role}
        </motion.p>

        <h1 className="font-display text-[clamp(3.5rem,11vw,9.5rem)] font-black uppercase leading-[1] tracking-tight text-fg">
          <span className="sr-only">{profile.name}</span>
          <StaggerLine text="Annava" delay={0.15} />
          <StaggerLine text="Wisha Sikoko" delay={0.35} />
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl"
        >
          <p className="text-lg leading-relaxed text-muted">{profile.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#experience" className="btn-primary">
              View my work
            </a>
            <a href="#game" className="btn-ghost">
              Play Rocket Courier
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
