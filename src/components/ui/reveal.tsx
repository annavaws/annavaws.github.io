import { motion, useReducedMotion } from "framer-motion";
import React from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="label mb-4">
        <span className="text-accent">{index}</span> / {label}
      </p>
      <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-[1.02] text-fg text-balance">
        {title}
      </h2>
    </Reveal>
  );
}
